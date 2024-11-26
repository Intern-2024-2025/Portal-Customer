<script>
export default {
  name: "NotFound",
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <main class="flex-grow flex items-center justify-center bg-gray-200 dark:border-strokedark dark:bg-boxdark">
      <div class="flex flex-col sm:flex-row items-center sm:justify-between max-w-6xl px-8 sm:px-12 sm:space-x-10 space-y-10 sm:space-y-0">
        <div class="w-full sm:w-1/2">
          <img
            src="../../assets/images/notfound/error-v2 (1).svg"
            alt="Account Verification Illustration"
            class="w-full max-w-lg sm:max-w-2xl mx-auto"
          />
        </div>
        <!-- Teks -->
        <div class="text-center sm:text-left sm:w-1/2">
          <h2 class="mb-6 font-extrabold text-6xl sm:text-8xl dark:text-gray-600">
            <span class="sr-only">Error</span>404
          </h2>
          <p class="text-xl sm:text-3xl font-semibold text-gray-600 dark:text-gray-600">
            Sorry, we couldn't find this page.
          </p>
          <p class="mt-4 mb-6 text-base sm:text-lg text-gray-600 dark:text-gray-600">
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            class="py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

