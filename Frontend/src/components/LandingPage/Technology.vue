<script setup>
import mainPhoto from "../../assets/images/service2.jpg";
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
  <div class="jarak" id="technology-section">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="100">
          <h2 class="heading">Sandhiguna Technology</h2>
          <p>
            Sandhiguna KMS utilizes several advanced technologies to provide
            secure key management and protection services
          </p>
        </div>
      </div>
      <div class="oke-wrapper-technology" data-aos="fade-up" data-aos-delay="100">
        <div class="box-technology">
          <div data-aos="fade-up" data-aos-delay="100">
            <img src="../../../public/images/Home/sgx.png" />
            <br />
          </div>
          <h5 class="bold" >Intel® Software Guard Extensions (SGX)</h5>
          <p>
            Sandhiguna KMS leverages Intel SGX to create secure enclaves within the
            CPU. These enclaves ensure that sensitive data, such as encryption
            keys, are processed and stored in an isolated and protected
            environment. SGX also supports remote attestation, proving that the
            KMS is running on a trusted processor and providing confidence in
            its integrity.
          </p>
        </div>
        <div class="box-technology">
          <div data-aos="fade-up" data-aos-delay="100">
            <img src="../../../public/images/Home/encrypted-file.png" />
            <br />
          </div>
          <h5 class="bold">Sealing and Encryption</h5>
          <p>SGX enables sealing, which ties encryption keys to specific CPUs, ensuring that keys can only be decrypted by the original CPU that sealed them. This enhances the security of key storage, preventing unauthorized access.</p>
        </div>
        <div class="box-technology">
          <div data-aos="fade-up" data-aos-delay="100">
            <img src="../../../public/images/Home/attestation.png" />
            <br />
          </div>
          <h5 class="bold">Remote attestation</h5>
          <p>Sandhiguna KMS uses SGX’s remote attestation feature to verify that the software running in the enclave is genuine and secure, further protecting against unauthorized tampering or access to sensitive keys.</p>
        </div>
        <div class="box-technology">
          <div data-aos="fade-up" data-aos-delay="100">
            <img src="../../../public/images/Home/tee.png" />
            <br />
          </div>
          <h5 class="bold">Trusted Execution Environment (TEE)</h5>
          <p>Sandhiguna KMS operates within a SoftTEE (a software-based trusted execution environment) enabled by Intel SGX.</p>
          <p>This ensures that sensitive data like keys and certificates are processed in a secure, hardware-backed environment that protects against external threats.</p>
          <p>These technologies combine to offer a highly secure environment for key management, making Sandhiguna KMS an effective solution for managing cryptographic keys in a secure and trusted manner.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.jarak {
  padding: 130px;
  position: relative;
}
@media (max-width: 991.98px) {
  .jarak {
    padding: 130px 0;
  }
}
.oke-wrapper-technology {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Membuat 3 kolom dengan lebar sama */
  gap: 10px; /* Menambah jarak antar elemen */
}
.box-technology {
  text-align: center; /* Posisikan teks di tengah setiap elemen */
  padding: 30px;
  background: rgb(239, 239, 239);
  border-radius: 5px;
}
.box-technology img {
  width: auto;
  height: 150px;
  border-radius: 5px;
}

.box-technology p {
  text-align: justify;
}

/* Media query untuk layar lebih kecil */
@media (max-width: 991px) {
  .oke-wrapper-technology {
    grid-template-columns: repeat(2, 1fr); /* 2 kolom untuk layar sedang */
  }
}

@media (max-width: 768px) {
  .oke-wrapper-technology {
    grid-template-columns: 1fr; /* 1 kolom untuk layar kecil */
  }
}
</style>
