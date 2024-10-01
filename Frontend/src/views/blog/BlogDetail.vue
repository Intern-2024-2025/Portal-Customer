<script setup>
import { ref } from 'vue';
import Header from '../../components/LandingPage/Header.vue';
import Footer from '../../components/LandingPage/Footer.vue';

// Data array blogdet
const blogdet = ref([
  {
    heading: "Nun Jauh disana ada lorem ipsum dolor siet qwerty",
    subHeading: "Encrypt & Decrypt?",
    post: {
    title: "Nun Jauh disana ada lorem ipsum dolor siet qwerty ternyata ytrewq",
    author: "James",
    date: "Jun 14, 2020",
    views : "1200",
    image: "images/person_1.jpg", // Replace with actual image URL
    intro: `.`,
    sectionTitle: "Overview Pembayaran Kartu Kredit",
    sectionContent: `Sejarah kartu kredit dimulai pada awal abad ke-20, dengan perkembangan pesat selama beberapa dekade 
                    terakhir berkat teknologi digital. Kartu kredit bekerja dengan memungkinkan pelanggan untuk melakukan 
                    pembelian sekarang dan membayar nanti, biasanya dengan bunga jika tidak dibayar penuh pada akhir bulan.`
    }
  }
]);
const blogData = blogdet.value[0];
</script>

<template>
  <Header />
  <div class="untree_co-section bg-light">
    <div class="container">
      <div class="row mb-4 justify-content-center text-center">
        <div class="col-md-8" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">{{ blogData.heading }}</h2>
          <p>{{ blogData.subHeading }}</p>
        </div>
      </div>
      <div class="row mb-4 justify-content-center">
        <div class="col-12">
          <div class="card mb-4">
            <img :src="blogData.post.image" class="card-img-top" alt="Blog Image" style="width: 100%; height: 75vh;" />
            <div class="card-body">
              <h3 class="card-title">{{ blogData.post.title }}</h3>
              <p class="card-text" v-html="blogData.post.intro"></p>
              <h5>{{ blogData.post.sectionTitle }}</h5>
              <p class="card-text">{{ blogData.post.sectionContent }}</p>
            </div>
            <div class="card-footer text-muted">
              Posted on {{ blogData.post.date }} by {{ blogData.post.author }} - {{ blogData.post.views }} Views
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style>
.container > image{
 display: flex;
 justify-content: center;
}
</style>