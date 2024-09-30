<script setup>
import { themeColor } from "../../data/items";
import personPhoto from "../../assets/images/person_1.jpg";
import mainPhoto from "../../assets/images/service1.jpg";

const service1Heading = "Digital Services";
const service1SubHeading = "Anthena Key Management System";
const service1Quote =
  '"Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia."';
const personName = "James Anderson";
const designation = "Facebook, Product Lead";
// function youtubeVideoUrl() {
//   const youtubeVideoId = "FzRH7y3LbQE";
//   return `https://www.youtube.com/watch?v=${youtubeVideoId}&amp;t=9s`;
// }
</script>
<template>
  <div class="untree_co-section bg-light" id="features-section">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">Anthena Key Management System</h2>
          <p>
            Software-Based Key Management System with Hardware-Based Root of
            Trust
          </p>
        </div>
      </div>
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-4" data-aos="fade-right" data-aos-delay="400">
          <img :src="mainPhoto" alt="Image" class="img-fluid shadow-service2" />
          <!-- <span
            class="caption"
            data-aos="fade-up"
            data-aos-delay="0"
            :style="[{ color: themeColor }]"
            >{{ service1Heading }}</span
          >
          <h3 class="heading mb-4" data-aos="fade-up" data-aos-delay="100">
            {{ service1SubHeading }}
          </h3> -->
          <!-- <div class="mb-4" data-aos="fade-up" data-aos-delay="200"> -->
          <!-- <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast
            </p>
            <ul class="list-unstyled ul-check primary">
              <li>There live the blind texts</li>
              <li>Far far away behind the word</li>
            </ul> -->
          <!-- </div> -->
          <!-- <div class="mb-4" data-aos="fade-up" data-aos-delay="300">
            <div class="untree_co-testimonial d-flex">
              <div class="text">
                <blockquote>
                  {{ service1Quote }}
                </blockquote>
                <div class="author d-flex">
                  <div class="pic mr-3">
                    <img :src="personPhoto" alt="Image" class="img-fluid" />
                  </div>
                  <div>
                    <strong class="d-block">{{ personName }}</strong
                    ><span class="d-block">{{ designation }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="col-lg-7" data-aos="fade-up" data-aos-delay="400">
          <!-- <span
            class="caption"
            data-aos="fade-up"
            data-aos-delay="0"
            :style="[{ color: themeColor }]"
            >{{ service1Heading }}</span
          >
          <h3 class="heading mb-4" data-aos="fade-up" data-aos-delay="100">
            {{ service1SubHeading }}
          </h3> -->
          <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
            <!-- <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast
            </p> -->
            <ul class="list-unstyled ul-check primary">
              <li>
                Athena Key Management System as a data encryption strategy is a
                crucial component in mitigating security risks and legitimate
                access must pass through all layers of defense.
              </li>
              <li>
                A security system consists of multiple layers of defense
                designed to protect valuable information from unauthorized
                access.
              </li>
              <li>
                Encryption ensures that even if attackers breach the preceding
                layers, the data remains protected because it can only be
                accessed using the Encryption Key.
              </li>
              <li>
                Effective key management ensures that even if the outer defenses
                are breached, the data remains inaccessible without proper
                authorization.
              </li>
              <li>
                This is a critical element in mitigating risks in the constantly
                evolving landscape of cybersecurity.
              </li>
            </ul>
          </div>

          <!-- <div class="mb-4" data-aos="fade-up" data-aos-delay="300">
            <div class="untree_co-testimonial d-flex">
              <div class="text">
                <blockquote>
                  {{ service1Quote }}
                </blockquote>
                <div class="author d-flex">
                  <div class="pic mr-3">
                    <img :src="personPhoto" alt="Image" class="img-fluid" />
                  </div>
                  <div>
                    <strong class="d-block">{{ personName }}</strong
                    ><span class="d-block">{{ designation }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <!-- <a :href="youtubeVideoUrl()" class="btn-video" data-fancybox>
            <span class="wrap-icon-play">
              <svg
                class="bi bi-play-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                />
              </svg>
            </span>
          </a> -->
          <!-- <img :src="mainPhoto" alt="Image" class="img-fluid img-shadow" /> -->
        </div>
      </div>
      <div
        class="col-lg-12 text-center padding"
        data-aos="fade-up"
        data-aos-delay="0"
      >
        <p>Key management involves</p>
        <div class="grid-container">
          <div class="grid-item">
            <img src="../../assets/images/icon/fingerprint.png" />
            <p>
              <b>Generating strong and unique keys</b> <br />
              to prevent hacking
            </p>
          </div>
          <div class="grid-item">
            <img src="../../assets/images/icon/key-access.png" />
            <p>
              <b>Securely Distributing Keys</b><br />
              to authorized parties
            </p>
          </div>
          <div class="grid-item">
            <img src="../../assets/images/icon/think_key.png" />
            <p>
              <b>Rotating Keys</b><br />
              to minimize the risk of exposure of old keys
            </p>
          </div>
          <div class="grid-item">
            <img src="../../assets/images/icon/key.png" />
            <p>
              <b>Keys</b><br />
              when they are no longer secure or needed
            </p>
          </div>
          <div class="grid-item">
            <img src="../../assets/images/icon/private-key.png" />
            <p>
              <b>Storing Keys Securely</b> <br />
              such as in Hardware Security Modules (HSM), to prevent
              unauthorized access
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.padding {
  padding-top: 50px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Membuat 5 kolom dengan lebar sama */
  gap: 10px; /* Jarak antar kotak */
  justify-items: center; /* Memposisikan kotak di tengah horizontal */
  align-items: center; /* Memposisikan konten di tengah vertical */
}

.grid-item {
  width: 200px;
  height: 170px;
  /* background-color: #ffffff; */
  display: flex;
  flex-direction: column; /* Susun item dalam kolom (gambar di atas, teks di bawah) */
  /*justify-content: center; /*item berada di tengah dari atas ke bawah*/
  align-items: center; /* item berada di tengah dari kanan ke kiri*/
  padding: 10px;
  margin: 10px;
  /* border: 1px solid #000; */
  /* font-size: 24px; */
  /* font-weight: bold; */
}

.grid-item p {
  font-size: 14px; /* Ukuran teks */
  margin: 0; /* Menghilangkan margin default */
}

.grid-item img {
  max-width: 50%; /* Membuat gambar responsif berdasarkan lebar kotak */
  max-height: 120px; /* Batas maksimum tinggi gambar agar tidak melebihi kotak */
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px;
  justify-content: center;
  object-fit: cover; /* Memotong gambar jika terlalu besar */
}

.shadow-service2{
  border-radius: 15px;
}
</style>
