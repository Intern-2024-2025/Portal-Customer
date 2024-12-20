<script setup lang="ts">
import { ref, defineEmits } from 'vue';

// Emit untuk mengirimkan perubahan filter dan pencarian
const emit = defineEmits(['updateFilters']);

// State untuk filter, pencarian, status, dan dropdown visibility
const selectedOption = ref(""); 
const searchQuery = ref("");
const showDropdown = ref(false); // Untuk menampilkan atau menyembunyikan dropdown
const selectedStatus = ref(""); // Status yang dipilih

// Handle perubahan filter
const handleFilterChange = () => {
  if (selectedOption.value === 'status') {
    showDropdown.value = true; // Menampilkan dropdown jika Status dipilih
  } else {
    showDropdown.value = false; // Menyembunyikan dropdown jika filter lain dipilih
  }

  // Emit perubahan filter dan pencarian
  emit('updateFilters', { filter: selectedOption.value, search: searchQuery.value, status: selectedStatus.value });
};

// Handle pencarian
const handleSearchChange = () => {
  emit('updateFilters', { filter: selectedOption.value, search: searchQuery.value, status: selectedStatus.value });
};

// Fungsi untuk toggle dropdown status
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Fungsi untuk memilih status
const selectStatus = (status: string) => {
  selectedStatus.value = status;
  showDropdown.value = false; // Menyembunyikan dropdown setelah memilih status
  handleSearchChange();
};
</script>

<template>
  <div class="flex justify-between mb-4">
    <!-- Filter Dropdown -->
    <div class="flex justify-center items-center">
      <div class="relative flex max-w-lg mx-auto rounded-lg text-sm">
        <label for="answer-sort-dropdown" class="sr-only">Sort By</label>
        <select
          id="answer-sort-dropdown"
          class="w-full min-w-lg bg-primary text-white rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          v-model="selectedOption"
          @change="handleFilterChange"
        >
          <option value="" disabled selected hidden>Filter</option>
          <option value="date" class="bg-gray-300 text-black">Date</option>
          <option value="status" class="bg-gray-300 text-black">Status</option>
        </select>

        <!-- Ikon panah -->
        <div class="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Dropdown Status -->
    <div v-if="selectedOption === 'status'" class="flex justify-center items-center mt-4">
      <ul class="w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
        <li>
          <button
            @click="toggleDropdown"
            class="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Status
            <svg class="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>

          <!-- Dropdown yang akan tampil setelah mengklik tombol -->
          <div v-show="showDropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a href="#" @click="selectStatus('Verified')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Verified</a>
              </li>
              <li>
                <a href="#" @click="selectStatus('Not Verified')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Not Verified</a>
              </li>
              <li>
                <a href="#" @click="selectStatus('Process')" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Process</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <!-- Search Bar -->
    <div class="flex justify-center items-center mt-4">
      <form class="max-w-md mx-auto" @submit.prevent="handleSearchChange">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            class="block w-72 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search" 
            v-model="searchQuery"
            @input="handleSearchChange"
            required 
          />
          <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-primary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
        </div>
      </form>
    </div>
  </div>
</template>
