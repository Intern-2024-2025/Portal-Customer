<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-6 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>     
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Name</th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Slot Id</th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Password</th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Cout Trial
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
              Count Already Use
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
            <!-- <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-if="!dataProduct">
            <td
              colspan="8"
              class="py-10 text-center text-gray-500 bg-white dark:text-white dark:bg-boxdark"
            >
              No Product Data Available
            </td>
          </tr>
          <!-- <tr v-else v-for="(item, index) in dataProduct" :key="index"> -->
          <tr v-else>
            <td class="py-4 px-4 min-w-[120px]">
              <h5 class="font-medium text-black dark:text-white">{{ dataProduct.name }}</h5>
            </td>
            <td class="py-4 px-4 min-w-[120px]">
              <p class="text-black dark:text-white">{{ dataProduct.slot_id }}</p>
            </td>
            <td class="py-4 px-4 min-w-[120px]">
              <div class="flex">
                <p class="text-black dark:text-white">
                  {{ isPasswordVisible ? dataProduct?.password : maskedPassword }}
                </p>
                <button
                  @click="togglePasswordVisibility"
                  class="ml-2 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  <svg
                    v-if="isPasswordVisible"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0c0 3.5 4.5 7 6 7s6-3.5 6-7-4.5-7-6-7-6 3.5-6 7z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.98 8.41a10.3 10.3 0 0116.04 0m-8.02 3.59a3 3 0 100-6 3 3 0 000 6zm0 0c-3.5 0-6 3-6 3s2.5 3 6 3 6-3 6-3-2.5-3-6-3z"
                    />
                  </svg>
                </button>
              </div>
            </td>
            <td class="py-4 px-4 min-w-[120px]">
              <p class="text-black dark:text-white">{{ dataProduct.count_trial }}</p>
            </td>
            <td class="py-4 px-4 min-w-[120px]">
              <p class="text-black dark:text-white">{{ dataProduct.call_api }}</p>
            </td>
            <td class="py-4 px-4 min-w-[120px]">
              <p class="text-black dark:text-white">{{ moment(dataProduct.createdAt).format("DD MMMM YYYY") }}</p>
            </td>
            <td class="py-4 px-4 min-w-[120px]">
              <p class="text-black dark:text-white">{{ dataProduct.status }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import moment from 'moment'

type Product = {
  id: string
  name: string
  csr_key: string
  password: string
  postman_pem: string
  slot_id: string
  status: boolean
  call_api: Number
  count_trial: Number
  createdAt: any
}

const props = defineProps<{
  dataProduct: Product | undefined
}>()

const isPasswordVisible = ref(false)
const maskedPassword = computed(() => {
  return props.dataProduct?.password ? '*'.repeat(props.dataProduct.password.length) : ''
})
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>