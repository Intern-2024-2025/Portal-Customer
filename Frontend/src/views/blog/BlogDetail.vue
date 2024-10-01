<script setup>
import { ref } from 'vue';
import Header from '../../components/LandingPage/Header.vue';
import Footer from '../../components/LandingPage/Footer.vue';

const blogdet = ref([
  {
    heading: "Kripto VS Kriptografi",
    post: {
    image: "images/Kripto.png", 
    // sectionTitle: "1. Kripto VS Kriptografi",
    sectionContent: `Istilah kripto dan kriptografi sering terdengar, terutama ketika kita berbicara tentang keamanan siber dan mata uang digital.								
                      Meski terdengar mirip, keduanya sangat berbeda dari segi fungsi dan penggunaan. Mari kita bahas perbedaannya,								
                      sehingga kamu tidak lagi bingung saat mendengar kedua istilah tersebut!`
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
          <h1 class="heading">{{ blogData.heading }}</h1>
        </div>
      </div>
      <div class="row mb-4 justify-content-center">
        <div class="col-12">
          <div class="card mb-4">
            <img :src="blogData.post.image" class="card-img-top" alt="Blog Image" style="width: 100%; height: 75vh;" />
            <div class="wrap-text">
              <div class="1-text" style="margin-top: 30px;">
                <p class="card-text">{{ blogData.post.sectionContent }}</p>
              </div>
              <div class="2-text" style="margin-top: 30px;">
                <h4>Apa Itu Kripto?</h4>
                <p class="card-text">Cryptocurrency, atau yang sering disebut kripto, adalah mata uang digital yang beroperasi di atas teknologi blockchain. Kripto tidak bergantung pada bank atau pemerintah, tetapi berjalan di jaringan terdesentralisasi yang transparan dan aman. Contohnya seperti Bitcoin, Ethereum, dan banyak altcoin lainnya.</p>
              </div>
              <div class="3-text" style="margin-top: 30px;">
                <h4>Bagaimana cara kerja kripto?</h4>
                <p class="card-text">Setiap transaksi kripto diverifikasi oleh jaringan komputer yang disebut node, menggunakan kriptografi (nah, di sini kita mulai menyentuh bagian kriptografi). Proses ini memastikan bahwa setiap transaksi tercatat secara permanen di blockchain, sehingga tidak bisa diubah atau dipalsukan.</p>
              </div>
              <div class="4-text" style="margin-top: 30px;">
                <h4>Keuntungan kripto:</h4>
                <ul>
                  <li>Keamanan: Transaksi yang menggunakan teknologi blockchain membuatnya hampir mustahil untuk diretas.</li>
                  <li>Desentralisasi: Tidak ada otoritas pusat seperti bank yang mengontrol kripto, sehingga transaksi lebih cepat dan efisien.</li>
                  <li>Privasi: Pengguna kripto bisa melakukan transaksi tanpa harus membagikan identitas pribadi.</li>
                </ul>
                <p>Namun, kripto juga tidak lepas dari risiko seperti fluktuasi harga yang ekstrem dan regulasi yang berbeda di tiap negara."</p>
              </div>
              <div class="5-text" style="margin-top: 30px;">
                <h4>Apa Itu Kriptografi?</h4>
                <p class="card-text">Sementara itu, kriptografi adalah ilmu dan teknologi di balik pengamanan data digital. Fungsinya adalah untuk mengamankan komunikasi, informasi, dan data pribadi agar tidak mudah diakses oleh pihak yang tidak berwenang.</p>
              </div>
              <div class="6-text" style="margin-top: 30px;">
                <h4>Bagaimana cara kerja kriptografi?</h4>
                <p class="card-text">Kriptografi menggunakan algoritma matematis yang sangat kompleks untuk mengenkripsi data, sehingga hanya orang yang memiliki kunci enkripsi yang dapat mengakses atau mendekripsi informasi tersebut. Ada dua jenis utama kriptografi:</p>
              <ul>
                <li>Kriptografi simetris: Menggunakan kunci yang sama untuk mengenkripsi dan mendekripsi data.</li>
                <li>Kriptografi asimetris: Menggunakan dua kunci berbeda, yaitu kunci publik dan kunci pribadi.</li>
              </ul>
              </div>
              <div class="7-text" style="margin-top: 30px;">
                <h4>Penggunaan kriptografi</h4>
                <p class="card-text">Kriptografi banyak digunakan dalam aplikasi sehari-hari, seperti:</p>
                <ul>
                  <li>Pengamanan data transaksi bank.</li>
                  <li>Enkripsi pesan di aplikasi chatting.</li>
                  <li>Sistem keamanan pada situs web (SSL/TLS).</li>
                  <li>Pengamanan data transaksi bank.</li>
                  <li>Pengelolaan kunci pada teknologi KMS (Key Management System).</li>
                </ul>
              </div>
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
.wrap-text{
color: black;
text-align: justify;
}
</style>											