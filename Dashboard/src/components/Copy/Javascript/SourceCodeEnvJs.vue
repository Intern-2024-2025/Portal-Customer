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
PORT=5003
VERSION='v1.0'
SLOT_ID =1
ENCRYPT_AES=encryptAES
URL_SGKMS=https://lcev.sandhiguna.com:8080/
SESSION_TOKEN
=DgAAAEYAAAADAAAAAAAACAQAAAAAAAAAsAAAABAAAAAAAsAAAABDAAAAB+GlEehNQbH2xh5Y
QsAAAABAAAAuAAAAFSZcabwLjMdnQPgHQwUlyU3es8vE9NFC/ToUMikJsZDLKJJNCl/Kr6Ua2
w13XY4cVnJTv7p+XlOr+axHIWiRArjUb5q1YUTTNG0XobAx4cq+WZFfmMeYGZVbRpvqpxWbs/
UiOHrkQ7qjPq5yfk+QviIf5HsLQAAABAAAADQjjmmJ9iAlBXwoYz2/KZt
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
