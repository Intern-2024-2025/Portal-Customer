<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ClientAPI from '@/api/client';
import PaginationStuff from '@/components/Pagination/PaginationStuff.vue';
import SearchBar from '@/components/Search/SearchBar.vue';
import FilterBar from '@/components/Filter/FilterBar.vue';

const dataClient = ref<TypeClient[]>()
const pageTitle = ref('List Client');
const showModal = ref(false);

type ClientDetail = {
  fullname: string;
  phone: string;
  address: string;
  category_business: string;
  description_business: string;
};

type TypeClient = {
  id: number;
  username: string;
  email: string;
  otp: number;
  status_verification_data: boolean;
  createdAt: string;
  client_detail: ClientDetail;
};

const defaultClientDetail: ClientDetail = {
  fullname: '',
  phone: '',
  address: '',
  category_business: '',
  description_business: '',
};

const detailClient = ref<TypeClient>({
  id: 0,
  username: '',
  email: '',
  otp: 0,
  status_verification_data: false,
  createdAt: '',
  client_detail: defaultClientDetail,
});

const isEditMode = ref(false);
const isDetailMode = ref(false);

const openModal = async (id: number, mode: 'edit' | 'detail' = 'edit') => {
  if (id) {
    const response = await ClientAPI.getClientDetail(id);
    detailClient.value = {
      ...response.data,
      client_detail: response.data.client_detail || defaultClientDetail,
    };
    isEditMode.value = mode === 'edit';
    isDetailMode.value = mode === 'detail';
  }
  showModal.value = true;
};

const getListClient = async () => {
  try {
    const response = await ClientAPI.getClient();
    dataClient.value = response.data;
  } catch (error) {
    console.error('Failed to get client:', error);
  }
};


onMounted(() => {
  getListClient()
})
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />

    <div class = "flex justify-between "> 
      <div>
        <FilterBar/>
      </div>
      <div>
        <SearchBar/>
      </div>
     
    </div>
    <!-- Table -->
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
            <tr v-if="!dataClient?.length">
              <td colspan="8" class="py-10 text-center text-gray-500 bg-white dark:text-white dark:bg-boxdark">No Client Data Available</td>
            </tr>
            <tr v-else v-for="(item, index) in dataClient" :key="item.id">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ index+1 }}</h5>
              </td>
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ item.username }}</h5>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.email }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.otp }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.status_verification_data }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.createdAt }}</p>
              </td>
              <td class="py-5 px-4">
                <div class="flex items-center space-x-3.5">
                  <!-- Edit Icon -->
                  <button @click="openModal(item.id, 'edit')" class="hover:text-primary" aria-label="Edit Client">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75l11.35-11.35-3.75-3.75L3 17.25zM20.71 5.63a1 1 0 0 0 0-1.42l-2.59-2.59a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>

                  <!-- Detail Icon -->
                  <button @click="openModal(item.id, 'detail')" class="hover:text-primary" aria-label="View Client Details">
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
        <div class="flex items-center justify-center" v-if="dataClient?.length">
          <PaginationStuff/>
        </div>
      </div>
    </div>
    

    <!-- Modal for Adding/Editing/Detailing Client -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">{{ isEditMode ? 'Edit Client' : 'Client Details' }}</h2>

        <!-- <form v-if="isEditMode" @submit.prevent="saveClient"> -->
        <form v-if="isEditMode" @submit.prevent="">
          <div class="mb-4">
            <label for="fullname" class="block text-sm font-medium text-gray-700">Fullname</label>
            <input v-model="detailClient.client_detail.fullname" type="text" id="fullname" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Fullname" required />
          </div>

          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="detailClient.client_detail.phone" type="text" id="phone" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Phone Number" required />
          </div>

          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input v-model="detailClient.client_detail.address" type="text" id="address" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Address" required />
          </div>

          <div class="mb-4">
            <label for="category_business" class="block text-sm font-medium text-gray-700">Category Business</label>
            <input v-model="detailClient.client_detail.category_business" type="text" id="category_business" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Category" required />
          </div>

          <div class="mb-4">
            <label for="description_business" class="block text-sm font-medium text-gray-700">Description Business</label>
            <textarea v-model="detailClient.client_detail.description_business" id="description_business" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Description" required></textarea>
          </div>

          <div class="flex justify-end">
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Confirm</button>
          </div>
        </form>

        <div v-else>
          <p><strong>ID:</strong> {{ detailClient.id || 'no submisson' }}</p>
          <p><strong>username:</strong> {{ detailClient.username || 'no submisson'}}</p>
          <p><strong>Email:</strong> {{ detailClient.email || 'no submisson'}}</p>
          <p><strong>OTP:</strong> {{ detailClient.otp || 'no submisson'}}</p>
          <p><strong>Status Verification:</strong> {{ detailClient.status_verification_data }}</p>
          <p><strong>Fullname:</strong> {{ detailClient.client_detail.fullname || 'no submisson'}}</p>
          <p><strong>Phone:</strong> {{ detailClient.client_detail.phone || 'no submisson'}}</p>
          <p><strong>Address:</strong> {{ detailClient.client_detail.address || 'no submisson'}}</p>
          <p><strong>Category Business:</strong> {{ detailClient.client_detail.category_business || 'no submisson'}}</p>
          <p><strong>Description Business:</strong> {{ detailClient.client_detail.description_business || 'no submisson'}}</p>
          <div class="flex justify-end">
            <button @click="showModal = false" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Close</button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
