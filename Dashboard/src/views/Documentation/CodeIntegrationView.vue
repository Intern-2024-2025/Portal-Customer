<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
// import DefaultLayout from '@/layouts/DefaultLayout.vue'
// import SourceCodeCurl from '@/components/Copy/CurlAndGuzzle/SourceCodeCurl.vue'
// import SourceCodeGuzzle from '@/components/Copy/CurlAndGuzzle/SourceCodeGuzzle.vue'
// import SourceCodeVariabel from '@/components/Copy/CurlAndGuzzle/SourceCodeVariabel.vue'
// import SourceCodeLogin from '@/components/Copy/CurlAndGuzzle/SourceCodeLogin.vue'
// import SourceCodeRefreshSession from '@/components/Copy/CurlAndGuzzle/SourceCodeRefreshSession.vue'
// import SourceCodeEncrypt from '@/components/Copy/CurlAndGuzzle/SourceCodeEncrypt.vue'
// import SourceCodeDecryption from '@/components/Copy/CurlAndGuzzle/SourceCodeDecryption.vue'
// import SourceCodeTroubleshoot from '@/components/Copy/CurlAndGuzzle/SourceCodeTroubleshoot.vue'
// import SourceCodeLaravel from '@/components/Copy/Laravel/SourceCodeLaravel.vue'
// import SourceCodeGolang from '@/components/Copy/Golang/SourceCodeGolang.vue'
// import SourceCodeGolangLogin from '@/components/Copy/Golang/SourceCodeGolangLogin.vue'
import SourceCodeMTLS from '@/components/Copy/Javascript/SourceCodeMTLS.vue'
// import SourceCodeLoginJS from '@/components/Copy/Javascript/SourceCodeRefreshSessionJS.vue'
import SourceCodeEncryptionJS from '@/components/Copy/Javascript/SourceCodeEncryptionJS.vue'
import SourceCodeEnvJs from '@/components/Copy/Javascript/SourceCodeEnvJs.vue'
import SourceCodeRefreshSessionJS from '@/components/Copy/Javascript/SourceCodeRefreshSessionJS.vue'
import SourceCodeDecryptionJS from '@/components/Copy/Javascript/SourceCodeDecryptionJS.vue'
import SidebarAreaClient from '@/components/Sidebar/SidebarAreaClient.vue'
import HeaderArea from '@/components/Header/HeaderArea.vue'

const pageTitle = ref('Code Integration')
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SidebarAreaClient />
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <HeaderArea />
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 lg:fixed md:static">
          <slot>
            <BreadcrumbDefault :page-title="pageTitle" />
            <div class="flex flex-col lg:flex-row bg-white dark:border-strokedark dark:bg-boxdark">
              <main class="flex-1 p-4 h-screen overflow-y-auto w-full lg:w-3/4">
                <section id="overview1" class="mb-6 pr-6 pl-6">
                  <h2 class="text-2xl font-bold mb-4 pt-8">Introduction</h2>
                  <p class="text-lg mb-6">
                    Sandhiguna Key Management System (SG-KMS) is a cryptographic and key management
                    software with a hardware-based TEE as its root of trust. It manages
                    cryptographic objects, such as keys and certificates, and carries out secure and
                    high-performing cryptographic operations. It is a secured and centralized key
                    management system that business applications can efficiently access by using
                    SG-KMS SDK or by calling SG-KMS RestAPI.
                    <br /><br />
                    SG-KMS SDK and Rest API comprises of various cryptographic API for the developer
                    to integrate their application with SG-KMS. The SG-KMS SDK is available in
                    programming languages <code>java</code>. For other programming languages which
                    are not supported by the SDK, the developer is advised to use Rest API. Please
                    refer to Rest API and language specific SDK API document for more information
                    about the API descriptions.
                  </p>
                </section>
                <section id="overview2" class="mb-6 pr-6 pl-6">
                  <h2 class="text-2xl font-bold mb-4 pt-8">Sandhiguna KMS Architecture</h2>
                  <p class="text-lg mb-6">
                    SG-KMS consists of three main components, namely LCEV, CCEV, and Audit Log
                    Server, separated for clear segregation of duty
                  </p>

                  <ul class="list-disc pl-6 space-y-4">
                    <li class="text-lg">
                      <span class="font-semibold text-lg"
                        >Centralized Cryptographic Engine and Vault (CCEV)</span
                      >
                      <p>Known as <code>Key Management Server</code>, its main functions are:</p>
                      <ul class="list-decimal pl-6 mt-2 space-y-2 text-lg">
                        <li>
                          Manage the entire key life cycle securely (key management), such as key
                          generation, key distribution, and key rotation.
                        </li>
                        <li>Store keys, secrets, and certificates centrally.</li>
                        <li>
                          Distribute the keys to LCEV local vault with a secure key exchange
                          protocol.
                        </li>
                      </ul>
                    </li>
                    <li class="text-lg">
                      <span class="font-semibold text-lg"
                        >Local Cryptographic Engine and Vault (LCEV)</span
                      >
                      <p>
                        Also known as <code>Cryptographic Server</code>, its main functions are:
                      </p>
                      <ul class="list-decimal pl-6 mt-2 space-y-2 text-lg">
                        <li>To cache the encryption keys, secrets, or certificates locally.</li>
                        <li>
                          Provide cryptographic operations to your business application securely in
                          the forms of:
                          <ul class="list-disc pl-4">
                            <li>
                              <code>SG-KMS SDK API</code>. The SG-KMS SDK is available in java
                              <!-- , php, golang, and .Net. -->
                            </li>
                            <li>
                              <code>SG-KMS Rest API</code>. LCEV provides minimum HTTPS service,
                              only enough to serve the business applications to prevent complexity.
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li class="text-lg">
                      <span class="font-semibold text-lg">Audit Log Server</span>
                      <p>
                        Audit Log Server dedicated to logging all administrator's activities in a
                        tamper-proof system, stored in an embedded SQLite database. The system is
                        secured cryptographically with a hardware-based root of trust and
                        protection. For security reasons, SG-KMS does not provide any direct query
                        utility that connects to Audit Log Service.
                      </p>
                    </li>
                  </ul>
                </section>
                <section id="overview3" class="mb-56 pr-6 pl-6">
                  <h2 class="text-2xl font-bold mb-4 pt-8">Cryptographic Services</h2>
                  <p class="text-lg">
                    To use cryptographic services, you can use Rest API or SDK API as an interface.
                    This guide will help you to understand how to call the Rest API or SDK API with
                    code examples on supported programming languages. We assume that you know, in a
                    general sense of Rest API and SDK API work.
                  </p>
                  <ul id="overview4" class="pt-8 space-y-4">
                    <li class="text-lg">
                      <span class="font-semibold"
                        >1. Code Example for Calling Rest API using ExpressJs</span
                      >
                      <p class="mt-2 mb-2 ml-6">
                        To integrate SGKMS Rest API into javascript programming language follow
                        these steps:
                      </p>
                      <ul class="list-decimal ml-6 text-lg">
                        <li class="ml-6 mt-2 mb-2">
                          Create a folder named <code>test-api</code> to store your project.
                        </li>
                        <li class="ml-6 mt-2 mb-2">
                          Open your terminal, navigate to the test-api folder using the command
                          <code>cd test-api</code>.
                        </li>
                        <li class="ml-6 mt-2 mb-2">
                          Run the command <code>npm init -y</code> to initialize the project and
                          create a package.json file.
                        </li>
                        <li class="ml-6 mt-2 mb-2">
                          Install the required libraries by running
                          <code>npm install express axios https fs dotenv</code>.
                        </li>
                        <li class="ml-6 mt-2 mb-2">
                          Inside the test-api folder, create a new file named index.js and .env.
                        </li>
                        <li class="ml-6 mt-2 mb-2">
                          Open the index.js file and add the following code:
                        </li>
                        <SourceCodeMTLS />
                        <p class="mt-2 mb-2">
                          Before calls to the Rest API, set the variables regarding the service you
                          will call. Sample below is variable for calling Sandhiguna Rest API.
                        </p>
                        <SourceCodeEnvJs />
                        <p class="mt-2 mb-2">
                          The lifetime of session Token is one hour. If the application still wants
                          to call cryptographic services and the session is almost an hour, the
                          application can call refresh below to extend the session.
                        </p>
                        <SourceCodeRefreshSessionJS />
                        <ul class="list-disc mt-4 ml-6">
                          <li>Data Encryption</li>
                          <p>
                            Data encryption needs some additional data based on the algorithm of the
                            key. SG-KMS support data encryption using AES and RSA. The key can be
                            generated in SGCLI or imported from other systems.
                          </p>
                          <ul class="list-decimal ml-6 p-2">
                            <li class="mb-2">Encryption using AES key</li>
                            <p>
                              Since the algorithm is AES-256-GCM, it requires Additional
                              Authenticated Data (AAD) as a parameter. There is no restriction for
                              AAD length, but the maximum total payload plaintext and AAD cannot be
                              more than 700KB.
                            </p>
                            <li class="mb-2 mt-2">Encryption using RSA key</li>
                            <p class="mb-2 mt-2">
                              Encryption with RSA key can be done directly or using session key.
                              Direct encryption using RSA key is limited with a maximum text size 42
                              bytes. For bigger data, you can use RSA encryption using session key.
                              The maximum payload of RSA encryption using session key is 700 KB
                              (same as using AES key).
                            </p>
                            <SourceCodeEncryptionJS />
                          </ul>
                          <li class="mt-4">Data Decryption</li>
                          <p class="mb-2 mt-2">
                            The parameters of decryption using AES and RSA are a little bit
                            different. AES key has a version, so it needs to pass the version of the
                            AES key. The rest of the parameters are same between AES and RSA, which
                            are, key ID, the slot of key, ciphertext including the AAD, MAC, and IV.
                          </p>
                          <SourceCodeDecryptionJS />
                        </ul>
                      </ul>
                    </li>
                  </ul>
                  <!-- <ul id="overview4" class="pt-8 space-y-4">
            <li class="text-lg">
              <span class="font-semibold"
                >1. Code example for calling RestAPI using PHP cURL and Guzzle</span
              >
              <p class="p-4">Applications needs to connect to Rest API using mutual TLS.</p>
              <ul class="list-disc ml-4">
                <li class="font-semibold ml-4 mb-2">Curl</li>
                <SourceCodeCurl />
                <li class="font-semibold ml-4 mt-6 mb-2">Guzzle</li>
                <p class="mb-2">
                  User need to do composer require guzzlehttp/guzzle and connect to the Rest API
                  using mTLS
                </p>
                <SourceCodeGuzzle />
                <p class="mb-2 pt-2">
                  The following is code examples for PHP cURL and guzzle. Before calls to the Rest
                  API, set the variables regarding the service you will call. Sample below is
                  variable for calling encryption and signing.
                </p>
                <SourceCodeVariabel />
                <p class="mb-2 pt-2">
                  The following is a sample code for calling cryptographic services using Rest API.
                  The application needs to log in first to create a session. The lifetime of session
                  is one hour.
                </p>
                <SourceCodeLogin />
                <p class="mb-2 mt-2">
                  If the application still wants to call cryptographic services and the session is
                  almost an hour, the application can call refresh below to extend the session.
                </p>
                <SourceCodeRefreshSession />
                <p class="mb-2 mt-2">
                  The following are sample codes for some cryptographic services: To run the
                  following services, the application needs to pass the session token that is gotten
                  when login.
                </p>
                <ul class="list-disc mt-4 ml-6">
                  <li>Data Encryption</li>
                  <p>
                    Data encryption needs some additional data based on the algorithm of the key.
                    SG-KMS support data encryption using AES and RSA. The key can be generated in
                    SGCLI or imported from other systems.
                  </p>
                  <ul class="list-decimal ml-6 p-2">
                    <li class="mb-2">Encryption using AES key</li>
                    <p>
                      Since the algorithm is AES-256-GCM, it requires Additional Authenticated Data
                      (AAD) as a parameter. There is no restriction for AAD length, but the maximum
                      total payload plaintext and AAD cannot be more than 700KB.
                    </p>
                    <li class="mb-2 mt-2">Encryption using RSA key</li>
                    <p class="mb-2 mt-2">
                      Encryption with RSA key can be done directly or using session key. Direct
                      encryption using RSA key is limited with a maximum text size 42 bytes. For
                      bigger data, you can use RSA encryption using session key. The maximum payload
                      of RSA encryption using session key is 700 KB (same as using AES key).
                    </p>
                    <SourceCodeEncrypt />
                  </ul>
                  <li class="mt-4">Data Decryption</li>
                  <p class="mb-2 mt-2">
                    The parameters of decryption using AES and RSA are a little bit different. AES
                    key has a version, so it needs to pass the version of the AES key. The rest of
                    the parameters are same between AES and RSA, which are, key ID, the slot of key,
                    ciphertext including the AAD, MAC, and IV.
                  </p>
                  <SourceCodeDecryption />
                  <li class="mt-4">Troubleshooting</li>
                  <p class="mb-2 mt-2">
                    If for some reason SGKMS Rest API returned <code>{"fault":{"code":1001}}</code>,
                    add header Expect: into the request. Example for cURL:
                  </p>
                  <SourceCodeTroubleshoot />
                </ul>
              </ul>
            </li>
          </ul>
          <ul id="overview5" class="pt-8 space-y-4">
            <li class="text-lg">
              <span class="font-semibold"
                >2. Code Examples for Calling Rest API using PHP Lavarel</span
              >
              <p class="mt-2 mb-2 ml-6">To reproduce the examples follow the following steps:</p>
              <ul class="list-decimal ml-4">
                <li class="ml-8 mb-2">
                  Create sample laravel project using command
                  <code> composer createproject laravel/laravel test-api</code>.
                </li>
                <li class="ml-8 mb-2">
                  Go to the project directory and edit the <code> /routes/web.php </code>, for this
                  example we can just put everything into the route without using controller.
                </li>
                <SourceCodeLaravel />
                <li class="ml-8 mb-2 mt-2">Run the project using php artisan serve</li>
                <li class="ml-8 mb-2">
                  Load the related cryptographic service Rest API
                  <code> http://127.0.0.1:8000/test-sgkms-login </code>, it should show the
                  response.
                </li>
              </ul>
            </li>
          </ul>
          <ul id="overview6" class="pt-8 space-y-4">
            <li class="text-lg">
              <span class="font-semibold"
                >3. Code Example for Calling Rest API using Go Language</span
              >
              <p class="mt-2 mb-2 ml-6">
                Applications need to connect to RestAPI using mutual TLS.
              </p>
              <ul class="list-decimal ml-6">
                <SourceCodeGolang />
                <p class="mt-2 mb-2">
                  The following is a sample code for calling cryptographic services using
                  RestAPI.<br />
                  The application needs to log in first to create a session. The lifetime of session
                  is one hour
                </p>
                <SourceCodeGolangLogin />

                <p class="mt-2 mb-2">
                  The following are sample codes for some cryptographic services: To run the
                  following services, the application needs to pass the session token that is gotten
                  when login.
                </p>
              </ul>
            </li>
          </ul> -->
                </section>
              </main>
              <aside class="hidden lg:block w-1/4 p-4">
                <h2 class="text-l font-medium mb-4">Sub Header</h2>
                <ul>
                  <li class="mb-1"><a href="#overview1" class="hover:underline">Introduction</a></li>
                  <li class="mb-1">
                    <a href="#overview2" class="hover:underline">Sandhiguna KMS Architecture</a>
                  </li>
                  <li class="mb-1">
                    <a href="#overview3" class="hover:underline mb-1">Cryptographic Services</a>
                    <ul class="pl-4 mb-1">
                      <li>
                        <a href="#overview4" class="hover:underline"
                          >Code Example for Calling Rest API using ExpressJs</a
                        >
                      </li>
                      <!-- <li>
                <a href="#overview4" class="hover:underline"
                  >Code example for calling RestAPI using PHP cURL and Guzzle</a
                >
              </li>
              <li>
                <a href="#overview5" class="hover:underline"
                  >Code Examples for Calling Rest API using PHP Lavarel</a
                >
              </li>
              <li>
                <a href="#overview6" class="hover:underline"
                  >Code Example for Calling Rest API using Go Language</a
                >
              </li> -->
                    </ul>
                  </li>
                </ul>
              </aside>
            </div>
          </slot>
        </div>
      </main>
    </div>
  </div>
</template>
