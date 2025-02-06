<template>
  <div class="lg:flex justify-between sm:mb-6 mb-6 lg:mb-0">
    <div
      class="lg:w-1/2 sm:w-full sm:mb-4 mb-4 lg:mb-0 rounded-sm border overflow-auto lg:mr-2 border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <h4 class="mb-6 text-xl font-semibold text-black dark:text-white mt-2">Sertificate</h4>
      <p>Sertificate with format .pem</p>
      <div   
        class="bg-gray-100 p-4 rounded-lg shadow-sm max-h-96 overflow-hidden whitespace-pre-wrap dark:bg-boxdark"
      >
        <div class="flex justify-end">
          <button
            @click="copyToClipboard(dataProduct?.csr_key)"
            class="text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Copy
          </button>
        </div>
        <pre class="text-sm text-gray-800 text-center h-32 dark:text-gray-200">{{
          dataProduct ? dataProduct.csr_key : 'Not Sertificate'
        }}</pre>
      </div>
      <p class="p-2 mt-4">Sertificate with format .key</p>
      <div
        class="bg-gray-100 p-4 mb-16 rounded-lg shadow-sm max-h-96 overflow-hidden whitespace-pre-wrap dark:bg-boxdark"
      >
        <div class="flex justify-end">
          <button
            @click="copyToClipboard(dataProduct?.postman_pem)"
            class="text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Copy
          </button>
        </div>
        <pre class="text-sm text-gray-800 text-center h-32 dark:text-gray-200">{{
          dataProduct ? dataProduct.postman_pem : 'Not Sertificate'
        }}</pre>
      </div>
    </div>
    <div
      class="items-center lg:w-1/2 sm:w-full rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <div class="items-center overflow-x-auto">
        <table>
          <thead>
            <h4 class="mb-6 text-xl font-semibold text-black dark:text-white mt-2">Key Id</h4>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="w-[250px] py-4 px-4 font-medium text-black dark:text-white">
                Key Purpose
              </th>
              <th class="w-[200px] py-4 px-4 font-medium text-black dark:text-white">Key Id</th>
              <th class="w-[150px] py-4 px-4 font-medium text-black dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!dataProduct">
              <td
                colspan="8"
                class="py-10 text-center text-gray-500 bg-white dark:text-white dark:bg-boxdark"
              >
                No Key Id Data Available
              </td>
            </tr>
            <tr v-else v-for="item in dataProduct.keyId" :key="item.id">
              <td class="py-4 px-4 min-w-[120px]">
                <h5 class="font-medium text-black dark:text-white">{{ item.keypurpose }}</h5>
              </td>
              <td class="py-4 px-4 min-w-[120px]">
                <ul>
                  <li v-for="(key, keyIndex) in item.keyId" :key="keyIndex">
                    <span class="text-black dark:text-white">{{ key }}</span>
                  </li>
                </ul>
              </td>

              <td class="py-4 px-4 min-w-[120px]">
                <ul>
                  <li v-for="(key, keyIndex) in item.keyId" :key="keyIndex">
                    <button
                      @click="copyToClipboard(key)"
                      class="text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      Copy
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Product = {
  id: string
  name: string
  csr_key: string
  password: string
  keyId: any
  postman_pem: string
  slot_id: string
  status: boolean
}

defineProps<{
  dataProduct: Product | undefined
}>()

const copyToClipboard = (data: any) => {
  if (data) {
    const textToCopy = data
    navigator.clipboard
      .writeText(textToCopy)
      .then()
      .catch((err) => alert('Gagal menyalin data: ' + err))
  }
}
</script>
