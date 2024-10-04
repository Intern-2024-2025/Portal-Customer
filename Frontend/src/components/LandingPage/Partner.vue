<script setup></script>
<template>
  <div class="jarak">
    <div class="container">
      <div class="col-lg-12">
        <div class="oke-wrapper">
          <div class="oke">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
                class="moving-logo"
                style="
                  padding-bottom: 20px;
                  width: auto;
                  height: 100px;
                  border-radius: 5px;
                "
                src="../../assets/images/logo/logo_idealeb.png"
              />
            </div>
          </div>
          <div class="oke">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
                class="moving-logo"
                style="
                  padding-top: 20px;
                  width: 230px;
                  height: 80px;
                  border-radius: 5px;
                "
                src="../../assets/images/logo/logo_sandhiguna.png"
              />
            </div>
          </div>
          <div class="oke">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
                class="moving-logo"
                src="../../assets/images/logo/logo_analytic.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.jarak {
  padding-bottom: 40px;
  position: relative;
  overflow: hidden; /* Menghindari gambar keluar dari batas kontainer */
  width: 100%; /* Mengatur lebar kontainer */
}

.oke-wrapper {
  display: flex; /* Menggunakan flexbox untuk pengaturan horizontal */
  animation: move 10s linear infinite; /* Durasi gerakan untuk efek berjalan */
}

.oke {
  flex: 0 0 auto; /* Menghindari flex grow/shrink */
  text-align: center; /* Posisikan teks di tengah setiap elemen */
  padding: 10px;
  margin: 0 30px; /* Jarak antar logo (30px di kiri dan kanan) */
}

.oke img {
  width: auto;
  height: 100px;
  border-radius: 5px;
}

/* Animasi gerakan dari kanan ke kiri */
@keyframes move {
  0% {
    transform: translateX(100%); /* Mulai dari luar layar di sebelah kanan */
  }
  100% {
    transform: translateX(-100%); /* Berakhir di luar layar di sebelah kiri */
  }
}

/* Media query untuk layar lebih kecil */
@media (max-width: 991px) {
  .oke-wrapper {
    grid-template-columns: repeat(2, 1fr); /* 2 kolom untuk layar sedang */
  }
}

@media (max-width: 768px) {
  .oke-wrapper {
    grid-template-columns: 1fr; /* 1 kolom untuk layar kecil */
  }
}
</style>
