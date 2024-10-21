<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import API from '@/api/auth';

const route = useRoute()
const router = useRouter() 
const step = ref<number>(1)
const email = ref<string>('')  
const otp = ref<string>('')  
const errorMessage = ref<string>('')


onMounted(() => {
  //params
  const id = route.params.id
  if (id && !isNaN(Number(id))) {
    step.value = Number(id)
  }
  //query
  email.value = route.query.email as string || ''
})

// Fungsi untuk mengirim OTP
const sendOtp = (): void => {
  step.value = 2
}

const handleSubmit = async () => {
  if (step.value === 1) {
    sendOtp()
  } else if (step.value === 2) {
    if (otp.value === '') {
      alert('Please enter the OTP')
      return
    }

    //API verification email
    const response = await API.verificationEmail(otp.value, email.value)
    if(response.status != 0 && response.code == 200){
      router.push('/auth/signin')
    }else{
      alert(response.message || "OTP SALAH!")
    }
  }
}
</script>


<template>
    <DefaultAuthCard title="Verification Email">
      <form @submit.prevent="handleSubmit">
        <p v-if="errorMessage" class="text-a-500 ">{{ errorMessage }}</p>
        <template v-if="step === 1">
          <InputGroup class="required" type="email" placeholder="Enter your email" v-model="email"></InputGroup>
          <div class="mb-5 mt-6">
            <button type="submit" class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90">
              Send OTP
            </button>
          </div>
        </template>

        <template v-else-if="step === 2">
          <p>Chek Otp in your Email! <b>{{ email }}</b> <br> <br></p>
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
