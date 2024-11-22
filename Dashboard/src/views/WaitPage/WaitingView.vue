<script setup lang="ts">
import HeaderArea from '@/components/Header/HeaderArea.vue';
</script>

<template>
  <div class="bg-gray-200 min-h-screen flex flex-col dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
  <HeaderArea/>

    <!-- Main Content -->
    <div class="flex-grow flex items-center justify-center">
      <div class="bg-white shadow-lg rounded-xl p-12 max-w-6xl flex items-center space-x-8">
        <!-- Illustration -->
        <div class="flex-shrink-0">
          <img
            src="../../assets/images/waiting/not-authorized-dark.svg"
            alt="Account Verification Illustration"
            class="w-full max-w-lg"
          />
        </div>

        <!-- Text and Button -->
        <div>
          <h1 class="text-5xl font-extrabold text-gray-800 mb-6">
            Your Account Is Under Verification
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            We are reviewing your information to ensure everything is in order. This may take a few moments.
          </p>
          <p class="text-md text-gray-500 mb-8">
            You will receive an email once your account is verified. You can also check the status at any time.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
