<script setup lang="ts">
import InputGroup from '@/components/Auths/InputGroup.vue'
import API from '@/api/auth'
import router from '@/router/index'
import { ref } from 'vue'
 
const fullname = ref('')
const phone = ref('')
const address = ref('')
const categoryBusiness = ref('')
const descriptionBusiness = ref('')

// Function to verify client
const verifyClient = async () => {
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
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg" style="width: 600px; height: 800px;"> <!-- Adjusting the width and height for rectangular shape -->
      
      <h1 class="text-2xl font-bold mb-6 text-center">Verification Your Trial!</h1>

      <!-- The form starts here -->
      <form @submit.prevent="verifyClient" class="w-full">
        <InputGroup v-model="fullname" label="Fullname" type="text" placeholder="Enter your fullname" />
        <InputGroup v-model="phone" label="Phone" type="tel" placeholder="Enter your phone number" />
        <InputGroup v-model="address" label="Address" type="text" placeholder="Enter your address" />
        <InputGroup v-model="categoryBusiness" label="Category Business" type="text" placeholder="Enter your business category" />
        <InputGroup v-model="descriptionBusiness" label="Description Business" type="text" placeholder="Enter your business description" />

        <div class="mt-6">
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
