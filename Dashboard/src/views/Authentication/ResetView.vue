<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import API from '@/api/auth';

const router = useRouter()
const step = ref(1)
const email = ref('')
const otp = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const resendCooldown = ref(0);
let cooldownTimer: ReturnType<typeof setInterval>;

const startCooldown = () => {
  resendCooldown.value = 30;
  cooldownTimer = setInterval(() => {
    resendCooldown.value--;
    if (resendCooldown.value <= 0) {
      clearInterval(cooldownTimer);
    }
  }, 1000);
};

const sendOtp = async () => {
  const response = await API.resetPassword(email.value);
  if(response.code == 200){
    step.value = 2;
    message.value = "";
    startCooldown();
  } else {
    message.value = "Failed to send OTP. Please check your email and try again.";
  }
}

const resendOtp = async () => {
  if (resendCooldown.value > 0) return;
  await sendOtp();
}

const resetPassword = async () => {
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword.value)){
    message.value = "The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase, one number, and one special character.";
    return;
  }
  if (newPassword.value === confirmPassword.value) {
    const response = await API.newPassword(email.value, otp.value, newPassword.value);
    console.log(response)

    if(response.status != 0 && response.code == 200){
      router.push('/auth/signin');
    } else {
      message.value = "Incorrect OTP. Please try again.";
      console.error(response.message || "OTP verification failed.");
    }
  } else {
    message.value = 'Password do not Match!';
    console.error('Password not Match!');
  }
}
</script>

<template>
  <DefaultAuthCard title="Reset Password">
    <form @submit.prevent="step === 1 ? sendOtp() : resetPassword()">
      <template v-if="step === 1">
        <InputGroup label="Email" type="email" placeholder="Enter your email" v-model="email"></InputGroup>

        <p v-if="message" class="text-danger">{{ message }}</p>

        <div class="mb-5 mt-6">
          <button type="submit" class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
            Send OTP
          </button>
        </div>
      </template>

      <template v-else-if="step === 2">
        <p>We Have Sent the OTP to {{ email }}</p> <br>
        <InputGroup label="OTP" type="text" placeholder="Enter the OTP sent to your email" v-model="otp"></InputGroup>
        <InputGroup label="New Password" type="password" placeholder="Enter your new password" v-model="newPassword"></InputGroup>
        <InputGroup label="Confirm Password" type="password" placeholder="Confirm your new password" v-model="confirmPassword"></InputGroup>

        <p v-if="message" class="text-danger">{{ message }}</p>

        <div class="mb-5 mt-6">
          <button type="submit" class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
            Confirm New Password
          </button>
        </div>

        <div class="text-center mt-4">
          <button @click.prevent="resendOtp" :disabled="resendCooldown > 0" 
            class="text-primary font-medium" >
            Resend OTP <span v-if="resendCooldown > 0">({{ resendCooldown }}s)</span>
          </button>
        </div>
      </template>

      <div class="mt-6 text-center">
        <p class="font-medium">
          Remembered your password?
          <router-link to="/auth/signin" class="text-primary">Sign In</router-link>
        </p>
      </div>
    </form>
  </DefaultAuthCard>
</template>
