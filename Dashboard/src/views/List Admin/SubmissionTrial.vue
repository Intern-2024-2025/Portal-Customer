<script setup lang="ts">
import { ref } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

type typeClient = {
  fullname: string;
  phone: string;
  address: string;
  category_business: string;
  description_business: string;
};

const Client = ref<typeClient[]>([
  { fullname: 'Free Package', phone: '12', address: 'alamat', category_business: 'Paid', description_business: 'asd' },
  { fullname: 'Standard Package', phone: '123', address: 'alamat', category_business: 'Pending', description_business: 'asd' }
]);

const pageTitle = ref('Submission Trial');

// For Modal form states
const showModal = ref(false);
const newClient = ref<typeClient>({
  fullname: '',
  phone: '',
  address: '',
  category_business: '',
  description_business: ''
});

// Function to add client
const addClient = () => {
  if (newClient.value.fullname && newClient.value.phone) {
    Client.value.push({ ...newClient.value });

    // Reset form values after submission
    newClient.value = {
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

// Function to close the modal
const closeModal = () => {
  // Reset the form data
  newClient.value = {
    fullname: '',
    phone: '',
    address: '',
    category_business: '',
    description_business: ''
  };
  showModal.value = false;
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
            <tr v-for="(item, index) in Client" :key="index">
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
                <!-- Actions: Eye, Delete, Download Icons -->
                <div class="flex items-center space-x-3.5">
                  <!-- Eye Icon -->
                  <button class="hover:text-primary">
                    <!-- Add SVG for View Icon -->
                  </button>

                  <!-- Delete Icon -->
                  <button class="hover:text-primary">
                    <!-- Add SVG for Delete Icon -->
                  </button>

                  <!-- Download Icon -->
                  <button class="hover:text-primary">
                    <!-- Add SVG for Download Icon -->
                  </button>

                  <!-- Add Client Icon -->
                  <button @click="showModal = true" class="hover:text-primary">
                    ➕
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Adding Client -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" @click="closeModal">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform translate-x-20" @click.stop>
        <h2 class="text-xl font-semibold mb-4">Add New Client</h2>

        <!-- Form -->
        <form @submit.prevent="addClient">
          <div class="mb-4">
            <label for="fullname" class="block text-sm font-medium text-gray-700">CSR.Key</label>
            <input v-model="newClient.fullname" type="text" id="fullname" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Fullname" required />
          </div>

          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Postman.pem</label>
            <input v-model="newClient.phone" type="text" id="phone" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Phone Number" required />
          </div>

          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700">Slotd</label>
            <input v-model="newClient.address" type="text" id="address" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Address" required />
          </div>

          <div class="mb-4">
            <label for="category_business" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="newClient.category_business" type="text" id="category_business" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Category" required />
          </div>

          <div class="mb-4">
            <label for="description_business" class="block text-sm font-medium text-gray-700">Keyld</label>
            <textarea v-model="newClient.description_business" id="description_business" rows="3" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter Business Description" required></textarea>
          </div>

          <div class="flex justify-between">
            <button type="button" @click="closeModal" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">Close</button>
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>
