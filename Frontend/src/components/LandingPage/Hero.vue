<script setup>
import mainPhoto from "../../assets/images/hero.svg";
import { themeColor } from "../../data/items";

const heroHeading = "Athena";
const buttonSeeFeature = "See Features";
const buttonPricing = "Pricing";
</script>

<template>
  <div class="untree_co-hero" id="home-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <!-- <div class="dots"></div> -->
          <div class="row d-flex justify-content-center align-items-center vh-100">
            <div
              class="col-lg-6 ml-auto order-lg-2"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <img :src="mainPhoto" alt="Image" class="img-fluid" />
            </div>
            <div class="col-lg-6">
              <!-- heading -->
              <h1 class="heroPage" style="color: #142c48;" data-aos="fade-up" data-aos-delay="0">
                Secure <b>Today.</b><br />
                Safe <b style="color: #bca846">Tomorrow.</b>
                <h2 style="color: #142c48;">"When you don't plan accident but you can plan to stay save from catastrophic damage."</h2>
              </h1>
              <p>
                <a
                  href="/contact"
                  class="btn btn-outline-primary smoothscroll pricing"
                  :style="[{ color: themeColor }, { borderColor: themeColor }]"
                  >Contact Us</a
                >
              </p>
            </div>
          </div>
          <!-- <div class="col-lg-12 text-center">
            <h2>Our Key Partners</h2>
            <div class="oke-wrapper">
              <div class="oke">Partner 1</div>
              <div class="oke">Partner 2</div>
              <div class="oke">Partner 3</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing:hover {
  color: #fff !important;
}
.heroPage {
  font-size: 70px;
  line-height: 1;
  /* font-weight: 700; */
  color: #141c2c;
  margin-bottom: 30px;
}

</style>
