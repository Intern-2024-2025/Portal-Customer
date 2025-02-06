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

require __DIR__ . "/vendor/autoload.php";

$client = new GuzzleHttp\Client();

// For mTLS
$ca_cert = "ca.crt"; // CA Certificate filename
$csr_priv_key = "csrprivatekey.key"; // Client private key filename
$client_cert = "Finance01.crt"; // Client certificate filename

function postCallAPI($url, $data, $die_if_fault = true)
{
    global $ca_cert, $csr_priv_key, $client_cert, $client;

    // Options
    $headers = [
        'Content-Type' => 'application/json',
    ];

    // mTLS
    try {
        $result = $client->post($url, [
            "headers" => $headers,
            "body" => $data,
            "verify" => $ca_cert,
            "cert" => $client_cert,
            "ssl_key" => $csr_priv_key,
            "curl" => [
                CURLOPT_SSLVERSION => CURL_SSLVERSION_TLSv1_3
            ]
        ]);

        echo "Call to " . $url . " :\r\nRequest:\r\n" . $data . "\r\nResponse:\r\n" . $result->getBody() . "\r\n\r\n";

        $decoded_result = json_decode($result->getBody());
        return $decoded_result;

    } catch (GuzzleHttp\Exception\ClientException $e) {
        $result = $e->getResponse();
        echo "Call to " . $url . " :\r\nRequest:\r\n" . $data . "\r\nResponse:\r\n" . $result->getBody() . "\r\n\r\n";

        if ($die_if_fault) {
            die("Exited because Fault " . $result->getStatusCode() . " response returned\r\n");
        }
    }
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
