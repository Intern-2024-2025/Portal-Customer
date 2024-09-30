<script setup>
import { themeColor, contactInfo } from "../../data/items";

const heading = "Contact Us";
const subHeading = "We are waiting for your message with pleasure";
const contactInfoHeading = "Contact Information";
const buttonSendMessage = "Send Message";
const labels = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  message: "Message",
};
</script>

<template>
  <div class="untree_co-section" id="contact-section">
    <div class="container">
      <div class="row mb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="col-12 text-center">
          <h2 class="heading">{{ heading }}</h2>
          <p>{{ subHeading }}</p>
        </div>
      </div>
      <div class="row center">
        <div class="col-lg-12">
          <form class="contact-form" data-aos="fade-up" data-aos-delay="100">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label class="" for="fname">{{ labels.firstName }}</label
                  ><br />
                  <input type="text" class="small-input-field" id="fname" />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label class="" for="lname">{{ labels.lastName }}</label>
                  <input type="text" class="small-input-field" id="lname" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="" for="email">{{ labels.email }}</label> <br />
              <input type="text" class="large-input-field" id="email" />
            </div>
            <div class="form-group">
              <label class="" for="message">{{ labels.message }}</label>
              <br />
              <textarea
                name=""
                rows="3"
                cols="71"
                class="input-text-area"
                id="message"
              />
            </div>
            <div class="button">
              <a
                href="/contact"
                class="btn btn-outline-primary smoothscroll pricing"
                :style="[{ color: themeColor }, { borderColor: themeColor }]"
                >Send Message</a
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Atur ukuran input menggunakan CSS */
.large-input-field {
  width: 100%; /* Sesuaikan lebar */
  height: 50px; /* Atur tinggi yang lebih besar */
  padding: 15px; /* Berikan padding yang cukup */
  font-size: 16px; /* Ukuran font */
  border: 1px solid hsl(0, 0%, 0%);
  border-radius: 5px;
  box-sizing: border-box;
}
.input-text-area {
  padding: 15px; /* Berikan padding yang cukup */
  font-size: 16px; /* Ukuran font */
  border: 1px solid hsl(0, 0%, 0%);
  border-radius: 5px;
  box-sizing: border-box;
}
.center {
  justify-content: center;
}
.pricing:hover {
  color: #fff !important;
}
.button {
  display: flex;
  justify-content: flex-end;
}
.small-input-field {
  width: 100%; /* Sesuaikan lebar */
  height: 50px; /* Atur tinggi yang lebih besar */
  padding: 15px; /* Berikan padding yang cukup */
  font-size: 16px; /* Ukuran font */
  border: 1px solid hsl(0, 0%, 0%);
  border-radius: 5px;
  box-sizing: border-box;
}

/* Media queries untuk layar besar */
@media (min-width: 768px) {
  .row .col-md-6 {
    width: 50%;
    float: left;
  }
}

/* Media queries untuk layar kecil */
@media (max-width: 767px) {
  .row {
    display: flex; /* Gunakan flexbox */
    justify-content: center; /* Mengatur elemen agar berada di tengah secara horizontal */
    align-items: center; /* Jika ingin elemen juga berada di tengah secara vertikal */
    text-align: center;
  }

  .row .col-md-6 {
    width: 75%;
    float: none;
  }
  .large-input-field {
    width: 75%;
  }
  .input-text-area {
    width: 75%;
  }
  .button {
    display: flex;
    justify-content: center;
  }
}
</style>
