<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import InputField from '@/components/Forms/Sgkms/InputField.vue';
import Dropdown from '@/components/Forms/Sgkms/DropDown.vue';
import axiosInstance from '@/api/axiosInstance';

const pageTitle = ref('SGKMS API');
const selectedVersion = ref('V1.0');
const dropdownVisible = ref(false);
const versions = ref(['V1.0']);
const selectedEndpoint = ref('');
const endpoints = ref(['login','Refresh Session', 'rng', 'mac generate', 'seal', 'unseal','encrypt symmetric encryption','encrypt Asymmetric Encryption','encrypt Asymmetric Encryption with Session Key','decrypt Symmetric Decryption','decrypt Asymmetric Decryption','decrypt Asymmetric Decryption with Session Key','tokenize','detokenize','sign','verify','cert sign','cert verify','key info','secret get','external key generate','external mac generate','external tokenize','external detokenize','external sign','external verify']); 

// Variabel reaktif untuk response message dan data
const responseData = ref<any>(null);  // Menyimpan respons JSON dari API

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const selectVersion = (version: string) => {
  selectedVersion.value = version;
  dropdownVisible.value = false;          
};

const endpointData = {
  'login': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'the ID of the slot to be used for login' },
      { name: 'password', label: 'Password', placeholder: 'the password or PIN for the agent in this slot' },
    ],
    data: { slotId: null, password: '' },
    url: `/${selectedVersion.value}/agent/login`, 
  },
  'Refresh Session': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot for which to refresh the session' },
      { name: 'sessionToken', label: 'Session Token', placeholder: ' The current session token of the agent' },
    ],
    data: { slotId: '', sessionToken: '' },
    url: `/${selectedVersion.value}/agent/refreshSession`,
  },
  'rng': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot requesting the random number' },
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'length', label: 'Length', placeholder: ' The desired length of the generated random number' },
    ],
    data: { slotId: '', sessionToken: '', length: '' },
    url: `/${selectedVersion.value}/rng`,
  },
  'mac generate': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for generating the MAC' },
      { name: 'hashAlgo', label: 'Hash Algo', placeholder: '(dropdown)The hashing algorithm used for the MAC' },
      { name: 'data', label: 'MAC Data', placeholder: 'The data for which the MAC will be generated' },
    ],
    data: { slotId: '', sessionToken: '', keyId: '', hashAlgorithm: '', macData: '' },
    url: `/${selectedVersion.value}/mac/generate`,
  },
  // '/mac/verify/CMAC/HMAC-SHA256': {
  //   fields: [
  //     { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
  //     { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
  //     { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for generating the MAC' },
  //     { name: 'hashAlgo', label: 'Hash Algo', placeholder: 'The hashing algorithm used for the MAC. Possible values: "CMAC", "HMAC-SHA256' },
  //     { name: 'data', label: 'MAC Data', placeholder: 'The data for which the MAC will be generated' },
  //     { name: 'mac', label: 'Base 64 MAC', placeholder: 'The Base64 URL-safe encoded MAC to verify' },
  //   ],
  //   data: { slotId: '', sessionToken: '', keyId: '', hashAlgorithm: '', macData: '' },
  //   url: `/${selectedVersion.value}/mac/verify`,
  // },
  // '/mac/generate/GMAC-256': {
  //   fields: [
  //     { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
  //     { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
  //     { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for generating the MAC' },
  //     { name: 'hashAlgo', label: 'Hash Algo', placeholder: '(dropdown)The hashing algorithm used for the MAC' },
  //     { name: 'data', label: 'MAC Data', placeholder: 'The data for which the MAC will be generated' },
  //     { name: 'mac', label: 'base 64 MAC', placeholder: 'The Base64 URL-safe encoded MAC to verify' },
  //     { name: 'iv', label: 'Initialization Vector (iv)', placeholder: 'The initialization vector' },
  //   ],
  //   data: { slotId: '', sessionToken: '', keyId: '', hashAlgorithm: '', macData: '' },
  //   url: `/${selectedVersion.value}/mac/verify`,
  // },
  // '/encrypt/symmetric-encryption': {
  //   fields: [
  //     { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for encryption' },
  //     { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
  //     { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for sealing the plaintext (AES-256-GCM or RSA algorithm)' },
  //     // { name: 'plaintext', label: 'Plaintext', placeholder: 'An array of plaintext strings to encrypt' },
  //   ],
  //   data: { slotId: '', sessionToken: '', keyId: '', plaintext: [] },
  //   url: `/${selectedVersion.value}/encrypt`,
  // },
  // '/encrypt/asymmetric-encryption': {
  //   fields: [
  //     { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for encryption' },
  //     { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
  //     { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for sealing the plaintext (AES-256-GCM or RSA algorithm)' },
  //     // { name: 'plaintext', label: 'Plaintext', placeholder: 'An array of plaintext strings to encrypt' },
  //   ],
  //   data: { slotId: '', sessionToken: '', keyId: '', plaintext: [] },
  //   url: `/${selectedVersion.value}/encrypt`,
  // },
  // '/encrypt/Asymmetric-encryption-with-Session-key': {
  //   fields: [
  //     { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for encryption' },
  //     { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
  //     { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for sealing the plaintext (AES-256-GCM or RSA algorithm)' },
  //     { name: 'useSessionKey', label: 'Session Key', placeholder: ' Boolean flag, true if a session key should be used for encryption (applicable for RSA)' },
  //     // { name: 'plaintext', label: 'Plaintext', placeholder: 'An array of plaintext strings to encrypt' },
  //   ],
  //   data: { slotId: '', sessionToken: '', keyId: '', plaintext: [] },
  //   url: `/${selectedVersion.value}/encrypt`,
  // },
  // '/decrypt/symmetric-decryption': {
  //   fields: [
  //     { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for encryption' },
  //     { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
  //     { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for sealing the plaintext (AES-256-GCM or RSA algorithm)' },
  //     { name: 'keyVersion', label: 'Key Version', placeholder: 'The version of the key used for decryption' },
  //     { name: 'ciphertext', label: 'Ciphertext', placeholder: 'An array of plaintext strings to encrypt' },
  //   ],
  //   data: { slotId: '', sessionToken: '', keyId: '', plaintext: [] },
  //   url: `/${selectedVersion.value}/seal`,
  // },
  'seal': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for encryption' },
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for sealing the plaintext (AES-256-GCM or RSA algorithm)' },
      { name: 'plaintext', label: 'Plaintext', placeholder: 'An array of plaintext strings to encrypt' },
    ],
    data: { slotId: '', sessionToken: '', keyId: '', plaintext: [] },
    url: `/${selectedVersion.value}/seal`,
  },
  'unseal': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for decryption' },
      { name: 'ciphertext', label: 'Ciphertext', placeholder: '{{ciphertext_1}}, {{ciphertext_2}} // An array of ciphertext strings to decrypt' },
    ],
    data: { sessionToken: '', slotId: '', ciphertext: [] },
    url: `/${selectedVersion.value}/unseal`,
  },
  'encrypt symmetric encryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the encryption request' },
      { name: 'keyId', label: 'Key ID', placeholder: 'The ID of the key used for encryption (AES-256-GCM algorithm)' }, 
      { name: 'text1', label: 'plaintext text 1', placeholder: '{{text_1}}  // The plaintext data to be encrypted' },
      { name: 'aad1', label: 'plaintext aad 1', placeholder: '{{additional_auth_data_1}} // Additional Authentication Data (AAD) to ensure integrity' },
      { name: 'text2', label: 'plaintext text 2', placeholder: '{{text_2}}' },
      { name: 'aad2', label: 'plaintext aad 2', placeholder: '{{additional_auth_data_2}}' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',add1:'',text2:'',add2:'' },
    url: `/${selectedVersion.value}/encrypt`,
  },
  'encrypt asymmetric encryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: '{{session_token}} // The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: '{{slot_id}} // The ID of the slot associated with the encryption request' },
      { name: 'keyId', label: 'Key ID', placeholder: '{{key_id}} // The ID of the key used for encryption (RSA algorithm)' },
      { name: 'text 1', label: 'plaintext text 1', placeholder: '{{text_1}} // The plaintext data to be encrypted ' },
      { name: 'text 2', label: 'plaintext text 2', placeholder: '{{text_2}} ' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',text2:'' },
    url: `/${selectedVersion.value}/encrypt`,
  },
  'encrypt asymmetric encryption with session key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: '{{session_token}} // The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: '{{slot_id}} // The ID of the slot associated with the encryption request' },
      { name: 'keyId', label: 'Key ID', placeholder: '{{key_id}} // The ID of the key used for encryption (RSA algorithm)' },
      { name: 'useSessionKey', label: 'Use Session Key', placeholder: '{{use_session_key}} // Boolean: true if a session key should be used' },
      { name: 'text 1', label: 'plaintext text 1', placeholder: '{{text_1}} // The plaintext data to be encrypted' },
      { name: 'text 2', label: 'plaintext text 2', placeholder: '{{text_2}}' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', useSessionKey: false, text1:'',text2:'' },
    url: `/${selectedVersion.value}/encrypt`,
  },
  'decrypt symmetric decryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: '{{session_token}} // The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: '{{slot_id}} // The ID of the slot used for decryption' },
      { name: 'keyId', label: 'Key ID', placeholder: '{{key_id}} // The ID of the key used for decryption (AES-256-GCM algorithm)' },
      { name: 'keyVersion', label: 'Key Version', placeholder: '{{key_version_value}} // The version of the key used for decryption' },
      { name: 'text1', label: 'ciphertext text 1', placeholder: '{{ciphertext_value_1}}  // The ciphertext to be decrypted' },
      { name: 'aad1', label: 'ciphertext aad 1', placeholder: '{{ciphertext_aad_1}}  // Optional: The additional authentication data used during encryption' },
      { name: 'mac1', label: 'ciphertext mac 1', placeholder: '{{ciphertext_mac_1}} // The MAC (Message Authentication Code) to verify the integrity of the ciphertext' },
      { name: 'iv1', label: 'ciphertext iv 1', placeholder: '{{ciphertext_iv_1}}  // The Initialization Vector (IV) used for encryption' },
      { name: 'text2', label: 'ciphertext text 2', placeholder: '{{ciphertext_value_2}}' },
      { name: 'aad2', label: 'ciphertext aad 2', placeholder: '{{ciphertext_aad_2}}' },
      { name: 'mac2', label: 'ciphertext mac 2', placeholder: '{{ciphertext_mac_2}}' },
      { name: 'iv2', label: 'ciphertext iv 2', placeholder: '{{ciphertext_iv_2}}' },      
    ],
    data: { sessionToken: '', slotId: '', keyId: '', keyVersion: '', text1:'',aad1:'',mac1:'',iv1:'',text2:'',aad2:'',mac2:'',iv2:'' },
    url: `/${selectedVersion.value}/decrypt`,
  },
  'decrypt asymmetric decryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: '{{session_token}} // The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: '{{slot_id}} // The ID of the slot used for decryption' },
      { name: 'keyId', label: 'Key ID', placeholder: '{{key_id}} // The ID of the key used for decryption (RSA algorithm)' },
      { name: 'text1', label: 'ciphertext text 1', placeholder: '{{ciphertext_value_1}}  // The ciphertext to be decrypted ' },
      { name: 'text2', label: 'ciphertext text 2', placeholder: '{{ciphertext_value_2}}  ' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',text2:'' },
    url: `/${selectedVersion.value}/decrypt`,
  },
  'decrypt asymmetric decryption with session key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: '{{session_token}} // The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: '{{slot_id}} // The ID of the slot used for decryption' },
      { name: 'keyId', label: 'Key ID', placeholder: '{{key_id}} // The ID of the key used for decryption (RSA algorithm)' },
      { name: 'text1', label: 'ciphertext text 1', placeholder: '{{ciphertext_value_1}}  // The ciphertext to be decrypted' },
      { name: 'mac1', label: 'ciphertext mac 1', placeholder: '{{ciphertext_mac_1}} // The MAC (Message Authentication Code) to verify the integrity of the ciphertext' },
      { name: 'iv1', label: 'ciphertext iv 1', placeholder: '{{ciphertext_iv_1}}  // The Initialization Vector (IV) used for encryption' },
      { name: 'wrappedSessionKey1', label: 'ciphertext wrapped session key 1', placeholder: '{{wrapped_session_key_1}}"   // The wrapped session key obtained during the encryption process' },
      { name: 'text2', label: 'ciphertext text 2', placeholder: '{{ciphertext_value_2}}' },
      { name: 'mac2', label: 'ciphertext mac 2', placeholder: '{{ciphertext_mac_2}}' },
      { name: 'iv2', label: 'ciphertext iv 2', placeholder: '{{ciphertext_iv_2}}' },
      { name: 'wrappedSessionKey2', label: 'ciphertext wrapped session key 2', placeholder: '{{wrapped_session_key_2}}" ' },      
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',mac1:'',iv1:'',wrappedSessionKey1:'',text2:'',mac2:'',iv2:'',wrappedSessionKey2:'' },
    url: `/${selectedVersion.value}/decrypt`,
  },
  'tokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: '{{session_token}} // The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: '{{slot_id}} // The ID of the slot associated with the tokenization request' },
      { name: 'keyId', label: 'Key ID', placeholder: '{{key_id}} // The ID of the key used for tokenization' },
      { name: 'text', label: 'plaintext text', placeholder: '{{text}}  // The plaintext data to be tokenized' },
      { name: 'formatChar', label: 'plaintext formatChar', placeholder: '{{format_char}}  // Format-preserving characters to maintain original text structure (e.g., preserving length/format of credit card numbers)' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text:'',formatChar:'' },
    url: `/${selectedVersion.value}/tokenize`,
  },
  'detokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: '{{session_token}} // The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: '{{slot_id}} // The ID of the slot associated with the detokenization request' },
      { name: 'keyId', label: 'Key ID', placeholder: '{{key_id}} // The ID of the key used for detokenization' },
      { name: 'token', label: 'ciphertext token', placeholder: '{{token}}  // The tokenized value to be detokenized' },
      { name: 'metadata', label: 'ciphertext metadata', placeholder: '{{metadata}}  // Metadata associated with the tokenization process' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', token:'',metadata:'' },
    url: `/${selectedVersion.value}/detokenize`,
  },
  'sign': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: ' The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the private key used for signing' },
      { name: 'data', label: 'Data', placeholder: 'The data to be signed' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', data: '' },
    url: `/${selectedVersion.value}/sign`,
  },
  'verify': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the public key used for signature verification' },
      { name: 'data', label: 'Data', placeholder: 'The original data that was signed' },
      { name: 'signature', label: 'Signature', placeholder: 'The digital signature in Base64 format to verify' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', data: '', signature: '' },
    url: `/${selectedVersion.value}/verify`,
  },
  'cert sign': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the request' },
      { name: 'validityPeriod', label: 'Validity Period', placeholder: 'The validity period of certificate in days' },
      { name: 'keyId', label: 'Private Key ID', placeholder: 'The ID of the intermediate or root certificate private key used to sign the CSR (RSA-3072, RSA4096, or ECDSA algorithm)' },
      { name: 'csr', label: 'CSR', placeholder: 'The Certificate Signing Request in PEM format' },
    ],
    data: { sessionToken: '', slotId: '', validityPeriod: '', keyId: '', csr: '' },
    url: `/${selectedVersion.value}/cert/sign`,
  },
  'cert verify': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the request' },
      { name: 'keyId', label: 'Public Key ID', placeholder: 'The ID of the intermediate or root certificate public key used for verification (RSA-3072, RSA4096, or ECDSA algorithm)' },
      { name: 'certificate', label: 'Certificate', placeholder: 'The digitally signed certificate in PEM format' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', certificate: '' },
    url: `/${selectedVersion.value}/cert/verify`,
  },
  'key info': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the key info request' },
      { name: 'keyId', label: 'Key ID', placeholder: 'The ID of the key whose info is being requested' },
      { name: 'keyVersion', label: 'Key Version', placeholder: 'The version of the key being retrieved (optional for RSA keys)' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', keyVersion: '' },
    url: `/${selectedVersion.value}/key/info`,
  },
  'secret get': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot from which to retrieve the secret' },
      { name: 'secretId', label: 'Secret ID', placeholder: 'The ID of the secret to be retrieved' },
    ],
    data: { sessionToken: '', slotId: '', secretId: '' },
    url: `/${selectedVersion.value}/secret/get`,
  },
  'external key generate': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot where the key pair will be generated' },
      { name: 'algo', label: 'Algorithm', placeholder: 'The encryption algorithm (e.g., AES)' },
      { name: 'algoLength', label: 'Algorithm Length', placeholder: 'The length of the algorithm (e.g., 256 for AES-256)' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to secure the generated keys (AES-256-GCM algorithm)' },
    ],
    data: { sessionToken: '', slotId: '', algo: 'AES', algoLength: 256, wrappingKeyId: '' },
    url: `/${selectedVersion.value}/external/key/generate`,
  },
  'external mac generate': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to secure the generated keys' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used to generate the MAC' },
      { name: 'hashAlgo', label: 'Hashing Algorithm', placeholder: 'The hashing algorithm used for the MAC. Possible values: CMAC, GMAC-256, HMAC-SHA256' },
      { name: 'data', label: 'Data to Hash', placeholder: 'The plaintext data for which the MAC will be generated' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', hashAlgo: '', data: '' },
    url: `/${selectedVersion.value}/external/mac/generate`,
  },
  'external tokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the tokenization request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used for tokenization' },
      { name: 'plaintext', label: 'Plaintext Data', placeholder: '[ { "text": "{{plaintext_1}}", "formatChar": "{{format_char}}" }, { "text": "{{plaintext_2}}", "formatChar": "{{format_char}}" } ] // The plaintext data to be tokenized' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', plaintext: [] },
    url: `/${selectedVersion.value}/external/tokenize`,
  },
  'external detokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the detokenization request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used for detokenization' },
      { name: 'ciphertext', label: 'Ciphertext', placeholder: '[ { "token": "{{tokenized_data_1}}", "metadata": "{{metadata_1}}" }, { "token": "{{tokenized_data_2}}", "metadata": "{{metadata_2}}" } ] // The tokenized data to be detokenized' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', ciphertext: [] },
    url: `/${selectedVersion.value}/external/detokenize`,
  },
  'external sign': {
    fields: [
    { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the signing request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to protect the private key' },
      { name: 'wrappedKey', label: 'Private Key', placeholder: 'The private key used for signing' },
      { name: 'data', label: 'Data to Sign', placeholder: 'The plaintext data to be signed' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', data: '' },
    url: `/${selectedVersion.value}/agent/sign`,
  },
  'external verify': {
    fields: [
    { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the verification request' },
      { name: 'publicKeyOrCert', label: 'Public Key or Certificate', placeholder: 'The public key or certificate used for verification' },
      { name: 'signature', label: 'Signature', placeholder: 'The digital signature to be verified' },
      { name: 'data', label: 'Original Data', placeholder: 'The original plaintext data that was signed' },
    ],
    data: { sessionToken: '', slotId: '', publicKeyOrCert: '', signature: '', data: '' },
    url: `/${selectedVersion.value}/agent/verify-signature`,
  },
};

const formData = reactive(endpointData[selectedEndpoint.value]?.data || {});
watch(selectedEndpoint, (newEndpoint) => {
  if (newEndpoint && endpointData[newEndpoint]) {
    Object.assign(formData, endpointData[newEndpoint].data);
  }
});

const responseMessage = ref('');
const sendRequest = async () => {
  const endpoint = endpointData[selectedEndpoint.value];
  if (!endpoint) {
    responseMessage.value = 'Invalid endpoint selected';
    return;
  }
  
  //string to integer
  formData.slotId = parseInt(formData.slotId, 10)
  formData.algoLength = parseInt(formData.algoLength, 10)
  formData.length = parseInt(formData.length, 10)
  formData.validityPeriod = parseInt(formData.validityPeriod, 10)
  formData.keyVersion = parseInt(formData.keyVersion, 10)
  return console.log(formData, endpoint.url)

  try {
    const response = await axiosInstance.post(`${endpoint.url}?token=${localStorage.getItem("token")}`, formData)
    // console.log(response.data)
    responseData.value = response.data;
    responseMessage.value = `Success: ${response.data.message || 'Request berhasil'}`;
  } catch (error: any) {
    responseMessage.value = `Error: ${error.response?.data?.message || error.message || 'Terjadi kesalahan'}`;
  }
};
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
  
    <div class="rounded-sm border border-stroke bg-white px-5 p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div class="flex justify-between">
        <Dropdown 
          :items="versions" 
          v-model="selectedVersion" 
          label="Version" 
          :visible="dropdownVisible"
          @toggle="toggleDropdown"
          @select="selectVersion"
        />
        
        <div>
          <button 
            @click="sendRequest"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Send Request
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-6">
        <p class="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Select Endpoint SGKMS API</p>
        <select v-model="selectedEndpoint" class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option disabled value="">Select Endpoint ...</option>
          <option v-for="endpoint in endpoints" :key="endpoint" :value="endpoint">{{ endpoint }}</option>
        </select>
      </div>

      <div class="flex flex-col mt-6">
        <p class="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Request</p>
    
        <div v-if="selectedEndpoint">
          <div v-for="field in endpointData[selectedEndpoint]?.fields" :key="field.name">
            <InputField v-model="formData[field.name]" :label="field.label" :placeholder="field.placeholder" />
          </div>
        </div>
      </div>
    </div>
  
    <div class="rounded-sm border mt-4 border-stroke bg-white px-5 p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
         <p class="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Response</p>

        <!-- Menampilkan pesan respons jika ada -->
        <div v-if="responseMessage" class="mb-4 text-gray-800 dark:text-gray-200">
        <p>{{ responseMessage }}</p>
        </div>

        <!-- Menampilkan data respons JSON dengan kotak yang scrollable jika konten terlalu panjang -->
        <div v-if="responseData" class="bg-gray-100 p-4 rounded-lg shadow-sm max-h-96 overflow-auto whitespace-pre-wrap">
        <!-- Respons JSON diformat dengan JSON.stringify -->
        <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(responseData, null, 2) }}</pre>
        </div>
    </div>
  </DefaultLayout>
</template>
