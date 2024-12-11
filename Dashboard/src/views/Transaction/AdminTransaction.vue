<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TransactionAPI from '@/api/transaction';
import router from '@/router/index'
import FilteSearch from '@/components/FIlterSearch/FilteSearch.vue';

const isEditMode = ref(false);
const isDetailMode = ref(false);
const showModal = ref(false);

type Transaction = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  categoryBusiness: string;
  callApi: number;
  countTrial: number;
  idProduct: string;
}
const dataTransaction = ref<Transaction[]>([]) 

const getTransaction = async () => {
  try{ 
    const resposne = await TransactionAPI.getTransactionAdmin()
    dataTransaction.value = resposne.data
    console.log(resposne.data)
  } catch (error) {
    console.log('get product failed', error)
  }
}

// Client yang diedit
const newClient = ref({
  id: 0,
  name: '',
  price: '',
  invoiceDate: '',
  status: '',
});

const pageTitle = ref('Transaction');

// // Fungsi untuk modal
// const openModal = (client?: typeof newClient.value, mode: 'edit' | 'detail' = 'edit') => {
//   if (client) {
//     newClient.value = { ...client };
//     isEditMode.value = mode === 'edit';
//     isDetailMode.value = mode === 'detail';
//   } else {
//     newClient.value = {
//       id: 0,
//       name: '',
//       price: '',
//       invoiceDate: '',
//       status: ''
//     };
//     isEditMode.value = false;
//     isDetailMode.value = false;
//   }
//   showModal.value = true;
// };

const openModal = (productId: string) => {
  router.push(`/transaction-detail/${productId}`)
};


// add
// const saveClient = () => {
//   if (newClient.value.name && newClient.value.price) {
//     if (isEditMode.value) {
//       const index = csrKey.value.findIndex(item => item.id === newClient.value.id);
//       if (index !== -1) {
//         csrKey.value[index] = { ...newClient.value };
//       }
//     } else {
//       newClient.value.id = csrKey.value.length + 1; // Buat ID baru
//       csrKey.value.push({ ...newClient.value });
//     }

//     newClient.value = {
//       id: 0,
//       name: '',
//       price: '',
//       invoiceDate: '',
//       status: ''
//     };

//     showModal.value = false;
//   } else {
//     alert('Please fill out all required fields.');
//   }
// };

onMounted(() => {
  getTransaction()
})
</script>

<template>      
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <FilteSearch/>
    <div
      class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
    >
      <div class="max-w-full overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr class="bg-gray-2 text-left dark:bg-meta-4">
              <th class="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">No</th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Username
              </th>
              <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Phone 
              </th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Category Business</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Call API</th>
              <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Trial API</th>
              <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(item, index) in dataTransaction" :key="index">
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ index+1 }}</p>
              </td>
              <td class="py-5 px-4 pl-9 xl:pl-11">
                <h5 class="font-medium text-black dark:text-white">{{ item.username }}</h5>
                <!-- <p class="text-sm">{{ item.id }}</p> -->
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.phone }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.email }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.categoryBusiness }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.callApi }}</p>
              </td>
              <td class="py-5 px-4">
                <p class="text-black dark:text-white">{{ item.countTrial }}</p>
              </td>
              <td class="py-5 px-4">
                <div class="flex items-center space-x-3.5">
                  <!-- <button @click="openModal()" class="hover:text-primary" aria-label="Edit Client">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75l11.35-11.35-3.75-3.75L3 17.25zM20.71 5.63a1 1 0 0 0 0-1.42l-2.59-2.59a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button> -->

                  <button @click="openModal(item.idProduct)" class="hover:text-primary" aria-label="View Client Details">
                    <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""/>
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Edit Client -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 class="text-xl font-semibold mb-4">{{ isEditMode ? 'Edit Client' : 'Client Details' }}</h2>
        <div v-if="isEditMode">
          <label class="block mb-2">Name</label>
          <input v-model="newClient.name" class="border p-2 w-full mb-4" />

          <label class="block mb-2">Price</label>
          <input v-model="newClient.price" class="border p-2 w-full mb-4" />

          <label class="block mb-2">Invoice Date</label>
          <input v-model="newClient.invoiceDate" class="border p-2 w-full mb-4" />

          <label class="block mb-2">Status</label>
          <input v-model="newClient.status" class="border p-2 w-full mb-4" />

          <button @click="" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </div>

        <div v-if="isDetailMode">
          <p><strong>Name:</strong> {{ newClient.name }}</p>
          <p><strong>Price:</strong> {{ newClient.price }}</p>
          <p><strong>Invoice Date:</strong> {{ newClient.invoiceDate }}</p>
          <p><strong>Status:</strong> {{ newClient.status }}</p>
        </div>

        <button @click="showModal = false" class="bg-gray-500 text-white px-4 py-2 rounded mt-4">Close</button>
      </div>
    </div>
  </DefaultLayout>
</template>
