<script setup>
import { themeColor, contactInfo } from "../../data/items";
import { reactive } from "vue";
import API from "../../data/Api";

// Heading
const heading = "Contact Us";
const subHeading = "We are waiting for your message with pleasure";
const labels = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  message: "Message",
};

// Form data
const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  message: "",
});

// Function to submit form
const submitForm = async () => {
  try {
    const response = await API.createContact(formData);
    if (response.code == 500) {
      alert(response.message);
    } else {
      // Notifikasi unik
      alert(`Thank you, ${formData.firstName}! Your message has been sent successfully.`);
      // Refresh the page immediately
      window.location.reload();
    }
  } catch (error) {
    alert("There was an error submitting the form.");
  }
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
          <form
            @submit.prevent="submitForm"
            class="contact-form"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label class="" for="fname">{{ labels.firstName }}</label
                  ><br />
                  <input
                    v-model="formData.firstName"
                    type="text"
                    class="small-input-field"
                    id="fname"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12">
                <div class="form-group">
                  <label class="" for="lname">{{ labels.lastName }}</label>
                  <input
                    v-model="formData.lastName"
                    type="text"
                    class="small-input-field"
                    id="lname"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="" for="email">{{ labels.email }}</label> <br />
              <input
                v-model="formData.email"
                type="email"
                class="large-input-field"
                id="email"
                required
              />
            </div>
            <div class="form-group">
              <label class="" for="message">{{ labels.message }}</label>
              <br />
              <textarea
                v-model="formData.message"
                name=""
                rows="3"
                cols="71"
                class="input-text-area"
                id="message"
                required
              />
            </div>
            <div class="button">
              <button
                href="/contact"
                class="btn btn-outline-primary smoothscroll pricing"
                :style="[{ color: themeColor }, { borderColor: themeColor }]"
              >
                Send Message
              </button>
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
  width: 100%;
  height: 50px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid hsl(0, 0%, 0%);
  border-radius: 5px;
  box-sizing: border-box;
}
.input-text-area {
  padding: 15px;
  font-size: 16px;
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
  width: 100%;
  height: 50px;
  padding: 15px;
  font-size: 16px;
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
    display: flex;
    justify-content: center;
    align-items: center;
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
