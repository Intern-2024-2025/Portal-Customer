<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Mendefinisikan props yang diterima oleh komponen
const props = defineProps({
  modelValue: {  // ganti `label` dengan `modelValue`
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  }
});

// Mendefinisikan event yang akan dipancarkan ke parent saat nilai input berubah
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// Method untuk menangani perubahan input
const handleInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);  // Mengirim nilai baru ke parent
};
</script>

<template>
  <div class="flex flex-col text-gray-700 dark:text-gray-300 mb-2">
    <p class="text-xs">{{ label }}</p>
    <input 
      type="text" 
      class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      :placeholder="placeholder" 
      :value="props.modelValue"  
      @input="handleInputChange"   
    />
  </div>
</template>
