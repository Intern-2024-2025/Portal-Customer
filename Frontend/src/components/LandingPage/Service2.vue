<script setup>
import mainPhoto from "../../assets/images/service2a.png";
const items = [
  {
    id: 1,
    name: "Grow Your Business",
    des: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    id: 2,
    name: "Build Products",
    des: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    id: 3,
    name: "Success Every Day",
    des: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
  {
    id: 4,
    name: "Bring Ideas to Life",
    des: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
  },
];
const total = 4;
</script>

<template>
  <div class="untree_co-section">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">Athena - KMS Enhances Security</h2>
          <p>Provides Highest Data Protection at Application Level</p>
        </div>
      </div>
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-7 order-lg-2 js-custom-dots">
          <div class="img-shadow shadow-service2">
            <img :src="mainPhoto" alt="Image" class="img-fluid shadow-service2" />
          </div>
        </div>
        <div class="col-lg-5">
          <div
            class="service link horizontal d-flex bg-light"
            data-aos="fade-left"
            data-aos-delay="0"
          >
            <div class="service-contents">
              <h3>Isolating Encryption Keys</h3>
              <p>
                Keys are sealed within the HSM and cannot be extracted, even by
                administrators
                <!-- • Application Level <br />
                • Protect against Database Administrator and Database Users -->
              </p>
            </div>
          </div>
          <div
            class="service link horizontal d-flex bg-light"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div class="color-2 mb-4"></div>
            <div class="service-contents">
              <h3>Preventing Remote Attacks</h3>
              <p>
                Since the keys never leave the system, this reduces the risk of
                remote attacks attempting to steal the keys
                <!-- • Database Level <br />
                • Protect against administrator abuse and containers theft -->
              </p>
            </div>
          </div>
          <div
            class="service link horizontal d-flex bg-light"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div class="service-contents">
              <h3>Ensuring Compliance</h3>
              <p>
                Many regulatory frameworks require robust key management
                practices, and SMKE helps businesses meet these requirements by
                enforcing stringent security protocols
                <!-- • Server and Storage Storage Level <br />
                • Protect against loss or theft of physical media -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.service-contents p {
  font-weight: normal; /* Mengatur teks menjadi tidak tebal */
}
.service-contents h3 {
  font-weight: bold;
  color: #141c2c;
}
.shadow-service2{
  border-radius: 15px;
}

</style>