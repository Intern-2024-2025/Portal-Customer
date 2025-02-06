<template>
  <p v-if="copied" class="text-green-500">Code copied to clipboard!</p>
  <div class="flex justify-end bg-gray-800 p-2">
    <button
      @click="copyToClipboard"
      class="text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none"
    >
      Copy
    </button>
  </div>
  <pre ref="codeArea" class="text-sm overflow-x-auto bg-boxdark p-8 pt-1 mb-1 dark:bg-boxdark">
    <code class="text-gray-400">
&#60;?php

// For mTLS
$ca_cert = "ca.crt"; // CA Certificate filename
$csr_priv_key = "csrprivatekey.key"; // Client private key filename
$client_cert = "Finance01.crt"; // Client certificate filename

function postCallAPI($url, $data, $die_if_fault = true)
{
    global $ca_cert, $csr_priv_key, $client_cert;

    $curl = curl_init();

    curl_setopt($curl, CURLOPT_POST, 1);

    if ($data) {
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    }

    // Options
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
    ]);

    // mTLS
    curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_3);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($curl, CURLOPT_SSLCERT, $client_cert);
    curl_setopt($curl, CURLOPT_SSLKEY, $csr_priv_key);
    curl_setopt($curl, CURLOPT_CAINFO, $ca_cert);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($curl);

    if (!$result) {
        die("Calling to " . $url . " Failed: " . curl_error($curl) . "\r\n");
    }

    curl_close($curl);

    echo "Call to " . $url . " :\r\nRequest:\r\n" . $data . "\r\nResponse:\r\n" . $result . "\r\n\r\n";

    $decoded_result = json_decode($result);

    if ($die_if_fault) {
        if (!isset($decoded_result->result)) {
            die("Exited because Fault response returned\r\n");
        }
    }

    return $decoded_result;
}
  </code></pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)
const codeArea = ref<HTMLPreElement | null>(null)

const copyToClipboard = () => {
  if (codeArea.value) {
    const range = document.createRange()
    const selection = window.getSelection()

    // Pilih teks dalam <pre>
    range.selectNodeContents(codeArea.value)
    selection?.removeAllRanges()
    selection?.addRange(range)

    // Salin teks
    document.execCommand('copy')
    selection?.removeAllRanges()

    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}
</script>
