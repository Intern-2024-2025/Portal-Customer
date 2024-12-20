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
const isDisabled = ref(false)

const endpoints = ref(['Login','Refresh Session', 'Random Number', 'Mac Generate', 'Mac Verify CMAC/HMAC-SHA256','Mac Verify GMAC-256','Seal', 'Unseal','Symmetric Encryption','Asymmetric Encryption',
'Asymmetric Encryption with Session Key', 'Symmetric Decryption','Asymmetric Decryption','Asymmetric Decryption with Session Key','Tokenize','Detokenize','Sign','Verify','Cert Sign','Cert Verify','Key Info',
'Secret Get', 'External Keypair Generate RSA', 'External Keypair Generate ECDSA', 'External Keypair Generate RSA with Cert','External Keypair Generate ECDSA with Cert','External Key Generate','External Mac Generate', 
'External Mac Verify CMAC/HMAC-SHA256', 'External Mac Verify GMAC-256','External Seal Symmetric Key','External Seal Asymmetric Key','External Unseal Symmetric Key','External Unseal Asymmetric Key',
'External Encrypt Symmetric Encryption','External Encrypt Asymmetric Encryption','External Encrypt Asymmetric Encryption With Session Key','External Decrypt Symmetric Decryption',
'External Decrypt Asymmetric Decryption','External Decrypt Asymmetric Decryption With Session Key','External Tokenize', 'External Detokenize', 'External Sign', 'External Verify'
]); 

const responseData = ref<any>(null);  // Menyimpan respons JSON dari API
const copyToClipboard = () => {
  if (responseData.value) {
    const textToCopy = JSON.stringify(responseData.value, null, 2);
    navigator.clipboard.writeText(textToCopy)
      .then(() => alert('Data berhasil disalin ke clipboard'))
      .catch(err => alert('Gagal menyalin data: ' + err));
  }
};


const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const selectVersion = (version: string) => {
  selectedVersion.value = version;
  dropdownVisible.value = false;          
};

const endpointData = {
  'Login': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'the ID of the slot to be used for login' },
      { name: 'password', label: 'Password', placeholder: 'the password or PIN for the agent in this slot' },
    ],
    data: { slotId: '', password: '' },
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
  'Random Number': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot requesting the random number' },
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'length', label: 'Length', placeholder: ' The desired length of the generated random number' },
    ],
    data: { slotId: '', sessionToken: '', length: '' },
    url: `/${selectedVersion.value}/rng`,
  },
  'Mac Generate': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for generating the MAC' },
      { name: 'hashAlgo', label: 'Hash Algorithm', placeholder: '(dropdown)The hashing algorithm used for the MAC' },
      { name: 'data', label: 'Data', placeholder: 'The data for which the MAC will be generated' },
    ],
    data: { slotId: '', sessionToken: '', keyId: '', hashAlgo: 'CMAC/HMAC-SHA256/GMAC-256', macData: '' },
    url: `/${selectedVersion.value}/mac/generate`,
  },
  'Mac Verify CMAC/HMAC-SHA256': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' }, 
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for MAC verification' },
      { name: 'hashAlgo', label: 'Hash Algorithm', placeholder: 'The hashing algorithm used for the MAC. Possible values: "CMAC", "HMAC-SHA256' },
      { name: 'data', label: 'MAC Data', placeholder: 'The data for which the MAC is being verified' },
      { name: 'mac', label: 'Base64 MAC', placeholder: 'The Base64 URL-safe encoded to verify' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', hashAlgo: 'CMAC/HMAC-SHA256', data:'', mac:'' },
    url: `/${selectedVersion.value}/mac/verify`,
  },
  'Mac Verify GMAC-256': { 
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for MAC verification' },
      { name: 'hashAlgo', label: 'Hash Algorithm', placeholder: 'GMAC-256' },
      { name: 'data', label: 'Original Data', placeholder: 'The data for which the MAC is being verified' },
      { name: 'mac', label: 'MAC', placeholder: 'The Base64 URL-safe encoded to verify' },
      { name: 'iv', label: 'Initialization Vector (iv)', placeholder: 'The Initialization vector' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', hashAlgo: 'GMAC-256', data:'', mac:'', iv: ''},
    url: `/${selectedVersion.value}/mac/verify`,
  },
  'Seal': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for encryption' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for sealing the plaintext (AES-256-GCM or RSA algorithm)' },
      { name: 'plaintext1', label: 'Plaintext 1', placeholder: 'An array of plaintext 1 strings to encrypt' },
      { name: 'plaintext2', label: 'Plaintext 2', placeholder: 'An array of plaintext 2 strings to encrypt' },
    ],
    data: { slotId: '', sessionToken: '', keyId: '', plaintext1: '', plaintext2: '' },
    url: `/${selectedVersion.value}/seal`,
  },
  'Unseal': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot used for decryption' },
      { name: 'ciphertext1', label: 'Ciphertext 1', placeholder: 'An array of ciphertext 1 strings to decrypt' },
      { name: 'ciphertext2', label: 'Ciphertext 2', placeholder: 'An array of ciphertext 2 strings to decrypt' },
    ],
    data: { sessionToken: '', slotId: '', ciphertext1: '', ciphertext2: '' },
    url: `/${selectedVersion.value}/unseal`,
  },
  'Symmetric Encryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the encryption request' },
      { name: 'keyId', label: 'Key ID', placeholder: 'The ID of the key used for encryption (AES-256-GCM algorithm)' }, 
      { name: 'text1', label: 'Plaintext Text 1', placeholder: 'The plaintext 1 data to be encrypted' },
      { name: 'aad1', label: 'Plaintext aad 1', placeholder: 'Additional Authentication Data (AAD) 1 to ensure integrity' },
      { name: 'text2', label: 'Plaintext Text 2', placeholder: 'The plaintext 2 data to be encrypted'},
      { name: 'aad2', label: 'Plaintext aad 2', placeholder: 'Additional Authentication Data (AAD) 2 to ensure integrity'},
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',aad1:'',text2:'',aad2:'' },
    url: `/${selectedVersion.value}/encrypt`,
  },
  'Asymmetric Encryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the encryption request' },
      { name: 'keyId', label: 'Key ID', placeholder: 'The ID of the key used for encryption (RSA algorithm)' },
      { name: 'text1', label: 'Plaintext Text 1', placeholder: 'The plaintext 1 data to be encrypted' },
      { name: 'text2', label: 'Plaintext Text 2', placeholder: 'The plaintext 2 data to be encrypted' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',text2:'' },
    url: `/${selectedVersion.value}/encrypt`,
  },
  'Asymmetric Encryption with Session Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the encryption request' },
      { name: 'keyId', label: 'Key ID', placeholder: 'The ID of the key used for encryption (RSA algorithm)' },
      { name: 'useSessionKey', label: 'Use Session Key', placeholder: 'Boolean: true if a session key should be used' },
      { name: 'text1', label: 'plaintext text 1', placeholder: 'The plaintext 1 data to be encrypted' },
      { name: 'text2', label: 'plaintext text 2', placeholder: 'The plaintext 2 data to be encrypted' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', useSessionKey: true, text1:'',text2:'' },
    url: `/${selectedVersion.value}/encrypt`,
  },
  'Symmetric Decryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: ' The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: ' The ID of the slot used for decryption' },
      { name: 'keyId', label: 'Key ID', placeholder: ' The ID of the key used for decryption (AES-256-GCM algorithm)' },
      { name: 'keyVersion', label: 'Key Version', placeholder: 'The version of the key used for decryption' },
      { name: 'text1', label: 'Ciphertext text 1', placeholder: 'The ciphertext to be decrypted' },
      { name: 'aad1', label: 'Ciphertext aad 1', placeholder: 'Optional: The additional authentication data used during encryption' },
      { name: 'mac1', label: 'Ciphertext mac 1', placeholder: 'The MAC (Message Authentication Code) to verify the integrity of the ciphertext' },
      { name: 'iv1', label: 'Ciphertext iv 1', placeholder: 'The Initialization Vector (IV) used for encryption' },
      { name: 'text2', label: 'Ciphertext text 2', placeholder: 'The ciphertext to be decrypted' },
      { name: 'aad2', label: 'Ciphertext aad 2', placeholder: 'Optional: The additional authentication data used during encryption' },
      { name: 'mac2', label: 'Ciphertext mac 2', placeholder: 'The MAC (Message Authentication Code) to verify the integrity of the ciphertext' },
      { name: 'iv2', label: 'Ciphertext iv 2', placeholder: 'The Initialization Vector (IV) used for encryption' },      
    ],
    data: { sessionToken: '', slotId: '', keyId: '', keyVersion: '', text1:'',aad1:'',mac1:'',iv1:'',text2:'',aad2:'',mac2:'',iv2:'' },
    url: `/${selectedVersion.value}/decrypt`,
  },
  'Asymmetric Decryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: ' The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: ' The ID of the slot used for decryption' },
      { name: 'keyId', label: 'Key ID', placeholder: 'The ID of the key used for decryption (RSA algorithm)' },
      { name: 'text1', label: 'Ciphertext text 1', placeholder: 'The ciphertext to be decrypted' },
      { name: 'text2', label: 'Ciphertext text 2', placeholder: 'The ciphertext to be decrypted' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',text2:'' },
    url: `/${selectedVersion.value}/decrypt`,
  },
  'Asymmetric Decryption with Session Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: ' The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot used for decryption' },
      { name: 'keyId', label: 'Key ID', placeholder: ' The ID of the key used for decryption (RSA algorithm)' },
      { name: 'text1', label: 'Ciphertext text 1', placeholder: 'The ciphertext to be decrypted' }, 
      { name: 'mac1', label: 'Ciphertext mac 1', placeholder: 'The MAC (Message Authentication Code) to verify the integrity of the ciphertext' },
      { name: 'iv1', label: 'Ciphertext iv 1', placeholder: 'The Initialization Vector (IV) used for encryption' },
      { name: 'wrappedSessionKey1', label: 'Ciphertext wrapped session key 1', placeholder: 'The wrapped session key obtained during the encryption process' },
      { name: 'text2', label: 'Ciphertext text 2', placeholder: 'The ciphertext to be decrypted' },
      { name: 'mac2', label: 'Ciphertext mac 2', placeholder: 'The MAC (Message Authentication Code) to verify the integrity of the ciphertext' },
      { name: 'iv2', label: 'Ciphertext iv 2', placeholder: 'The Initialization Vector (IV) used for encryption' },
      { name: 'wrappedSessionKey2', label: 'Ciphertext wrapped session key 2', placeholder: 'The wrapped session key obtained during the encryption process' },      
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1:'',mac1:'',iv1:'',wrappedSessionKey1:'',text2:'',mac2:'',iv2:'',wrappedSessionKey2:'' },
    url: `/${selectedVersion.value}/decrypt`,
  },
  'Tokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the tokenization request' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for tokenization' },
      { name: 'text1', label: 'Text 1', placeholder: 'The plaintext data to be tokenized' },
      { name: 'formatChar1', label: 'Format Char 1', placeholder: 'Format-preserving characters to maintain original text structure' },
      { name: 'text2', label: 'Text 2', placeholder: 'The plaintext data to be tokenized' },
      { name: 'formatChar2', label: 'Format Char 2', placeholder: 'Format-preserving characters to maintain original text structure' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', text1: '', formatChar1: '', text2: '', formatChar2: '' },
    url: `/${selectedVersion.value}/tokenize`,
  },
  'Detokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the detokenization request' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the key used for detokenization' },
      { name: 'token1', label: 'Token 1', placeholder: 'The tokenized value to be detokenized' },
      { name: 'metadata1', label: 'Metadata 1', placeholder: ' Metadata associated with the tokenization process' },
      { name: 'token2', label: 'Token 2', placeholder: 'The tokenized value to be detokenized' },
      { name: 'metadata2', label: 'Metadata 2', placeholder: ' Metadata associated with the tokenization process' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', token1:'', metadata1:'', token2:'', metadata2:''},
    url: `/${selectedVersion.value}/detokenize`,
  },
  'Sign': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: ' The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'keyId', label: 'Key Id', placeholder: 'The ID of the private key used for signing' },
      { name: 'data', label: 'Data', placeholder: 'The data to be signed' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', data: '' },
    url: `/${selectedVersion.value}/sign`,
  },
  'Verify': {
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
  'Cert Sign': {
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
  'Cert Verify': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the request' },
      { name: 'keyId', label: 'Public Key ID', placeholder: 'The ID of the intermediate or root certificate public key used for verification (RSA-3072, RSA4096, or ECDSA algorithm)' },
      { name: 'certificate', label: 'Certificate', placeholder: 'The digitally signed certificate in PEM format' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', certificate: '' },
    url: `/${selectedVersion.value}/Cert/verify`,
  },
  'Key Info': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the key info request' },
      { name: 'keyId', label: 'Key ID', placeholder: 'The ID of the key whose info is being requested' },
      { name: 'keyVersion', label: 'Key Version', placeholder: 'The version of the key being retrieved (optional for RSA keys)' },
    ],
    data: { sessionToken: '', slotId: '', keyId: '', keyVersion: '' },
    url: `/${selectedVersion.value}/key/info`,
  },
  'Secret Get': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot from which to retrieve the secret' },
      { name: 'secretId', label: 'Secret Id', placeholder: 'The ID of the secret to be retrieved' },
    ],
    data: { sessionToken: '', slotId: '', secretId: '' },
    url: `/${selectedVersion.value}/secret/get`,
  },
  'External Keypair Generate RSA': { 
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'algo', label: 'Algo', placeholder: 'The ID of the key used for MAC verification' },
      { name: 'algoLength', label: 'Key Length', placeholder: 'The length of the key in bits(e., 2048, 3072, 4096)' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to secure the generated keys' }
    ],
    data: { sessionToken: '', slotId: '', algo: 'RSA', algoLength: '', wrappingKeyId:''},
    url: `/${selectedVersion.value}/external/keypair/generate`,
  },
  'External Keypair Generate ECDSA': { 
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'algo', label: 'Algo', placeholder: 'The ID of the key used for MAC verification' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to secure the generated keys' }
    ],
    data: { sessionToken: '', slotId: '', algo: 'ECDSA', wrappingKeyId:''},
    url: `/${selectedVersion.value}/external/keypair/generate`,
  },
  'External Keypair Generate RSA with Cert': { 
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'algo', label: 'Algo', placeholder: 'The ID of the key used for MAC verification' },
      { name: 'algoLength', label: 'Key Length', placeholder: 'The length of the key in bits(e., 2048, 3072, 4096)' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to secure the generated keys' },
      { name: 'withCert', label: 'With Cert', placeholder: 'Boolean flag: true if a certificate should be generated' },
    ],
    data: { sessionToken: '', slotId: '', algo: 'RSA', algoLength: '', wrappingKeyId:'', withCert:''},
    url: `/${selectedVersion.value}/external/keypair/generate`,
  },
  'External Keypair Generate ECDSA with Cert': { 
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'algo', label: 'Algo', placeholder: 'The ID of the key used for MAC verification' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to secure the generated keys' },
      { name: 'withCert', label: 'With Cert', placeholder: 'Boolean flag: true if a certificate should be generated' },
    ],
    data: { sessionToken: '', slotId: '', algo: 'ECDSA', wrappingKeyId:'', withCert:''},
    url: `/${selectedVersion.value}/external/keypair/generate`,
  },
  'External Key Generate': {
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
  'External Mac Generate': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used to secure the generated keys' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used to generate the MAC' },
      { name: 'hashAlgo', label: 'Hash Algorithm', placeholder: 'The hashing algorithm used for the MAC. Possible values: CMAC, GMAC-256, HMAC-SHA256' },
      { name: 'data', label: 'Data to Hash', placeholder: 'The plaintext data for which the MAC will be generated' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', hashAlgo: '', data: '' },
    url: `/${selectedVersion.value}/external/mac/generate`,
  },
  'External Mac Verify CMAC/HMAC-SHA256': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' }, 
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used to secure the generated keys' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used for MAC Verification' },
      { name: 'hashAlgo', label: 'Hash Algorithm', placeholder: 'The hashing algorithm used for the MAC. Possible values: "CMAC", "HMAC-SHA256' },
      { name: 'data', label: 'Original Data', placeholder: 'The plaintext data for which the MAC will be verified' },
      { name: 'mac', label: 'MAC', placeholder: 'The MAC to verify' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', hashAlgo: '', data:'', mac:'' },
    url: `/${selectedVersion.value}/external/mac/verify`,
  },
  'External Mac Verify GMAC-256': { 
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used to secure the generated the keys' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used for MAC Verification' },
      { name: 'hashAlgo', label: 'Hash Algorithm', placeholder: 'GMAC-256' },
      { name: 'data', label: 'Original Data', placeholder: 'The plaintext data for which the MAC is being verified' },
      { name: 'mac', label: 'MAC', placeholder: 'The MAC to verify' },
      { name: 'iv', label: 'Initialization Vector (iv)', placeholder: 'Initialization vector(IV)' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', hashAlgo: '', data:'', mac:'', iv: ''},
    url: `/${selectedVersion.value}/external/mac/verify`,
  },
  'External Seal Symmetric Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the sealing request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used' },
      { name: 'wrappedKey', label: 'Wrapped Symmetric Key', placeholder: 'The symmetric key used for sealing' },
      { name: 'plaintext1', label: 'Plaintext Text to Seal 1', placeholder: 'Array of plaintext data to be sealed' },
      { name: 'plaintext2', label: 'Plaintext Text to Seal 2', placeholder: 'Array of plaintext data to be sealed' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', plaintext1: '', plaintext2: '' },
    url: `/${selectedVersion.value}/external/seal`,
  },
  'External Seal Asymmetric Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the sealing request' },
      { name: 'publicKeyOrCert', label: 'Public Key', placeholder: 'The public key or certificate used for sealing' },
      { name: 'plaintext1', label: 'Plaintext Text to Seal 1', placeholder: 'Array of plaintext data 1 to be sealed' },
      { name: 'plaintext2', label: 'Plaintext Text to Seal 2', placeholder: 'Array of plaintext data 2 to be sealed' },
    ],
    data: { sessionToken: '', slotId: '', publicKeyOrCert: '', plaintext1: '', plaintext2: '' },
    url: `/${selectedVersion.value}/external/seal`,
  },
  'External Unseal Symmetric Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the unsealing request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used' },
      { name: 'wrappedKey', label: 'Wrapped Symmetric Key', placeholder: 'The symmetric key used for unsealing' },
      { name: 'ciphertext1', label: 'Ciphertext Sealed Data 1', placeholder: 'The sealed data 1 to be unsealed' },
      { name: 'ciphertext2', label: 'Ciphertext Sealed Data 2', placeholder: 'The sealed data 2 to be unsealed' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', ciphertext1: '',ciphertext2: '' },
    url: `/${selectedVersion.value}/external/unseal`,
  },
  'External Unseal Asymmetric Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the unsealing request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used' },
      { name: 'wrappedKey', label: 'Wrapped Symmetric Key', placeholder: 'The private key used for unsealing' },
      { name: 'ciphertext1', label: 'Ciphertext Sealed Data 1', placeholder: 'The sealed data to be unsealed' },
      { name: 'ciphertext2', label: 'Ciphertext Sealed Data 2', placeholder: 'The sealed data to be unsealed' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', ciphertext1: '',ciphertext2: '' },
    url: `/${selectedVersion.value}/external/unseal`,
  },
  'External Encrypt Symmetric Encryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used for encryption' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The symmetric key(e.g.,AES)used for encryption' },
      { name: 'text1', label: 'Plaintext Text 1', placeholder: 'The plaintext data to be encrypted' },
      { name: 'aad1', label: 'Plaintext aad 1', placeholder: 'Optional: Additional Authentication Data(AAD) for AES-GCM' },
      { name: 'text2', label: 'Plaintext Text 2', placeholder: 'The plaintext data to be encrypted' },
      { name: 'aad2', label: 'Plaintext aad 2', placeholder: 'Optional: Additional Authentication Data(AAD) for AES-GCM' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', text1: '', aad1: '', text2: '', aad2: '' },
    url: `/${selectedVersion.value}/external/encrypt`,
  },
  'External Encrypt Asymmetric Encryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'publicKeyOrCert', label: 'Public Key', placeholder: 'The public key or certificate used for encryption' },
      { name: 'text1', label: 'Plaintext text 1', placeholder: 'The plaintext data to be encrypted' },
      { name: 'text2', label: 'Plaintext text 2', placeholder: 'The plaintext data to be encrypted' },
    ],
    data: { sessionToken: '', slotId: '', publicKeyOrCert: '', text1: '', text2: '' },
    url: `/${selectedVersion.value}/external/encrypt`,
  },
  'External Encrypt Asymmetric Encryption With Session Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'publicKeyOrCert', label: 'Public Key', placeholder: 'The public key or certificate used for encryption' },
      { name: 'useSessionKey', label: 'True or False', placeholder: 'Optional: Use session key for RSA encryption' },
      { name: 'text1', label: 'Plaintext text 1', placeholder: 'The plaintext data to be encrypted' },
      { name: 'text2', label: 'Plaintext text 2', placeholder: 'The plaintext data to be encrypted' },
    ],
    data: {sessionToken: '', slotId: '', publicKeyOrCert: '', useSessionKey: '', text1: '',  text2: '' },
    url: `/${selectedVersion.value}/external/encrypt`,
  },
  'External Decrypt Symmetric Decryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used for decryption' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The symmetric key used for decryption' },
      { name: 'text1', label: 'Ciphertext text 1', placeholder: 'The encrypted data(Base64-encoded)' },
      { name: 'aad1', label: 'Ciphertext aad 1', placeholder: 'Additional Authentication Data used during encryption(optional)' },
      { name: 'mac1', label: 'Ciphertext mac 1', placeholder: 'Message Authentication Code(MAC) for integrity verification' },
      { name: 'iv1', label: 'Ciphertext iv 1', placeholder: 'Initialization Vectot(IV) used during encryption' },
      { name: 'text2', label: 'Ciphertext text 2', placeholder: 'The encrypted data(Base64-encoded)' },
      { name: 'aad2', label: 'Ciphertext aad 2', placeholder: 'Additional Authentication Data used during encryption(optional)' },
      { name: 'mac2', label: 'Ciphertext mac 2', placeholder: 'Message Authentication Code(MAC) for integrity verification' },
      { name: 'iv2', label: 'Ciphertext iv 2', placeholder: 'Initialization Vectot(IV) used during encryption' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', text1: '', aad1: '', mac1: '', iv1: '', text2: '', aad2: '', mac2: '', iv2: ''},
    url: `/${selectedVersion.value}/external/decrypt`,
  },
  'External Decrypt Asymmetric Decryption': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used for decryption' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The symmetric key used for decryption' },
      { name: 'text1', label: 'Ciphertext text 1', placeholder: 'The encrypted data(Base64-encoded)' },
      { name: 'text2', label: 'Ciphertext text 2', placeholder: 'The encrypted data(Base64-encoded)' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', text1: '', text2: '' },
    url: `/${selectedVersion.value}/external/decrypt`,
  },
  'External Decrypt Asymmetric Decryption With Session Key': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used for decryption' },
      { name: 'wrappedKey', label: 'Wrapped Key 1', placeholder: 'The symmetric key used for decryption' },
      { name: 'text1', label: 'Ciphertext text 1', placeholder: 'The encrypted data(Base64-encoded)' },
      { name: 'mac1', label: 'Ciphertext mac 1', placeholder: 'Message Authentication Code(MAC) for integrity verification' },
      { name: 'iv1', label: 'Ciphertext iv 1', placeholder: 'Initialization Vectot(IV) used during encryption' },
      { name: 'wrappedSessionKey1', label: 'Ciphertext Wrapped Session Key 1', placeholder: 'The wrapped session key obtained during the encryption process' },
      { name: 'text2', label: 'Ciphertext text 2', placeholder: 'The encrypted data(Base64-encoded)' },
      { name: 'mac2', label: 'Ciphertext mac 2', placeholder: 'Message Authentication Code(MAC) for integrity verification' },
      { name: 'iv2', label: 'Ciphertext iv 2', placeholder: 'Initialization Vectot(IV) used during encryption' },
      { name: 'wrappedSessionKey2', label: 'Ciphertext Wrapped Session Key 2', placeholder: 'The wrapped session key obtained during the encryption process' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', text: '', mac: '', iv: '', wrappedSessionKey: ''},
    url: `/${selectedVersion.value}/external/decrypt`,
  },
  'External Tokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the tokenization request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used for tokenization' },
      { name: 'text1', label: 'Plaintext Text1', placeholder: 'The plaintext data to be tokenized' },
      { name: 'formatChar1', label: 'plaintext FormatChar1', placeholder: 'Optional: Format-preserving characters (e.g., credit card masks)' },        
      { name: 'text2', label: 'Plaintext Text2', placeholder: 'The plaintext data to be tokenized' },
      { name: 'formatChar2', label: 'plaintext FormatChar2', placeholder: 'Optional: Format-preserving characters (e.g., credit card masks)' },        
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', text1:'',formatChar1:'',text2:'',formatChar2:'' },
    url: `/${selectedVersion.value}/external/tokenize`,
  },
  'External Detokenize': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot ID', placeholder: 'The ID of the slot associated with the detokenization request' },
      { name: 'wrappingKeyId', label: 'Wrapping Key ID', placeholder: 'The ID of the wrapping key used' },
      { name: 'wrappedKey', label: 'Wrapped Key', placeholder: 'The key used for detokenization' },
      { name: 'token1', label: 'ciphertext Token1', placeholder: ' The tokenized data to be detokenized' },
      { name: 'metadata1', label: 'ciphertext Metadata1', placeholder: '  Optional: Metadata related to tokenization' },
      { name: 'token2', label: 'ciphertext Token2', placeholder: ' The tokenized data to be detokenized' },
      { name: 'metadata2', label: 'ciphertext Metadata2', placeholder: '  Optional: Metadata related to tokenization' },
    ],
    data: { sessionToken: '', slotId: '', wrappingKeyId: '', wrappedKey: '', token1:'',metadata1:'',token2:'',metadata2:'' },
    url: `/${selectedVersion.value}/external/detokenize`,
  },
  'External Sign': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: ' The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the signing request' },
      { name: 'wrappingkeyId', label: 'Wrapping Key Id', placeholder: 'The ID of the wrapping key used to protect the private key' },
      { name: 'wrappedKey', label: 'Private Key', placeholder: 'The private key used for signing' },
      { name: 'data', label: 'Data to Sign', placeholder: 'The plaintext data to be signed' },
    ],
    data: { sessionToken: '', slotId: '', wrappingkeyId: '',wrappedKey: '', data: '' },
    url: `/${selectedVersion.value}/external/sign`,
  },
  'External Verify': {
    fields: [
      { name: 'sessionToken', label: 'Session Token', placeholder: 'The session token for authentication' },
      { name: 'slotId', label: 'Slot Id', placeholder: 'The ID of the slot associated with the verification request' },
      { name: 'publicKeyOrCert', label: 'Public Key', placeholder: 'The public key or certificate for verification' },
      { name: 'signature', label: 'Signature', placeholder: 'The digital signature to be verified' },
      { name: 'data', label: 'Original Data', placeholder: 'The original plaintext data that was signed' },
    ],
    data: { sessionToken: '', slotId: '', PublicKeyOrCert: '', signature: '', data: '' },
    url: `/${selectedVersion.value}/external/verify`,
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
  const endpoint = endpointData[selectedEndpoint.value].url;
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
  formData.useSessionKey = formData.useSessionKey === "true" ? true : formData.useSessionKey === "false" ? false : undefined
  formData.withCert = formData.withCert === "true" ? true : formData.withCert === "false" ? false : undefined
  
  // console.log(endpoint === `/${selectedVersion.value}/seal`)
  if(selectedEndpoint.value === 'Seal' || selectedEndpoint.value === 'External Seal Symmetric Key' || selectedEndpoint.value === 'External Seal Asymmetric Key'){
    formData.plaintext = [
      formData.plaintext1, formData.plaintext2
    ]
  }
  if(selectedEndpoint.value === "Unseal" || selectedEndpoint.value === "External Unseal Symmetric Key" || selectedEndpoint.value === "External Unseal Asymmetric Key"){
    formData.ciphertext = [
      formData.ciphertext1, formData.ciphertext2
    ]
  }
  if(selectedEndpoint.value === "Symmetric Encryption" || selectedEndpoint.value === "External Encrypt Symmetric Encryption"){
    formData.plaintext = [
      {
        text: formData.text1,
        aad: formData.aad1
      },
      {
        text: formData.text2,
        aad: formData.aad2
      }
    ]
  }
  if(selectedEndpoint.value === "Asymmetric Encryption" || selectedEndpoint.value === "Asymmetric Encryption with Session Key" ||  selectedEndpoint.value === "External Encrypt Asymmetric Encryption" || selectedEndpoint.value === "External Encrypt Asymmetric Encryption With Session Key"){
    formData.plaintext = [
      {
        text: formData.text1
      },
      {
        text: formData.text2
      }
    ]
  }
  if(selectedEndpoint.value === "Symmetric Decryption" || selectedEndpoint.value === "External Decrypt Symmetric Decryption"){
    formData.ciphertext = [
      {
        text: formData.text1,
        aad: formData.aad1,
        mac: formData.mac1,
        iv: formData.iv1
      },
      {
        text: formData.text2,
        aad: formData.aad2,
        mac: formData.mac2,
        iv: formData.iv2
      }
    ]
  }
  if(selectedEndpoint.value === "Asymmetric Decryption" || selectedEndpoint.value === "External Decrypt Asymmetric Decryption"){
    formData.ciphertext = [
      {
        text: formData.text1
      },
      {
        text: formData.text2
      }
    ]
  }
  if(selectedEndpoint.value === "Asymmetric Decryption with Session Key" || selectedEndpoint.value === "External Decrypt Asymmetric Decryption With Session Key" ){
    formData.ciphertext = [
      {
        text: formData.text1,
        mac: formData.mac1,
        iv: formData.iv1,
        wrappedSessionKey: formData.wrappedSessionKey1
      },
      {
        text: formData.text2,
        mac: formData.mac2,
        iv: formData.iv2,
        wrappedSessionKey: formData.wrappedSessionKey2
      }
    ]
  }
  if(selectedEndpoint.value === "Tokenize" || selectedEndpoint.value === "External Tokenize"){
    formData.plaintext = [
      {
        text: formData.text1,
        formatChar: formData.formatChar1
      },
      {
        text: formData.text1,
        formatChar: formData.formatChar1
      },
    ]
  }
  if(selectedEndpoint.value === "Detokenize" || selectedEndpoint.value === "External Detokenize"){
    formData.ciphertext = [
      {
        token: formData.token1,
        metadata: formData.metadata1
      },
      {
        token: formData.token2,
        metadata: formData.metadata2
      },
    ]
  }
  // return console.log(formData)

  try {
    const response = await axiosInstance.post(`${endpoint}?token=${localStorage.getItem("token")}`, formData)
    responseData.value = response.data;
    responseMessage.value = `Success: ${response.data.message || 'Request berhasil'}`;
  } catch (error: any) {
    responseMessage.value = `Error: ${error.response.data.message.fault.code} `;
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
        <div v-if="selectedEndpoint" class="mt-4">
          <p class="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Endpoint</p>
          <div :class="{
            'pointer-events-none opacity-50': isDisabled,
            'pointer-events-auto opacity-100': !isDisabled
          }"
          class="col-span-6 bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <h2>{{ endpointData[selectedEndpoint].url }}</h2>
          </div>
        </div>
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
  
    <!-- <div class="rounded-sm border mt-4 border-stroke bg-white px-5 p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
         <p class="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Response</p>     
        <div v-if="responseMessage" class="mb-4 text-gray-800 dark:text-gray-200">
        <p>{{ responseMessage }}</p>
        </div>
        <div v-if="responseData" class="bg-gray-100 p-4 rounded-lg shadow-sm max-h-96 overflow-auto whitespace-pre-wrap">    
        <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(responseData, null, 2) }}</pre>
        </div>
    </div> -->
    <div class="rounded-sm border mt-4 border-stroke bg-white px-5 p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div class="flex justify-between items-center mb-2">
        <p class="text-lg font-bold text-gray-700 dark:text-gray-300">Response</p>
      </div>
      <div v-if="responseMessage" class="mb-4 text-gray-800 dark:text-gray-200">
        <p>{{ responseMessage }}</p>
      </div>
      <div v-if="responseData" class="bg-gray-100 p-4 rounded-lg shadow-sm max-h-96 overflow-auto whitespace-pre-wrap dark:bg-boxdark ">
        <div class="flex justify-end">
          <button
            @click="copyToClipboard"
            class="text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Copy
          </button>
        </div>
        <pre class="text-sm text-gray-800 dark:text-gray-200">{{ JSON.stringify(responseData, null, 2) }}</pre>
      </div>
  </div>
  </DefaultLayout>
</template>
