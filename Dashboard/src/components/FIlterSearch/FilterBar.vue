<template>
  <div class="relative flex max-w-lg mx-auto rounded-lg text-sm">
    <label for="answer-sort-dropdown" class="sr-only">Sort By</label>
    <select
      id="answer-sort-dropdown"
      class="w-full min-w-lg bg-primary text-white rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
      v-model="selectedOption"
    >
      <option value="" disabled selected hidden>Filter</option>
      <option value="no" class="bg-gray-300 text-black">Date</option>
      <option value="username" class="bg-gray-300 text-black">Status</option>
    </select>

    <!-- Ikon panah -->
    <div class="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-white">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";

const selectedOption = ref(""); 
</script>
