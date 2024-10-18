<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
  <DefaultLayout>
     <iframe 
      src="http://localhost:5003/api-docs" 
      style="width: 100%; height: 100vh; border: none;">
    </iframe>
  </DefaultLayout>
</template>
