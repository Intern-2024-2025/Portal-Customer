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
async function RefreshToken(req, res) {
  try {
    const response = await SGKMS.engineApiSGKMS(
      `/${process.env.VERSION}/agent/refreshSession`,
      {
        sessionToken: process.env.SESSION_TOKEN,
        slotId: parseInt(process.env.SLOT_ID, 10),
      }
    );
    process.env.SESSION_TOKEN = response.result.sessionToken;
  } catch (error) {
    if (res) {
      return res.status(500).json(error);
    }
    console.error("Error refreshing token:", error);
  }
}

// Refresh token automatically every 60 seconds
setInterval(() => {
  RefreshToken();
}, 60000);
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
