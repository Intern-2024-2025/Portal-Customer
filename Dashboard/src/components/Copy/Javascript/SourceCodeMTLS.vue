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
require("dotenv").config();
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

// Load client certificates and keys
const clientCertPath = path.resolve(__dirname, "./postman.pem");
const clientKeyPath = path.resolve(__dirname, "./csrprivatekey.key");
const clientCert = fs.readFileSync(clientCertPath);
const clientKey = fs.readFileSync(clientKeyPath);

// Create an Axios instance with HTTPS agent
const axiosInstance = axios.create({
  baseURL: process.env.URL_SGKMS,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    cert: clientCert,
    key: clientKey,
    rejectUnauthorized: false,
  }),
});

// API call function
async function engineApiSGKMS(endpoint, payload) {
  try {
    const response = await axiosInstance.post(endpoint, payload);
    return response.data;
  } catch (err) {
    return err.response?.data || { error: "Unknown error occurred" };
  }
}

// Root endpoint
app.get("/", (req, res) => {
  res.send("API Running");
});

// Login function
app.post("/v1.0/agent/login", LoginSGKMS);

async function LoginSGKMS(req, res) {
  try {
    const payload = (({ slotId, password }) => ({ slotId, password }))(req.body);
    const data = await engineApiSGKMS("/v1.0/agent/login", payload);

    if (data.fault) {
      return handlerErrorCustom(res, data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
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
