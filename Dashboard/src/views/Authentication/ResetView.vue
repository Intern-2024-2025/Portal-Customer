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

const sendOtp = async () => {
  const response = await API.resetPassword(email.value);
  if(response.code == 200){
    step.value = 2
  }else{
    alert("gagal send email")
  }
}

const resetPassword = async () => {
  if (newPassword.value === confirmPassword.value) {
    const response = await API.newPassword(email.value, otp.value, newPassword.value );
    console.log(response)
    if(response.status != 0 && response.code == 200){
      router.push('/auth/signin') 
    }else{
      alert(response.message || "OTP Salah!")
    }
  } else {
    alert('Password tidak cocok')
    console.error('Password tidak cocok')
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
          <p>Chek Otp in your Email! {{ email }}</p> <br>
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
