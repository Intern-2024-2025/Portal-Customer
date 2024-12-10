<script setup lang="ts">
import HeaderArea from '@/components/Header/HeaderArea.vue';
</script>

<template>
  <div class="h-screen flex flex-col">
    <HeaderArea />
    <main class="flex-grow flex items-center justify-center bg-gray-200 dark:border-strokedark dark:bg-boxdark">
      <div class="bg-white shadow-lg rounded-xl p-6 sm:p-12 max-w-6xl flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
        <div class="w-full sm:w-auto flex-shrink-0">
          <img
            src="../../assets/images/waiting/not-authorized-dark.svg"
            alt="Account Verification Illustration"
            class="w-full max-w-xs sm:max-w-lg mx-auto"
          />
        </div>
        <div class="text-center sm:text-left">
          <h1 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 sm:mb-6">
            Your Account Is Under Verification
          </h1>
          <p class="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-8">
            We are reviewing your information to ensure everything is in order. This may take a few moments.
          </p>
          <p class="text-xs sm:text-md text-gray-500 mb-4 sm:mb-8">
            You will receive an email once your account is verified. You can also check the status at any time.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

