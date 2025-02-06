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
	"crypto/tls"
	"crypto/x509"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

// FaultResponse represents the structure for handling fault responses.
type FaultResponse struct {
	Fault struct {
		Code uint64 `json:"code"`
	} `json:"fault"`
}

// RequestLogin represents the request payload for login.
type RequestLogin struct {
	SlotId   uint32 `json:"slotId"`
	Password string `json:"password"`
}

// ResponseLogin represents the response structure for login.
type ResponseLogin struct {
	Result struct {
		SessionToken     string `json:"sessionToken"`
		AgentDN          string `json:"agentDN"`
		LastUsedTime     uint64 `json:"lastUsedTime"`
		IdleTimeoutInMins uint64 `json:"idleTimeoutInMins"`
		ExpiredAt        uint64 `json:"expiredAt"`
	} `json:"result"`
}

// createRequest creates and sends a request to the given endpoint with the provided payload.
func createRequest(endpoint string, payload string) (string, error) {
	// Load CA certificate
	caCert, err := ioutil.ReadFile("kirovca.pem")
	if err != nil {
		return "", fmt.Errorf("failed to read CA certificate: %w", err)
	}
	caCertPool := x509.NewCertPool()
	caCertPool.AppendCertsFromPEM(caCert)

	// Load client certificate and private key
	cert, err := tls.LoadX509KeyPair("kirovcertificatename.pem", "kirovprivate.key")
	if err != nil {
		return "", fmt.Errorf("failed to load client certificate and key: %w", err)
	}

	// Build URL
	baseUrl := "https://10.30.0.3:8080"
	version := "v1"
	fullURL, err := url.JoinPath(baseUrl, version, endpoint)
	if err != nil {
		return "", fmt.Errorf("failed to join URL path: %w", err)
	}

	// Create HTTP client with custom TLS configuration
	client := &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				RootCAs:            caCertPool,
				InsecureSkipVerify: true, // WARNING: Use only for testing. Not recommended for production.
				Certificates:       []tls.Certificate{cert},
			},
		},
	}

	// Create HTTP request
	req, err := http.NewRequest("POST", fullURL, strings.NewReader(payload))
	if err != nil {
		return "", fmt.Errorf("failed to create HTTP request: %w", err)
	}
	req.Header.Add("Connection", "close")
	req.Header.Add("Content-Type", "application/json")

	// Send HTTP request
	res, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send HTTP request: %w", err)
	}
	defer res.Body.Close()

	// Read response body
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %w", err)
	}

	// Handle HTTP 400 Bad Request
	if res.StatusCode == http.StatusBadRequest {
		var faultResponse FaultResponse
		if err := json.Unmarshal(body, &faultResponse); err != nil {
			return "", fmt.Errorf("failed to unmarshal fault response: %w", err)
		}
		return "", errors.New(fmt.Sprintf("fault code: %d", faultResponse.Fault.Code))
	}

	return string(body), nil
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
