<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import router from '@/router/index';
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue';
import InputGroup from '@/components/Auths/InputGroup.vue';
import API from '@/api/auth';

const username = ref('');
const password = ref('');
const message = ref('');
// const loginAttempts = ref(0);
// const isLocked = ref(false);
// const lockUntil = ref<number | null>(null);
// const remainingTime = ref(0);
// let timer: ReturnType<typeof setInterval>;

// onMounted(() => {
//   const savedLockUntil = localStorage.getItem('lockUntil');
//   if (savedLockUntil) {
//     const lockTime = parseInt(savedLockUntil, 10);
//     if (lockTime > Date.now()) {
//       isLocked.value = true;
//       lockUntil.value = lockTime;
//       updateCountdown();
//     } else {
//       localStorage.removeItem('lockUntil');
//     }
//   }
// });

// const updateCountdown = () => {
//   if (timer) clearInterval(timer);
//   timer = setInterval(() => {
//     const now = Date.now();
//     if (lockUntil.value && lockUntil.value > now) {
//       remainingTime.value = Math.ceil((lockUntil.value - now) / 1000);
//     } else {
//       clearInterval(timer);
//       isLocked.value = false;
//       localStorage.removeItem('lockUntil');
//     }
//   }, 1000);
// };

// const formattedTime = computed(() => `${remainingTime.value} seconds`);

const loginUser = async () => {
  message.value = "";

  // if (isLocked.value) {
  //   message.value = `Please wait ${formattedTime.value} before trying again.`;
  //   return;
  // }

  if (!username.value || !password.value) {
    message.value = 'Please input your Username and Password';
    return;
  }

  try {
    const response = await API.login(username.value, password.value);
    // console.log(response)
    if (response.code === 400) {
    message.value = response.message;
    return;
    // } else if (response.code === 400) {
    //   message.value = "Account not found. Please check your username or email.";
    //   return;
    }
    // if (response.lockUntil) {
    //   isLocked.value = true;
    //   lockUntil.value = response.lockUntil;
    //   localStorage.setItem('lockUntil', response.lockUntil.toString());
    //   updateCountdown();
    //   message.value = response.message
    //   return;
    // }

    if (response.accessToken) {
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('role', response.role);
      
      const fetchData = await API.fetch(response.accessToken);
      localStorage.setItem('username', fetchData.data.username);
      localStorage.setItem('verificationData', fetchData.data.verificationData);
      
      router.push(response.role === 'client' ? '/product' : '/');
      setTimeout(() => window.location.reload(), 100);
    }
  } catch (error: any) {
    console.error(error);
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 400:
    //       message.value = "Invalid username, email, or password.";
    //       break;
    //     case 429:
    //       isLocked.value = true;
    //       lockUntil.value = error.response.data.lockUntil;
    //       localStorage.setItem('lockUntil', lockUntil.value.toString());
    //       updateCountdown();
    //       message.value = error.response.data.message;
    //       break;
    //     default:
    //       message.value = "An error occurred. Please try again later.";
    //   }
    // } else {
    //   message.value = "Network error. Please check your connection.";
    // }
  }
};
</script>

<template>
  <DefaultAuthCard title="Sign In to Athena">
    <form @submit.prevent="loginUser">
      <InputGroup required v-model="username" label="Email or Username" type="text" placeholder="Enter Your Username" />
      <InputGroup required v-model="password" label="Password" type="password" placeholder="Enter Your Password" />

      <p v-if="message" class="text-danger">{{ message }}</p>
      <!-- <p v-if="isLocked" class="text-warning">*Please wait {{ formattedTime }} before trying again.</p> -->
      
      <div class="mb-5 mt-6">
        <button 
          type="submit" 
          class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
          Sign In
        </button>
      </div>
      <!-- :disabled="isLocked"  -->

      <div class="mb-5 mt-6">
        <router-link to="/auth/signup">
          <button 
            type="button" 
            class="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 font-medium hover:bg-opacity-70 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-70">
            Sign Up
          </button>
        </router-link>
      </div>

      <div class="mt-6 text-center">
        <p class="font-medium">
          Forget Your Password?
          <router-link to="/auth/reset-pass" class="text-primary">Reset Password</router-link>
        </p>
      </div>
    </form>
  </DefaultAuthCard>
</template>