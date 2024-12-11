<script setup lang="ts">
import FilterBar from './FilterBar.vue';
import SearchBar from './SearchBar.vue';
</script>

<template>
    <div class="flex justify-between mb-4">
        <div class="flex justify-center items-center">
            <FilterBar/>
        </div>
        <div class="flex justify-center items-center">
            <SearchBar/>
        </div>
    </div>
</template>