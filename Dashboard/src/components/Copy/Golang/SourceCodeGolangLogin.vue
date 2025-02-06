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
package main

import (
	"encoding/json"
	"fmt"
)

// Login performs the login process and returns the login response.
func login(requestLogin RequestLogin) (ResponseLogin, error) {
	// Serialize the request payload
	req, err := json.Marshal(requestLogin)
	if err != nil {
		return ResponseLogin{}, fmt.Errorf("failed to marshal login request: %w", err)
	}

	// Make the API call
	response, err := createRequest("agent/login", string(req))
	if err != nil {
		return ResponseLogin{}, fmt.Errorf("failed to create request: %w", err)
	}

	// Deserialize the response
	var res ResponseLogin
	if err := json.Unmarshal([]byte(response), &res); err != nil {
		return ResponseLogin{}, fmt.Errorf("failed to unmarshal login response: %w", err)
	}

	return res, nil
}

// Main function to initiate the login process
func main() {
	// Call the login function with request parameters
	responseLogin, err := login(RequestLogin{
		SlotId:   1,
		Password: "kamukamu",
	})
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	// Print the login response
	fmt.Printf("Login Successful: %+v\n", responseLogin)
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
