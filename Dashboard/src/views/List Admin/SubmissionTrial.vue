<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ClientAPI from '@/api/client';
import ProductAPI from '@/api/product';
import FilterBar from '@/components/FIlterSearch/FilterBar.vue';
import FilterSearch from '@/components/FIlterSearch/FilteSearch.vue';
import PaginationStuff from '@/components/Pagination/PaginationStuff.vue';
import SearchBar from '@/components/FIlterSearch/SearchBar.vue';

const pageTitle = ref('Submission Trial');

const closeModal = () => {
  showModal.value = false;
};

type ClientDetail = {
  id: number;
  username: string;
  email: string;
  otp: number;
  status_verification_data: boolean;
  createdAt: string;
}

type TypeClient = {
  id: number;
  fullname: string;
  phone: string;
  address: string;
  category_business: string;
  description_business: string;
  client: ClientDetail;
};

const pagination = ref({
  currentPages: 1,
  totalPages: 1,
});
const filters = ref({
  filter: '',
  search: '',
});


const createProduct = ref({
  name: '',
  csrKey: '',
  postmanPem: '',
  slotId: 0,
  password: '',
  financeKey: '',
  countTrial: '',
  status: false,
  clientId: 0,
})
const dataSubmisson = ref<TypeClient[]>([])

const isEditMode = ref(false);
const isDetailMode = ref(false);
const showModal = ref(false);

const detailClientByID = ref<TypeClient>();

const openModal = async (id: number, mode: 'add' | 'detail' = 'add') => {
  if(mode != 'add'){
    detailClientByID.value = dataSubmisson.value[id];
  }else{
    createProduct.value.clientId = id
  }
  isEditMode.value = mode === 'add';
  isDetailMode.value = mode === 'detail';
  showModal.value = true;
};

const getListClient = async (
  currentPage: number = 1,
  status: string = "process",
  search: string = "",
) => {
  try {
    const response = await ClientAPI.getSubmisson(currentPage, status, search);
    dataSubmisson.value = response.data.data;
    pagination.value = response.data.pagination
    // console.log(dataSubmisson)
  } catch (error) {
    console.error('Failed to get client:', error);
  }
};

const addProduct = async () => {
  try {
    const response = await ProductAPI.createProductAdmin(createProduct.value);
    // dataSubmisson.value = response.data;
    showModal.value = false;
    getListClient()
    console.log(response, "response create product")
  } catch (error) {
    console.error('Failed to add product:', error);
  }
};


const handleUpdateFilters = (newFilters: { filter: string, search: string }) => {
  filters.value = newFilters;
  getListClient(1, newFilters.filter, newFilters.search); // Panggil data untuk halaman pertama
};

onMounted(() => {
  getListClient()
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <SearchBar @updateFilters="handleUpdateFilters" />
    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">No</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Username</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Otp</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status Verification</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Created</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!dataSubmisson?.length">
              <td colspan="8" class="py-10 text-center text-gray-500 bg-white dark:text-white dark:bg-boxdark">No Submission Data Available</td>
            </tr>
            <tr v-else v-for="(item, index) in dataSubmisson" :key="index">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ index+1 }}</h5>
              </td>
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ item.client.username }}</h5>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.client.email }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.client.otp }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.client.status_verification_data }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ new Date(item.client.createdAt).toLocaleString() }}</p>
              </td>
              <td class="py-5 px-4">
                <div class="flex items-center space-x-3.5">
                  <button @click="openModal(item.client.id, 'add')" class="hover:text-primary" aria-label="Add Product">
                    ➕
                  </button>

                  <button @click="openModal(index, 'detail')" class="hover:text-primary" aria-label="View Client Details">
                    <svg
                    class="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                      fill=""
                    />
                    <path
                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                      fill=""
                    />
                  </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <PaginationStuff
          v-if="pagination && getListClient"
          :pagination="pagination"
          :get-data="getListClient"
        />
      </div>
    </div>

    <!-- Modal for Adding Client -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" @click="closeModal">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform translate-x-20" @click.stop>
        <h2 class="text-xl font-semibold mb-4">{{ isEditMode ? 'Add Product' : 'Client Details'   }}</h2>

        <!-- <form @submit.prevent="addClient"> -->
        <form v-if="isEditMode" @submit.prevent="addProduct">
          <div class="mb-4">
            <label for="fullname" class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="createProduct.name" type="text" id="fullname" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Fullname" required />
          </div>
          <div class="mb-4">
            <label for="category_business" class="block text-sm font-medium text-gray-700">Slot Id</label>
            <input v-model="createProduct.slotId" type="text" id="category_business" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Category" required />
          </div>
          <div class="mb-4">
            <label for="category_business" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="createProduct.password" type="text" id="category_business" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Category" required />
          </div>
          <div class="mb-4">
            <label for="category_business" class="block text-sm font-medium text-gray-700">Finance Key</label>
            <input v-model="createProduct.financeKey" type="text" id="category_business" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Category" required />
          </div>
          <div class="mb-4">
            <label for="category_business" class="block text-sm font-medium text-gray-700">Count Trial</label>
            <input v-model="createProduct.countTrial" type="text" id="category_business" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Category" required />
          </div>
          <div class="mb-4">
            <label for="description_business" class="block text-sm font-medium text-gray-700">Csr.key</label>
            <textarea v-model="createProduct.csrKey" id="description_business" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Description" required></textarea>
          </div>
          <div class="mb-4">
            <label for="description_business" class="block text-sm font-medium text-gray-700">Postman Pem</label>
            <textarea v-model="createProduct.postmanPem" id="description_business" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Description" required></textarea>
          </div>

          <div class="flex justify-between">
            <button type="button" @click="showModal = false" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">Close</button>
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Confirm</button>
          </div>
        </form>

        <div v-else>
          <p><strong>ID:</strong> {{ detailClientByID?.client.id || 'no submisson' }}</p>
          <p><strong>username:</strong> {{ detailClientByID?.client.username || 'no submisson'}}</p>
          <p><strong>Email:</strong> {{ detailClientByID?.client.email || 'no submisson'}}</p>
          <p><strong>OTP:</strong> {{ detailClientByID?.client.otp || 'no submisson'}}</p>
          <p><strong>Status Verification:</strong> {{ detailClientByID?.client.status_verification_data }}</p>
          <p><strong>Fullname:</strong> {{ detailClientByID?.fullname || 'no submisson'}}</p>
          <p><strong>Phone:</strong> {{ detailClientByID?.phone || 'no submisson'}}</p>
          <p><strong>Address:</strong> {{ detailClientByID?.address || 'no submisson'}}</p>
          <p><strong>Category Business:</strong> {{ detailClientByID?.category_business || 'no submisson'}}</p>
          <p><strong>Description Business:</strong> {{ detailClientByID?.description_business || 'no submisson'}}</p>
          <div class="flex justify-end">
            <button @click="showModal = false" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Close</button>
          </div>
        </div>

      </div>
    </div>
  </DefaultLayout>
</template>
