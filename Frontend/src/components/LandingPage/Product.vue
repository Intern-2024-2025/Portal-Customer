<script setup>
import { themeColor } from "../../data/items";
const heading = "Product Sandhiguna - Enigma Series";
const subHeading =
  "Is highly secured and trusted cryptographic engine on Hardware-based Secure Enclave technology enforced by Intel® SGX to secure your data's confidentiality, criticality and regulatory complied, at the enterprise level across various industries.  ";
const startButtonName = "Get Started";
const packages = [
  {
    name: "Free",
    price: "0",
  },
  {
    name: "Standard",
    price: "19.99",
  },
  {
    name: "Premium",
    price: "79.99",
  },
];
</script>

<template>
  <div class="untree_co-section" id="product-section">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">{{ heading }}</h2>
          <p>{{ subHeading }}</p>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="row-sertificate">
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="pricing-product">
                <div class="price">
                  <img src="../../../src/assets/images/sertificate/rekognisi_common_criteria.png" />
                  <p>Sertificate <br> Rekognisi Common Criteria</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="pricing-product">
                <div class="price">
                  <img src="../../../src/assets/images/sertificate/common_criteria.png" />
                  <p>Sertificate <br> Common Criteria Singapore</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="pricing-product">
                <div class="price">
                  <img src="../../../src/assets/images/sertificate/tkdn_hd.png" />
                  <p>Sertificate <br> Tingkat Komponen Dalam Negri (TKDN)</p>
                </div>
              </div>
            </div>
            <!-- <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="pricing-product active">
                <div class="price">
                  <p>ATHENA's EDGE in the Market</p>
                </div>
                <ul class="list-unstyled ul-check primary mb-5">
                  <li>Encryption key management system for data protection as part of cyber security</li>
                  <li>Forced by the most talented local Indonesian software engineer team and visionary leadership</li>
                  <li> Build and develop with effective local resources we had belief and more confidence in market competition with competitive price strategy without beats the quality</li>
                </ul>
                <p class="text-center mb-0">
                  <a
                    href="/contact"
                    class="btn btn-outline-primary"
                    :style="[
                      { color: themeColor },
                      { borderColor: themeColor },
                    ]"
                    >Contact Us</a
                  >
                </p>
              </div>
            </div> -->
            <!-- <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="pricing-product shadow active">
                <div class="price">
                  <p>AthenaARCOS (aRC)</p>
                </div>
                <ul class="list-unstyled ul-check primary mb-5">
                  <li>There live the blind texts</li>
                  <li>Far far away behind the word</li>
                  <li>Far from the countries Vokalia and Consonantia</li>
                </ul>
                <p class="text-center mb-0">
                  <a
                    href="/contact"
                    class="btn btn-outline-primary"
                    :style="[
                      { color: themeColor },
                      { borderColor: themeColor },
                    ]"
                    >Contact Us</a
                  >
                </p>
              </div>
            </div> -->
          </div>
        </div>
      </div>

      <div class="row paragraf">
        <div class="col-12" data-aos="fade-up" data-aos-delay="0">
          <p>
              Sandhiguna - Enigma Series is encryption key management system for data
            protection as part of cyber security product of PT Sandhiguna Widya
            Proteksi was becoming the first 'Confidential Computing Technology'
            adopter in Indonesia, we’ve complete to build and release with
            standard of enterprise grade and regulatory compliance digital
            product for global market.
          </p>

          <p>
              Forced by the most talented local Indonesian software engineer
            team and visioner leadership, had achieved of product development in
            cyber security industrial global standard also certified by
            International Cyber Security Agency 'Common Criteria' in Singapore.
          </p>
          <p>
              Build and develop with effective local resources we had belief
            and more confidence in market competition with competitive price
            strategy without beats the quality, especially for Indonesian market
            in regulated for Domestic Component level (TKDN) we already
            registered and comply with achievement at 87.7% scores.
          </p>
          <p>
              Creativity and Innovation in cutting-edge technology was fueled
            the Sandhiguna - Enigma Series to answer the challenges for centralized encryption
            key management with adaptive and elastic architecture system design
            to effortless handling the complexity of business applications on
            premises, cloud or hybrid environment.
          </p>
          <p>
              Believed on Sandhiguna - Enigma Series is the future proof product for digital
            society and global trend of digital transformation
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paragraf {
  /* padding: 70px; */
  text-align: justify;
}
.padding-product {
  text-align: center;
  padding-bottom: 70px;
}
.row-sertificate {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 kolom */
  gap: 10px; /* Kurangi jarak antar kotak */
  width: 100%;
}
.pricing-product {  
  display: flex;
  flex-direction: column; /* Agar gambar di atas teks */
  align-items: center; /* Memusatkan isi */
  justify-content: center;
  width: 323px; /* Sesuaikan ukuran */
  height: 489px;
  position: relative;
  padding: 20px;
  border: 2px solid #ffffff;
  background: rgb(251, 249, 249);
  border-radius: 10px;
  transition: all 0.3s ease; /* Animasi perubahan */
}

.price p {
  font-size: 16px;
  font-size: medium;
}
.price img {
  width: 275px; /* Sesuaikan ukuran */
  height: 385px;
  margin-bottom: 8px; /* Jarak antara gambar dan teks */
}

.pricing-product:hover {
  transform: translateY(-10px); /* Efek terangkat */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Bayangan muncul saat hover */
  color: black;
}

.pricing-product .body {
  text-align: center;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  padding: 24px;
}

.price img:hover {
  transform: scale(1.5); /* Perbesar gambar saat hover */
}

/* Media Query untuk tampilan lebih kecil (tablet) */
@media (max-width: 768px) {
  .row-sertificate {
    grid-template-columns: 1fr; /* 1 kolom untuk tablet dan smartphone */
  }

  .pricing-product {
    width: 100%; /* Lebar penuh pada tablet */
    height: auto; /* Sesuaikan tinggi otomatis */
    margin-bottom: 20px; /* Jarak antar kotak */
  }

  .price img {
    width: 100%; /* Gambar lebar penuh */
    height: auto; /* Sesuaikan tinggi gambar */
  }
}

.ul-check {
  margin-top: 1rem;
}

.btn {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: hsl(240, 100%, 50%) !important;
  color: white !important;
  border-color: hsl(240, 100%, 50%) !important;
}

.btn-primary:hover {
  background-color: hsl(240, 80%, 40%) !important;
  color: white !;
  border-color: hsl(240, 80%, 40%);
}

.list-unstyled li {
  font-size: 16px;
  font-weight: normal;
}

.center {
  text-align: center;
  margin-bottom: 30px;
}
</style>
