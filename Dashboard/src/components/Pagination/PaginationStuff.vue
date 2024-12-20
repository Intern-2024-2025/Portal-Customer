<script setup lang="ts">
import { type PropType, computed } from 'vue';

// Props dari Parent
const props = defineProps({
  pagination: {
    type: Object as PropType<{
      currentPages: number;
      totalPages: number;
    }>,
    required: true,
  },
  getData: {
    type: Function as PropType<(page: number) => Promise<void>>,
    required: true,
  },
});

// Komputasi untuk menampilkan halaman yang terlihat
const visiblePages = computed(() => {
  const { currentPages, totalPages } = props.pagination;  
  const start = Math.max(1, currentPages - 2);
  const end = Math.min(totalPages, currentPages + 2);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

</script>

<template>
  <div class="flex items-center justify-center" v-if="pagination.totalPages > 1">
    <nav aria-label="Page navigation example">
      <ul class="flex items-center justify-center p-12 h-8 leading-relaxed text-sm">
        <li>
          <button
            :disabled="pagination.currentPages === 1"
            @click="getData(pagination.currentPages - 1)"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="sr-only">Previous</span>
            <svg class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>

        <li v-for="page in visiblePages" :key="page">
          <button
            :class="{
              'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === pagination.currentPages,
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== pagination.currentPages
            }"
            @click="getData(page)"
            class="flex items-center justify-center px-3 h-8 leading-tight"
          >
            {{ page }}
          </button>
        </li>

        <li>
          <button
            :disabled="pagination.currentPages === pagination.totalPages"
            @click="getData(pagination.currentPages + 1)"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span class="sr-only">Next</span>
            <svg class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
