<script setup lang="ts">
import { ref, onMounted, computed, defineComponent, reactive } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import TransactionAPI from '@/api/transaction';
import PaginationStuff from '@/components/Pagination/PaginationStuff.vue';

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
  currentPages: 1,
  totalPages: 1,
});

const getTransaction = async (currentPage:number) => {
  try{ 
    const resposne = await TransactionAPI.getTransactionClient(currentPage)
    dataTransaction.value = resposne.data.data
    dataCountStatus.value = resposne.data.countStatus
    pagination.value = resposne.data.pagination
    // console.log(resposne.data)
  } catch (error) {
    console.log('get product failed', error)
  }
}



const pageTitle = ref('Transaction');
onMounted(() => {
  getTransaction(1)
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
        <img src="../../assets/images/transaction/failed.svg" alt="failed" class="flex w-12 h-12">
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
          </tr>
        </tbody>
      </table>
      </div>
      <PaginationStuff
        v-if="pagination && getTransaction"
        :pagination="pagination"
        :get-data="getTransaction"
      />
  </div>
  </DefaultLayout>
</template>
