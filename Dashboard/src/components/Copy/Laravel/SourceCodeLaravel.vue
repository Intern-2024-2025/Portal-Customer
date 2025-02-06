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

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Here is where you can register web routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| which contains the "web" middleware group. Now create something great!
*/

Route::get('/', function () {
    return view('welcome');
});

function postCallAPI($url, $data, $die_if_fault = true)
{
    // For mTLS
    $ca_cert = __DIR__ . "/ca.crt"; // CA Certificate filename
    $csr_priv_key = __DIR__ . "/csrprivatekey.key"; // Client private key filename
    $client_cert = __DIR__ . "/Finance1.crt"; // Client certificate filename

    $headers = [
        'Content-Type' => 'application/json',
    ];

    $response = Http::withOptions([
        "headers" => $headers,
        "verify" => $ca_cert,
        "cert" => $client_cert,
        "ssl_key" => $csr_priv_key,
        "curl" => [
            CURLOPT_SSLVERSION => CURL_SSLVERSION_TLSv1_3,
        ],
    ])->post($url, $data);

    echo "Call to " . $url . " :<br>Request:<br>" . json_encode($data) . "<br>Response:<br>" . $response->body() . "<br><br>";

    if ($die_if_fault && !$response->ok()) {
        die("Exited because Fault " . $response->status() . " response returned<br>");
    }

    return json_decode($response->body());
}

Route::get('/test-sgkms-login', function () {
    $slot_id = 1;
    $slot_password = "sandhiguna";
    $url = 'https://lcev.sandhiguna.com:8080/v1';

    // Login
    $body = [
        "slotId" => $slot_id,
        "password" => $slot_password,
    ];

    $response = postCallAPI($url . '/agent/login', $body);
    $session_token = $response->result->sessionToken;

    // Call everything else here...
});
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
