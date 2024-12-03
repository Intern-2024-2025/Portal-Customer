<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import InputField from '@/components/Forms/Sgkms/InputField.vue';
import Dropdown from '@/components/Forms/Sgkms/DropDown.vue';
import axiosInstance from '@/api/axiosInstance';

// Data dan status
const pageTitle = ref('SGKMS API');
const selectedVersion = ref('V1.0');
const dropdownVisible = ref(false);
const versions = ref(['V1.0']);
const selectedEndpoint = ref('');
const endpoints = ref(['/agent/login/', '/agent/register/', 'Endpoint 3']);  // Tambahkan semua endpoint di sini

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Select a version from dropdown
const selectVersion = (version: string) => {
  selectedVersion.value = version;
  dropdownVisible.value = false;
};

// Data untuk masing-masing endpoint dalam struktur yang lebih terorganisir
const endpointData = {
  '/agent/login/': {
    fields: [
      { name: 'slotId', label: 'Slot Id', placeholder: 'Insert your Slot Id ...' },
      { name: 'password', label: 'Password', placeholder: 'Insert your Password ...' },
    ],
    data: { slotId: '', password: '' },
    url: `/${selectedVersion.value}/agent/login`,  // Endpoint relatif
  },
  '/auth/register/': {
    fields: [
      { name: 'nama', label: 'Nama', placeholder: 'Insert your Nama ...' },
      { name: 'alamat', label: 'Alamat', placeholder: 'Insert your Alamat ...' },
      { name: 'username', label: 'Username', placeholder: 'Insert your Username ...' },
      { name: 'phone', label: 'Phone', placeholder: 'Insert your Phone ...' },
    ],
    data: { nama: '', alamat: '', username: '', phone: '' },
  },
  // Tambahkan endpoint lainnya di sini sesuai dengan struktur yang sama
};

// Form data reaktif
const formData = reactive(endpointData[selectedEndpoint.value]?.data || {});

// Watcher untuk mengubah form sesuai dengan endpoint yang dipilih
watch(selectedEndpoint, (newEndpoint) => {
  if (newEndpoint && endpointData[newEndpoint]) {
    // Update formData berdasarkan endpoint yang dipilih
    Object.assign(formData, endpointData[newEndpoint].data);
  }
});

// Response state
const responseMessage = ref('');
const sendRequest = async () => {
  const endpoint = endpointData[selectedEndpoint.value];

  if (!endpoint) {
    responseMessage.value = 'Invalid endpoint selected';
    return;
  }

  try {
    const response = await axiosInstance.post(`${endpoint.url}?token=${localStorage.getItem("token")}`, formData)
    console.log(response.data)
    responseMessage.value = `Success: ${response.data.message || 'Request berhasil'}`;
  } catch (error: any) {
    responseMessage.value = `Error: ${error.response?.data?.message || error.message || 'Terjadi kesalahan'}`;
  }
};
</script>

<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
  
    <div class="rounded-sm border border-stroke bg-white px-5 p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <!-- Version Dropdown Section -->
      <div class="flex justify-between">
        <Dropdown 
          :items="versions" 
          v-model="selectedVersion" 
          label="Version" 
          :visible="dropdownVisible"
          @toggle="toggleDropdown"
          @select="selectVersion"
        />
        
        <!-- Send Request Button -->
        <div>
          <button 
            @click="sendRequest"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Send Request
          </button>
        </div>
      </div>

      <!-- Endpoint Selection -->
      <div class="flex flex-col mt-6">
        <p class="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Select Endpoint SGKMS API</p>
        <select v-model="selectedEndpoint" class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option disabled value="">Select Endpoint ...</option>
          <option v-for="endpoint in endpoints" :key="endpoint" :value="endpoint">{{ endpoint }}</option>
        </select>
      </div>

      <!-- Request Section -->
      <div class="flex flex-col mt-6">
        <p class="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Request</p>
    
        <!-- Form Dinamis Berdasarkan Endpoint yang Dipilih -->
        <div v-if="selectedEndpoint">
          <div v-for="field in endpointData[selectedEndpoint]?.fields" :key="field.name">
            <InputField v-model="formData[field.name]" :label="field.label" :placeholder="field.placeholder" />
          </div>
        </div>
      </div>
    </div>
  
    <!-- Response Section -->
    <div class="rounded-sm border mt-4 border-stroke bg-white px-5 p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <p class="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">Response</p>
    </div>
  </DefaultLayout>
</template>
