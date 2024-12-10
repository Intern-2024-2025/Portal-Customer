<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface DropdownProps {
  items: string[];       
  modelValue: string;    
  label: string;         
  visible: boolean;      
}


const props = defineProps<DropdownProps>();

const emit = defineEmits<{
  (e: 'toggle'): void;          
  (e: 'select', item: string): void;
}>();


const toggleDropdown = () => {
  emit('toggle');
};


const selectItem = (item: string) => {
  emit('select', item); 
};
</script>

<template>
  <div class="relative">
    <button @click="toggleDropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {{ modelValue }} 
      <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>


    <div v-show="visible" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-2 absolute">
      <ul class="py-2 text-sm text-gray-700 border border-gray-300 shadow dark:text-gray-200">
        <li v-for="item in items" :key="item">
          <a href="#" @click.prevent="selectItem(item)" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            {{ item }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
