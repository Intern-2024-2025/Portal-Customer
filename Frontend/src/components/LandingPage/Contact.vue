<script setup>
import { themeColor, contactInfo } from "../../data/items";

const heading = "Get In Touch";
const subHeading = "Far from the countries Vokalia and Consonantia";
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
      <div class="row">
        <div class="col-lg-7">
          <form class="contact-form" data-aos="fade-up" data-aos-delay="100">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label class="" for="fname">{{ labels.firstName }}</label><br/>
                  <!-- <textarea type="input" class="" id="fname" cols="30" rows="3"></textarea> -->
                  <input type="text" class="small-input-field" id="fname">
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label class="" for="lname">{{ labels.lastName }}</label>
                  <!-- <textarea type="input" class="" id="lname" cols="30" rows="3"></textarea> -->
                  <input type="text" class="small-input-field" id="lname">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="" for="email">{{ labels.email }}</label>
            </div>
            <div>
              <!-- <textarea type="input" class="" id="email" cols="69" rows=""></textarea> -->
               <input type="text" class="large-input-field" id="email">
            </div>
            <div class="form-group">
              <label class="" for="message">{{ labels.message }}</label><br/>
              <textarea
              name=""
              rows="3"
              cols="71"
              placeholder="Message text"
              id="message"
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              :style="[
                { backgroundColor: themeColor },
                { borderColor: themeColor },
              ]"
            >
              {{ buttonSendMessage }}
            </button>
          </form>
        </div>
        <div class="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
          <h3 class="h5 mb-4">{{ contactInfoHeading }}</h3>
          <address class="text-black d-flex">
            <span class="mt-1 icon-room mr-2"></span
            ><span>{{ contactInfo.address }}</span>
          </address>
          <ul class="list-unstyled ul-links mb-4">
            <li>
              <a :href="'tel://' + contactInfo.phone1" class="d-flex"
                ><span class="mt-1 icon-phone mr-2"></span
                ><span>{{ contactInfo.phone1 }}</span></a
              >
            </li>
            <li>
              <a :href="'tel://' + contactInfo.phone2" class="d-flex"
                ><span class="mt-1 icon-phone mr-2"></span
                ><span>{{ contactInfo.phone2 }}</span></a
              >
            </li>
            <li>
              <a :href="'mailto:' + contactInfo.email" class="d-flex"
                ><span class="mt-1 icon-envelope mr-2"></span
                ><span>{{ contactInfo.email }}</span></a
              >
            </li>
            <li>
              <a :href="[contactInfo.website]" target="_blank" class="d-flex"
                ><span class="mt-1 icon-globe mr-2"></span
                ><span>{{ contactInfo.website }}</span></a
              >
            </li>
          </ul>
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
  .small-input-field {
    width: 100%; /* Sesuaikan lebar */
    height: 50px; /* Atur tinggi yang lebih besar */
    padding: 15px; /* Berikan padding yang cukup */
    font-size: 16px; /* Ukuran font */
    border: 1px solid hsl(0, 0%, 0%);
    border-radius: 5px;
    box-sizing: border-box;
  }
</style>

<!-- <template>
	<section class="py-6 bg-gray-800 text-gray-50">
		<div class="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
			<div class="py-6 md:py-0 md:px-6">
				<h1 class="text-4xl font-bold">Get in touch</h1>
				<p class="pt-2 pb-4">Fill in the form to start a conversation</p>
				<div class="space-y-4">
					<p class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2 sm:mr-6">
							<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
						</svg>
						<span>Fake address, 9999 City</span>
					</p>
					<p class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2 sm:mr-6">
							<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
						</svg>
						<span>123456789</span>
					</p>
					<p class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2 sm:mr-6">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
						</svg>
						<span>contact@business.com</span>
					</p>
				</div>
			</div>
			<form novalidate="" class="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
				<label class="block">
					<span class="mb-1">Full name</span>
					<input type="text" placeholder="Leroy Jenkins" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 bg-gray-800">
				</label>
				<label class="block">
					<span class="mb-1">Email address</span>
					<input type="email" placeholder="leroy@jenkins.com" class="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 bg-gray-800">
				</label>
				<label class="block">
					<span class="mb-1">Message</span>
					<textarea rows="3" class="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 bg-gray-800"></textarea>
				</label>
				<button type="button" class="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 bg-violet-400 text-gray-900 focus:ring-violet-400 hover:ring-violet-400">Submit</button>
			</form>
		</div>
	</section>
</template> -->

<!-- <template>
    <div class="contact-us-container">
      <h1 class="title">Contact us</h1>
      <p class="subtitle">
        We have custom plans to power your business. Tell us your needs, and we'll contact you shortly.
      </p>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="name" class="label">Name</label>
          <input type="text" id="name" v-model="formData.name" class="input" required />
        </div>
        <div class="form-group">
          <label for="surname" class="label">Surname</label>
          <input type="text" id="surname" v-model="formData.surname" class="input" required />
        </div>
        <div class="form-group">
          <label for="email" class="label">Email</label>
          <input type="email" id="email" v-model="formData.email" class="input" required />
        </div>
        <div class="form-group">
          <label for="country" class="label">Country</label>
          <select id="country" v-model="formData.country" class="select" required>
            <option value="" disabled selected>Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            </select>
        </div>
        <div class="form-group">
          <label for="topic" class="label">Topic</label>
          <select id="topic" v-model="formData.topic" class="select" required>
            <option value="" disabled selected>Select a topic</option>
            <option value="sales">Sales Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="subject" class="label">Subject</label>
          <input type="text" id="subject" v-model="formData.subject" class="input" required />
        </div>
        <div class="form-group">
          <label for="message" class="label">Full description</label>
          <textarea id="message" v-model="formData.message" class="textarea" required></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="button">Send →</button>
        </div>
        <p class="terms">By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy policy</a>.</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          surname: '',
          email: '',
          country: '',
          topic: '',
          subject: '',
          message: ''
        }
      }
    },
    methods: {
      handleSubmit() {
        // Handle form submission, e.g., send data to an API
        console.log(this.formData)
      }
    }
  }
  </script>
  
  <style scoped>
  .contact-us-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    background-color: #121212;
    color: white;
    font-family: 'Arial', sans-serif;
  }
  
  .title {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .input,
  .select,
  .textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 100%;
  }
  
  .button {
    background-color: #4CAF50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  
  .button:hover {
    background-color: #3e8e41;
  }
  
  .terms {
    font-size: 0.8rem;
    margin-top: 1rem;
    text-align: center;
  }
  </style> -->
  <!-- <template>
    <div class="contact-us-container">
      <h1 class="title">Contact us</h1>
      <p class="subtitle">
        We have custom plans to power your business. Tell us your needs, and we'll contact you shortly.
      </p>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="name" class="label">Name</label>
          <input type="text" id="name" v-model="formData.name" class="input" placeholder="Your name" required />
        </div>
        <div class="form-group">
          <label for="surname" class="label">Surname</label>
          <input type="text" id="surname" v-model="formData.surname" class="input" placeholder="Your surname" required />
        </div>
        <div class="form-group">
          <label for="email" class="label">Email</label>
          <input type="email" id="email" v-model="formData.email" class="input" placeholder="Enter your email address" required />
        </div>
        <div class="form-group">
          <label for="country" class="label">Country</label>
          <select id="country" v-model="formData.country" class="select" required>
            <option value="" disabled>Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
          </select>
        </div>
        <div class="form-group">
          <label for="topic" class="label">Topic</label>
          <select id="topic" v-model="formData.topic" class="select" required>
            <option value="" disabled>Select a topic</option>
            <option value="sales">Sales Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="subject" class="label">Subject</label>
          <input type="text" id="subject" v-model="formData.subject" class="input" placeholder="Let us know how we can help" required />
        </div>
        <div class="form-group">
          <label for="message" class="label">Full description</label>
          <textarea id="message" v-model="formData.message" class="textarea" placeholder="Include as much details as you can" required></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="button">Send →</button>
        </div>
        <p class="terms">By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy policy</a>.</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const formData = reactive({
    name: '',
    surname: '',
    email: '',
    country: '',
    topic: '',
    subject: '',
    message: ''
  })
  
  const handleSubmit = () => {
    console.log(formData)
    alert('Form Submitted! Check console for data.')
  }
  </script>
  
  <style scoped>
  .contact-us-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    background-color: #0a0a23;
    color: white;
    font-family: 'Arial', sans-serif;
  }
  
  .title {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .input,
  .select,
  .textarea {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 100%;
    background-color: #121212;
    color: white;
  }
  
  .input::placeholder,
  .textarea::placeholder {
    color: #888;
  }
  
  .select {
    background-color: #121212;
    color: white;
  }
  
  .button {
    background-color: #4CAF50;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
  }
  
  .button:hover {
    background-color: #3e8e41;
  }
  
  .terms {
    font-size: 0.8rem;
    margin-top: 1rem;
    text-align: center;
  }
  
  .terms a {
    color: #4CAF50;
    text-decoration: none;
  }
  
  .terms a:hover {
    text-decoration: underline;
  }
  </style> -->
  