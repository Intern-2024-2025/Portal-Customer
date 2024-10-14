<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'

const router = useRouter()  
const step = ref(1)  
const email = ref('')  
const otp = ref('') 
const newPassword = ref('')  
const confirmPassword = ref('')  

const sendOtp = () => {
  console.log('Mengirim OTP ke:', email.value)
  step.value = 2 // pindah ke langkah 2 setelah mengirim OTP
  console.log('Langkah saat ini:', step.value)
}

const resetPassword = () => {
  // Logika untuk mereset password
  if (newPassword.value === confirmPassword.value) {
    console.log('Reset password ke:', newPassword.value)
    // plus logika verifikasi OTP dan reset password  

    // Jika reset password berhasil
    router.push('/auth/signin') // Redirect ke halaman sign in setelah berhasil
  } else {
    console.error('Password tidak cocok')
    // Tambahkan logika untuk menampilkan pesan kesalahan jika perlu
  }
}
</script>

<template>
    <DefaultAuthCard title="Reset Password">
      <form @submit.prevent="step === 1 ? sendOtp() : resetPassword()">
        <template v-if="step === 1">
          <InputGroup label="Email" type="email" placeholder="Enter your email" v-model="email"></InputGroup>

          <div class="mb-5 mt-6">
            <button type="submit" class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
              Send OTP
            </button>
          </div>
        </template>

        <template v-else-if="step === 2">
          <InputGroup label="OTP" type="text" placeholder="Enter the OTP sent to your email" v-model="otp"></InputGroup>
          <InputGroup label="New Password" type="password" placeholder="Enter your new password" v-model="newPassword"></InputGroup>
          <InputGroup label="Confirm Password" type="password" placeholder="Confirm your new password" v-model="confirmPassword"></InputGroup>

          <div class="mb-5 mt-6">
            <button type="submit" class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
              Confirm New Password
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
