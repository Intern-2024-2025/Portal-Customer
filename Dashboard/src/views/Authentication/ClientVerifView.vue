<script setup lang="ts">
import InputGroup from '@/components/Auths/InputGroup.vue'
import API from '@/api/auth'
import router from '@/router/index'
import { ref } from 'vue'
import HeaderArea from '@/components/Header/HeaderArea.vue'
 
const fullname = ref('')
const phone = ref('')
const address = ref('')
const categoryBusiness = ref('')
const descriptionBusiness = ref('')
const image = ref('')

// const dataVerify = ref<Verify>() 

// Function to verify client
const verifyClient = async () => {
  try {
    const response = await API.verificationData(fullname.value, phone.value, address.value, categoryBusiness.value, descriptionBusiness.value, image.value)
    console.log(response)
    if(response.code === 201){
      router.push('/product')
    }
  } catch (error) {
    console.log('verivy gagal:', error)
  }
  // if (!fullname.value || !phone.value || !address.value || !categoryBusiness.value || !descriptionBusiness.value) {
  //   alert('All fields are required!')
  //   return
  // }

  // try {
  //   const response = await API.verify({
  //     fullname: fullname.value,
  //     phone: phone.value,
  //     address: address.value,
  //     categoryBusiness: categoryBusiness.value,
  //     descriptionBusiness: descriptionBusiness.value,
  //   })

  //   console.log('API Response:', response)
     
  //   if (response && response.code === 201) {
  //     alert('Verification successful! Redirecting...')
  //     router.push('/dashboard')
  //   } else {
  //     alert(response?.message || 'Verification failed')
  //   }
  // } catch (error) {
  //   console.error('Verification failed:', error)
  //   alert(`Verification failed: ${error.message || 'Unknown error occurred'}`)
  // }
}
</script>

<template>
  <HeaderArea />

  <div class="flex flex-col items-center bg-gray-100 min-h-screen dark:bg-meta-4">
    <div class="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg my-8"> <!-- Removed fixed height -->
      
      <h1 class="text-2xl font-bold mb-6 text-center">Verification Your Trial!</h1>

      <form @submit.prevent="verifyClient" class="space-y-4">
        <InputGroup v-model="fullname" label="Fullname" type="text" placeholder="Enter your fullname" />
        <InputGroup v-model="phone" label="Phone" type="tel" placeholder="Enter your phone number" />
        <InputGroup v-model="address" label="Address" type="text" placeholder="Enter your address" />
        <InputGroup v-model="categoryBusiness" label="Category Business" type="text" placeholder="Enter your business category" />
        <InputGroup v-model="descriptionBusiness" label="Description Business" type="text" placeholder="Enter your business description" />

        <div>
          <input
            type="submit"
            value="Verify account"
            class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          />
        </div>
      </form>
    </div>
  </div>
</template>
