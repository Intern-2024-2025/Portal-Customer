<script setup lang="ts">
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue';
import ChartOne from '@/components/Charts/ChartOne.vue';
import ChartTwo from '@/components/Charts/ChartTwo.vue';
import ChartThree from '@/components/Charts/ChartThree.vue';

const pageTitle = ref('')
</script>

<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <DataStatsOne />
    </div>

    <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <ChartOne />
      <ChartTwo />
      <ChartThree />
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
