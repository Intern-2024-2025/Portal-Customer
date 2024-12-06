<template>
  <div class="flex max-w-lg mx-auto rounded-lg text-sm">
    <label for="answer-sort-dropdown" class="sr-only">Sort By</label>
    <select
      id="answer-sort-dropdown"
      class="w-full min-w-lg bg-primary text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-model="selectedOption"
    >
      <option value="" disabled selected hidden>Filter</option>
      <option value="no" class="bg-gray-300 text-black">Date</option>
      <option value="username" class="bg-gray-300 text-black">Status</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedOption = ref(""); 
</script>
