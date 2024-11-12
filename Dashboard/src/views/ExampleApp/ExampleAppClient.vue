<script setup lang="ts">
import { ref } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

// const apiDocsUrl = ref(`http://localhost:5003/api-docs/${localStorage.getItem('token')}`);
const apiDocsUrl = ref(`https://backend.sandhiguna.com/api-docs/${localStorage.getItem('token')}`);
const isLoading = ref(true);
const handleLoad = () => {
  isLoading.value = false;
};
</script>

<template>
  <DefaultLayout>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div class="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
    </div>
    
    <iframe 
      v-show="!isLoading"
      :src="apiDocsUrl" 
      class="w-full h-screen border-none"
      @load="handleLoad">
    </iframe>
  </DefaultLayout>
</template>