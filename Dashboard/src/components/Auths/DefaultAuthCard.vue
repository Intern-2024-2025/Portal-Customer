<script setup lang="ts">
const props = defineProps(['subtitle', 'title', 'customClasses'])
</script>

<template>
  <!-- ====== Forms Section Start -->
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-screen flex flex-col xl:flex-row"
  >
    <div class="w-full xl:w-1/2 flex justify-center items-center bg-gray-100 dark:bg-boxdark">
      <div class="py-20 px-6 sm:py-16 sm:px-10 xl:py-20 xl:px-26 text-center">
        <router-link class="mb-11 inline-block" to="/">
          <!-- <img class="hidden dark:block w-32 mx-auto" src="@/assets/images/logo/logo.svg" alt="Logo" />
          <img class="dark:hidden w-32 mx-auto" src="@/assets/images/logo/logo-dark.svg" alt="Logo" /> -->
        </router-link>

        <p class="font-medium text-sm sm:text-base xl:text-lg 2xl:px-20">
          Welcome To Athena!
        </p>
        <p class="font-medium text-sm sm:text-base xl:text-lg 2xl:px-20">
          Secure Today, Safe Tommorow
        </p>

        <span class="mt-20 inline-block">
          <img class="w-auto max-w-xs mx-auto" src="@/assets/images/join-community.svg" alt="illustration" />
        </span>
      </div>
    </div>

    <div class="w-full xl:w-1/2 xl:border-l-2 border-stroke dark:border-strokedark">
      <div class="w-full p-4 sm:p-10 xl:p-14">
        <span class="mb-2 block font-medium text-base sm:text-lg xl:text-xl">{{ props.subtitle }}</span>
        <h2 class="mb-8 text-xl sm:text-3xl font-bold text-black dark:text-white xl:text-4xl">
          {{ props.title }}
        </h2>
        <slot></slot>
      </div>
    </div>
  </div>
  <!-- ====== Forms Section End -->
</template>
