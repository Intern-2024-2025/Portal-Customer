<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
// import TableOne from '@/components/Tables/TableOne.vue'
// import TableTwo from '@/components/Tables/TableTwo.vue'
// import TableThree from '@/components/Tables/TableThree.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('')
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">
      <!-- <TableOne />
      <TableTwo /> -->
      <TableThree />
    <BasicChartView/>
    </div>
  </DefaultLayout>
</template>


<!-- <script setup lang="ts"> -->
<!-- // import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
// import ChartOne from '@/components/Charts/ChartOne.vue'
// import ChartThree from '@/components/Charts/ChartThree.vue'
// import ChartTwo from '@/components/Charts/ChartTwo.vue'
// import ChatCard from '@/components/ChatCard.vue'
// import MapOne from '@/components/Maps/MapOne.vue'
import TableOne from '@/components/Tables/TableThree.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue' -->
<!-- // const pageTitle = ('Produk') -->
<!-- </script> -->
<!-- 
<template>
  <DefaultLayout > -->

    <!-- <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      ====== Chart One Start -->
      <!-- <ChartOne /> -->
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <!-- <ChartTwo /> -->
      <!-- ====== Chart Two End -->

      <!-- ====== Chart Three Start -->
      <!-- <ChartThree /> -->
      <!-- ====== Chart Three End -->

      <!-- ====== Map One Start -->
      <!-- <MapOne /> -->
      <!-- ====== Map One End -->

      <!-- ====== Table Three Start -->
      <!-- <div class="col-span-full ">
        <TableOne /> -->
      <!-- </div> -->
      <!-- ====== Table One End -->

      <!-- ====== Chat Card Start -->
      <!-- <ChatCard /> -->
      <!-- ====== Chat Card End -->
    <!-- </div>
  </DefaultLayout>
</template> --> 
