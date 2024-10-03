<script setup></script>
<template>
  <div class="jarak">
    <div class="container">
      <div class="col-lg-12">
        <div class="oke-wrapper">
          <div class="oke">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
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
              <img src="../../assets/images/logo/logo_analytic.png" />
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
}

.oke-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Membuat 3 kolom dengan lebar sama */
  gap: 10px; /* Menambah jarak antar elemen */
}

.oke {
  text-align: center; /* Posisikan teks di tengah setiap elemen */
  padding: 10px;
}
.oke img {
  width: auto;
  height: 100px;
  border-radius: 5px;
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
