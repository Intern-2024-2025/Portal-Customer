<template>
  <div class="untree_co-section bg-light">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">Use Cases</h2>
          <p>How Athena-KMS Helps Your Business</p>
        </div>
      </div>
      <div class="col-lg-12">
        <p class="industries">By Industries</p>
        <div class="oke-wrapper-use-case">
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="images/Home/financial-statement.png" />
              <br />
            </div>
            <h5 class="bold">Financial Services</h5>
            <p>
              Data protection solutions for banking and financial institutions
            </p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="images/Home/healthcare.png" />
              <br />
            </div>
            <h5 class="bold">Healthcare</h5>
            <p>Protection of patient data and HIPAA compliance</p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="images/Home/government-building.png" alt="Government Building"/>
              <br />
            </div>
            <h5 class="bold">Government</h5>
            <p>Meeting government security standards and data policies</p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
                src="images/Home/ecommerce.png"
              />
              <br />
              <!-- style="width: 300; height: 100px; border-radius: 5px" -->
            </div>
            <h5 class="bold">Retail & E-commerce</h5>
            <p>Secure customer data and transaction details</p>
          </div>
        </div>
        <p class="current-issue">
          By Current Issues<br />In 2023 and 2024, Indonesia faced several
          significant cybercrime incidents, highlighting its growing
          vulnerability to cyber threats as the country becomes increasingly
          digital.
        </p>
        <div class="oke-wrapper-use-case">
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../assets/images/logo/logo_bssn.png" />
              <br />
            </div>
            <h5 class="bold">
              Data Breach of 34 Million Passport Records (2023)
            </h5>
            <p>
              Data protection solutions for banking and financial institutions
            </p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../assets/images/logo/logo_bssn.png" />
              <br />
            </div>
            <h5 class="bold">Healthcare</h5>
            <p>Protection of patient data and HIPAA compliance</p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../assets/images/logo/logo_kominfo_tangsel.png" />
              <br />
            </div>
            <h5 class="bold">Government</h5>
            <p>Meeting government security standards and data policies</p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
                src="../../assets/images/logo/logo_telkom.jpg"
                style="width: 300; height: 100px; border-radius: 5px"
              />
              <br />
            </div>
            <h5 class="bold">Retail & E-commerce</h5>
            <p>Secure customer data and transaction details</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.oke-wrapper-use-case {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Membuat 3 kolom dengan lebar sama */
  gap: 10px; /* Menambah jarak antar elemen */
}

.box-use-case {
  text-align: center; /* Posisikan teks di tengah setiap elemen */
  padding: 10px;
  background: white;
  border-radius: 5px;
}
.box-use-case img {
  width: 75px;
  height: 75px;
  border-radius: 5px;
}
.bold {
  font-weight: bold;
  padding-top: 20px;
}
.current-issue {
  padding-top: 130px;
  text-align: center;
}
.industries {
  text-align: center;
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
