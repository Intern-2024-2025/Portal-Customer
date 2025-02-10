<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SidebarAreaClient from '@/components/Sidebar/SidebarAreaClient.vue';
import HeaderArea from '@/components/Header/HeaderArea.vue';

const pageTitle = ref('Postman Integration')

const downloadJSON = () => {
  const link = document.createElement('a')
  link.href = new URL(
    '@/assets/sandhiguna-rest-api/Sandhiguna_Rest_API_v1.0.postman_collection',
    import.meta.url
  ).href
  link.download = 'Sandhiguna Rest API.json'
  link.click()
}
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
              <main
                class="flex-1 p-4 h-screen lg:overflow-y-auto w-full lg:w-3/4 sm:overflow-y-hidden"
              >
                <div class="w-56">
                  <a href="https://www.postman.com/" target="_blank">
                    <img
                      src="../../assets/images/logo/logo-postman.png"
                      class="flex mt-10 h-16 pl-6 mb-6 max-w-full sm:max-h-32"
                      alt="logo-postman"
                    />
                  </a>
                </div>
                <section id="overview1" class="mb-6 pr-6 pl-6">
                  <h2 class="text-2xl font-bold mb-4 pt-8">Overview</h2>
                  <p class="text-lg">
                    Postman is a tool designed to help developers building , test, and use APIs more
                    effectively. It provides a user-friendly platform that simplifies every stage of
                    the API lifecycle, from development to testing, documentation, and deployment.
                    Postman also makes teamwork easier by enabling real-time collaboration, allowing
                    teams to share API requests, collections, and workflows effortlessly. By
                    streamlining these processes, Postman helps developers save time, reduce errors,
                    and deliver high-quality APIs faster and more efficiently.
                  </p>
                </section>
                <section id="overview2" class="mb-6 pr-6 pl-6">
                  <h2 class="text-2xl font-bold mb-4 pt-8">Getting Started</h2>
                  <p class="text-lg mb-6">
                    Using the Sandhiguna REST API requires a certificate and a key generated during
                    the application registration process. These components are crucial for
                    establishing a secure connection between your application and the LCEV system,
                    ensuring that only authenticated applications can access and interact with SGKMS
                    services.
                  </p>

                  <ul class="list-disc pl-6 space-y-4">
                    <li class="text-lg">
                      <span class="font-semibold text-lg">Certificate and Key:</span>
                      The certificate and key are obtained during the application registration
                      process. Certificates are usually in
                      <code>.pem</code> format, and keys in <code>.key</code> format. Once you have
                      these:
                      <ul class="list-decimal pl-6 mt-2 space-y-2 text-lg">
                        <li>
                          Open Postman and go to <strong>File &gt; Settings</strong>. (Postman
                          version 11.28.3)
                        </li>
                        <img
                          src="../../assets/images/documentation/PostmanIntegration/setting-postman.png"
                          class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl h-auto object-contain"
                          alt="setting postman"
                        />
                        <li>
                          Select the <strong>Certificates</strong> tab and klik<strong>
                            Add Sertificate</strong
                          >.
                        </li>
                        <img
                          src="../../assets/images/documentation/PostmanIntegration/add-sertificate.png"
                          class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl h-auto object-contain"
                          alt="insert sertificate"
                        />
                        <li>
                          Enter the host, certificate file <code>.pem</code>, and key file
                          <code>.key</code>, then click <strong>Add</strong>.
                        </li>
                        <img
                          src="../../assets/images/documentation/PostmanIntegration/save-sertificate.png"
                          class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl h-auto object-contain"
                          alt="add sertificate"
                        />
                      </ul>
                    </li>
                    <li class="text-lg">
                      <span class="font-semibold mb-6">Setting Up Variables:</span>
                      Click Sandhiguna Rest API Collection. Navigate to the
                      <strong>Variables</strong> tab and populate the
                      <strong>Current Value</strong> column with the required data for API testing.
                      Click save or <strong>ctrl+s</strong> to save variables.
                      <img
                        src="../../assets/images/documentation/PostmanIntegration/add-variable.png"
                        class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl h-auto object-contain"
                        alt="add variable"
                      />
                    </li>
                  </ul>
                </section>
                <section id="overview3" class="mb-16 pr-6 pl-6">
                  <h2 class="text-2xl font-bold mb-4 pt-8">Make Your First API Call</h2>
                  <p class="text-lg">
                    After completing the steps above, the next step is to test the Sandhiguna Rest
                    API:
                  </p>
                  <ul class="list-disc pl-6 space-y-4">
                    <ul class="list-disc pl-6 space-y-4">
                      <li class="text-lg">
                        <span class="font-semibold text-lg">Login API:</span>
                        <ul class="list-decimal pl-6 mt-2 space-y-2 text-lg">
                          <li>Select the Sandhiguna Rest API collection in Postman.</li>
                          <li>Choose the Agent section and then select the Login endpoint.</li>
                          <li>Enter your <code>slotId</code> and <code>password </code>.</li>
                          <li>Click the Send Request button.</li>
                          <li>
                            If a response is successfully displayed, it means the process of using
                            the Sandhiguna REST API has been completed successfully.
                          </li>
                          <img
                            src="../../assets/images/documentation/PostmanIntegration/result-login.png"
                            class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl h-auto object-contain"
                            alt="insert sertificate"
                          />
                        </ul>
                      </li>
                      <p class="">
                        <strong>Be Cautious:</strong>
                        maximum number of failed login attempts is 3. After exceeding this limit,
                        the application will be locked.
                      </p>
                    </ul>
                  </ul>
                </section>
                <section id="overview4" class="mb-54 pr-6 pl-6">
                  <h2 class="text-2xl font-bold mb-4">Download Sandhiguna Rest API Collection</h2>
                  <p class="text-lg">
                    All Sandhiguna REST API endpoints use the POST method and require a sessionToken
                    obtained from the login process to access them. Additionally, certain endpoints
                    require a keyId created by the administrator. This collection provides secure
                    and structured access to the available Sandhiguna REST API services. Download
                    the following collection to try it out.
                  </p>
                  <div>
                    <div class="flex items-start gap-2.5 mt-6">
                      <div class="flex flex-col gap-1">
                        <div
                          class="flex flex-col w-full max-w-[320px] p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700"
                        >
                          <div class="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
                            <div class="me-2">
                              <span
                                class="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2"
                              >
                                Sandhiguna Rest API
                              </span>
                              <span
                                class="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2"
                              >
                                .json
                              </span>
                            </div>
                            <div class="inline-flex self-center items-center">
                              <button
                                @click="downloadJSON"
                                class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-xl hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
                                type="button"
                              >
                                <svg
                                  class="w-4 h-4 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"
                                  />
                                  <path
                                    d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
              <aside class="hidden lg:block w-1/4 p-4">
                <h2 class="text-l font-medium mb-4">Sub Header</h2>
                <ul>
                  <li class="mb-1"><a href="#overview1" class="hover:underline">Overview</a></li>
                  <li class="mb-1"><a href="#overview2" class="hover:underline">Get Started</a></li>
                  <li class="mb-1">
                    <a href="#overview3" class="hover:underline">Make Your First API Call</a>
                  </li>
                  <li class="mb-1">
                    <a href="#overview4" class="hover:underline"
                      >Download Sandhiguna Rest API Collection</a
                    >
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
