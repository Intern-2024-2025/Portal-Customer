<script setup lang="ts">
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'

// const router = useRouter()  
const step = ref<number>(1)  
const email = ref<string>('')  
const otp = ref<string>('') 
const errorMessage = ref<string>('')


// Fungsi untuk mengirim OTP
const sendOtp = (): void => {
  console.log('Email entered:', email.value)  
  errorMessage.value = ''
  console.log('Mengirim OTP ke:', email.value)   
  step.value = 2
}

// Fungsi untuk menangani submit
const handleSubmit = (): void => {
  if (step.value === 1) {
    sendOtp()
  } else if (step.value === 2) {
    if (otp.value === '') {
      errorMessage.value = 'Please enter the OTP'
      return
    }
    errorMessage.value = ''  
    console.log('Memverifikasi OTP:', otp.value)
  }
}
</script>

<template>
    <DefaultAuthCard title="Verification Email">
      <form @submit.prevent="handleSubmit">
        <p v-if="errorMessage" class="text-a-500 ">{{ errorMessage }}</p>
        <template v-if="step === 1">
          <InputGroup type="email" placeholder="Enter your email" v-model="email"></InputGroup>
          <div class="mb-5 mt-6">
            <button type="submit" class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
              Send OTP
            </button>
          </div>
        </template>

        <template v-else-if="step === 2">
          <InputGroup label="OTP" type="text" placeholder="Enter the OTP sent to your email" v-model="otp"></InputGroup>
          <div class="mb-5 mt-6">
            <button type="submit" class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
              Confirm OTP
            </button>
          </div>
        </template>
      </form>
    </DefaultAuthCard>
</template>
