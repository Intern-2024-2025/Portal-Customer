<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TransactionAPI from '@/api/transaction';
import PaginationStuff from '@/components/Pagination/PaginationStuff.vue';


// const isDetailMode = ref(false);
// const showModal = ref(false);

type Transaction = {
  id: string;
  endpoint: string;
  create: string;
  status: boolean;
  product: {
    name: string;
  }
}
const dataTransaction = ref<Transaction[]>([]) 

const dataCountStatus = ref({ true: 0, false: 0 });

const pagination = ref({
  currentPage: 1,
  totalPages: 0,
});

const getTransaction = async () => {
  try{ 
    const resposne = await TransactionAPI.getTransactionClient()
    dataTransaction.value = resposne.data.data
    dataCountStatus.value = resposne.data.countStatus
    pagination.value = resposne.data.pagination
    // console.log(resposne.data)
  } catch (error) {
    console.log('get product failed', error)
  }
}


// // Data client (example)
// const csrKey = ref([
//   { id: 1, name: 'Free Package', price: '$0.00', invoiceDate: 'Jan 13, 2025', status: 'Paid' },
//   { id: 2, name: 'Standard Package', price: '$59.00', invoiceDate: 'Jan 13, 2025', status: 'Paid' },
// ]);

// // Client yang diedit atau dilihat
// const newClient = ref({
//   id: 0,
//   name: '',
//   price: '',
//   invoiceDate: '',
//   status: '',
// });

const pageTitle = ref('Transaction');

// // Fungsi untuk modal
// const openModal = (client?: typeof newClient.value, mode: 'edit' | 'detail' = 'edit') => {
//   if (client) {
//     newClient.value = { ...client };
//     isDetailMode.value = mode === 'detail';
//   } else {
//     newClient.value = {
//       id: 0,
//       name: '',
//       price: '',
//       invoiceDate: '',
//       status: ''
//     };
//     isDetailMode.value = false;
//   }
//   showModal.value = true;
// };

onMounted(() => {
  getTransaction()
})
</script>

<template>
  <DefaultLayout>
  <BreadcrumbDefault :pageTitle="pageTitle" />

  <div class="flex justify-between items-end mb-4 gap-4">
    <div class="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark w-1/2">
      <div class="flex items-center gap-4">
        <img src="../../assets/images/transaction/success.svg" alt="successful" class="w-12 h-12">
        <div>
          <h4 class="mt-5 mb-2 font-medium">Sum Successful Transaction</h4>
          <h3 id="totalMasuk" class="mb-2 text-title-md font-bold text-black dark:text-white">{{ dataCountStatus.true }}</h3>
          <p class="flex items-center gap-1 text-sm font-medium">Transactions</p>
        </div>
      </div>
    </div>
    
    <div class="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark w-1/2">
      <div class="flex items-center gap-4">
        <img src="../../assets/images/transaction/Failed.svg" alt="failed" class="flex w-12 h-12">
        <div>
          <h4 class="mt-5 mb-2 font-medium">Sum Failed Transaction</h4>
          <h3 id="totalKeluar" class="mb-2 text-title-md font-bold text-black dark:text-white">{{ dataCountStatus.false }}</h3>
          <p class="flex items-center gap-1 text-sm font-medium">Transactions</p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Name Product
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Endpoint
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
            <!-- <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th> -->
          </tr>
        </thead>
        <tbody> 
          <tr v-if="dataTransaction.length <=0">
            <td colspan="8" class="py-10 text-center text-gray-500 bg-white dark:text-white dark:bg-boxdark">Tidak ada data Transaction yang tersedia</td>
          </tr>
          <tr v-else v-for="(item, index) in dataTransaction" :key="index">
            <td class="py-5 px-4 pl-9 xl:pl-11">
              <h5 class="font-medium text-black dark:text-white">{{ item.product.name }}</h5>
              <!-- <p class="text-sm">{{ item.price }}</p> -->
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.endpoint }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.status }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.create }}</p>
            </td>
            <!-- <td class="py-5 px-4">
              <div class="flex items-center space-x-3.5">
                <button class="hover:text-primary">
                  <svg
                    class="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                      fill=""
                    />
                    <path
                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                      fill=""
                    />
                  </svg>
                </button>
                </div>
              </td> -->
            </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-center" v-if="dataTransaction?.length">
          <!-- <PaginationStuff/> -->
           <PaginationStuff
            :currentPage="pagination.currentPage"
            :totalPages="pagination.totalPages"
            @pageChange="getTransaction"
          />
        </div>
      </div>
    </div>
    <!-- <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">

        <div v-if="isDetailMode">
          <p><strong>Name:</strong> {{ newClient.name }}</p>
          <p><strong>Price:</strong> {{ newClient.price }}</p>
          <p><strong>Invoice Date:</strong> {{ newClient.invoiceDate }}</p>
          <p><strong>Status:</strong> {{ newClient.status }}</p>
        </div>
        <button @click="showModal = false" class="bg-gray-500 text-white px-4 py-2 rounded mt-4">Close</button>
      </div>
    </div> -->
  </DefaultLayout>
</template>
