<script setup lang="ts">
import { ref } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

type typeClient = {
  id: number; // Menambahkan id untuk setiap client
  fullname: string;
  phone: string;
  address: string;
  category_business: string;
  description_business: string;
};

const Client = ref<typeClient[]>([
  { id: 1, fullname: 'Free Package', phone: '12', address: 'alamat', category_business: 'Paid', description_business: 'asd' },
  { id: 2, fullname: 'Standard Package', phone: '123', address: 'alamat', category_business: 'Pending', description_business: 'asd' }
]);

const pageTitle = ref('List Client');

// For Modal form states
const showModal = ref(false);
const newClient = ref<typeClient>({
  id: 0,
  fullname: '',
  phone: '',
  address: '',
  category_business: '',
  description_business: ''
});

const isEditMode = ref(false);
const isDetailMode = ref(false);

// Function to open the modal for adding or editing client
const openModal = (client?: typeClient, mode: 'edit' | 'detail' = 'edit') => {
  if (client) {
    newClient.value = { ...client };
    isEditMode.value = mode === 'edit';
    isDetailMode.value = mode === 'detail';
  } else {
    newClient.value = {
      id: 0,
      fullname: '',
      phone: '',
      address: '',
      category_business: '',
      description_business: ''
    };
    isEditMode.value = false;
    isDetailMode.value = false;
  }
  showModal.value = true;
};

// Function to save client data (add/edit)
const saveClient = () => {
  if (newClient.value.fullname && newClient.value.phone) {
    if (isEditMode.value) {
      const index = Client.value.findIndex(client => client.id === newClient.value.id);
      if (index !== -1) {
        Client.value[index] = { ...newClient.value };
      }
    } else {
      newClient.value.id = Client.value.length + 1; // Simple ID generation
      Client.value.push({ ...newClient.value });
    }

    newClient.value = {
      id: 0,
      fullname: '',
      phone: '',
      address: '',
      category_business: '',
      description_business: ''
    };
    // Close modal
    showModal.value = false;
  } else {
    alert('Please fill out all required fields.');
  }
};
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />

    <!-- Table -->
    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Fullname</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Phone</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Address</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Category Business</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Description Business</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in Client" :key="item.id">
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ item.fullname }}</h5>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.phone }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.address }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.category_business }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.description_business }}</p>
              </td>
              <td class="py-5 px-4">
                <div class="flex items-center space-x-3.5">
                  <!-- Edit Icon -->
                  <button @click="openModal(item, 'edit')" class="hover:text-primary" aria-label="Edit Client">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75l11.35-11.35-3.75-3.75L3 17.25zM20.71 5.63a1 1 0 0 0 0-1.42l-2.59-2.59a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>

                  <!-- Detail Icon -->
                  <button @click="openModal(item, 'detail')" class="hover:text-primary" aria-label="View Client Details">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Adding/Editing/Detailing Client -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-semibold mb-4">{{ isEditMode ? 'Edit Client' : 'Client Details' }}</h2>

        <form v-if="isEditMode" @submit.prevent="saveClient">
          <div class="mb-4">
            <label for="fullname" class="block text-sm font-medium text-gray-700">Fullname</label>
            <input v-model="newClient.fullname" type="text" id="fullname" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Fullname" required />
          </div>

          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
            <input v-model="newClient.phone" type="text" id="phone" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Phone Number" required />
          </div>

          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <input v-model="newClient.address" type="text" id="address" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Address" required />
          </div>

          <div class="mb-4">
            <label for="category_business" class="block text-sm font-medium text-gray-700">Category Business</label>
            <input v-model="newClient.category_business" type="text" id="category_business" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Category" required />
          </div>

          <div class="mb-4">
            <label for="description_business" class="block text-sm font-medium text-gray-700">Description Business</label>
            <textarea v-model="newClient.description_business" id="description_business" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Description" required></textarea>
          </div>

          <div class="flex justify-end">
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Confirm</button>
          </div>
        </form>

        <div v-else>
          <p><strong>Fullname:</strong> {{ newClient.fullname }}</p>
          <p><strong>Phone:</strong> {{ newClient.phone }}</p>
          <p><strong>Address:</strong> {{ newClient.address }}</p>
          <p><strong>Category Business:</strong> {{ newClient.category_business }}</p>
          <p><strong>Description Business:</strong> {{ newClient.description_business }}</p>
          <div class="flex justify-end">
            <button @click="showModal = false" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Close</button>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
