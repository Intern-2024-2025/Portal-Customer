  <script setup>
import { themeColor, siteName } from "../../data/items";

import { ref } from "vue";

// State untuk toggle menu
const isMenuOpen = ref(false);

// Function untuk toggle menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
<template>
  <nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <a href="" class="logo m-0 float-left"
          >{{ siteName }}<span class="text-primary">.</span></a
        >
        <ul class="js-clone-nav d-none d-lg-inline-block site-menu float-left">
          <!-- <li class="active">
            <a href="#home-section" class="nav-link">Home</a>
          </li> -->
          <!-- <li class="has-children">
            <a href="#" class="nav-link">Dropdown</a>
            <ul class="dropdown">
              <li>
                <a href="#testimonials-section" class="nav-link"
                  >Testimonials</a
                >
              </li>
              <li><a href="#" class="nav-link">Menu Two</a></li>
              <li><a href="#" class="nav-link">Menu Three</a></li>
            </ul>
          </li> -->
          <!-- <li><a href="#features-section" class="nav-link">Product</a></li>
          <li><a href="#pricing-section" class="nav-link">Service</a></li>
          <li><a href="#about-section" class="nav-link">Blog</a></li>
          <li><a href="#contact-section" class="nav-link">Contact Us</a></li> -->
        </ul>
        <ul
          class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right"
        >
          <li class="">
            <router-link to="/" class="" active-class="active"
              >Home</router-link
            >
            <!-- <a href="/" class="nav-link">Home</a> -->
          </li>
          <!-- contoh a href menuju ke id #about-section -->
          <li>
            <router-link to="/technology" active-class="active"
              >Technology</router-link
            >
          </li>
          <li>
            <router-link to="/product" active-class="active"
              >Product</router-link
            >
          </li>
          <li>
            <router-link to="/blog" active-class="active">Blog</router-link>
          </li>
          <!-- <li><router-link to="/contact" active-class="active">Contact Us</router-link></li> -->
          <li class="cta-button-rounded">
            <a class="btn-outline-primary-header" href="/contact">Contact Us</a>
          </li>
          <!-- <li class="cta-primary">
            <a href="#" :style="[{ backgroundColor: themeColor }]">Register</a>
          </li> -->
        </ul>
        <!-- <a
          href="#"
          class="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none"
          data-toggle="collapse"
          data-target="#main-navbar"
        >
          <span></span>
        </a> -->
        <!-- Tombol Toggle untuk layar kecil -->
        <a
          href="#"
          class="burger ml-auto float-right site-menu-toggle d-inline-block d-lg-none"
          @click="toggleMenu"
        >
          <span></span>
        </a>


        <ul v-if="isMenuOpen" class="js-clone-nav d-lg-none mt-3 site-menu float-left mobile-menu" id="mobile-menu">
          <button class="close-btn" @click="toggleMenu">&times;</button>
          <li><router-link to="/" active-class="active">Home</router-link></li>
          <li><router-link to="/technology" active-class="active">Technology</router-link></li>
          <li><router-link to="/product" active-class="active">Product</router-link></li>
          <li><router-link to="/blog" active-class="active">Blog</router-link></li>
          <li class="cta-button-rounded"><a class="btn-outline-primary-header" href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.btn-outline-primary-header:hover {
  background-color: hsl(240, 100%, 50%) !important;
  color: white !important;
  border-color: hsl(240, 100%, 50%) !important;
  font-size: 10px;
  font-weight: normal;
}

.btn-primary:hover {
  background-color: hsl(240, 80%, 40%) !important;
  color: white !;
  border-color: hsl(240, 80%, 40%);
}

/* Default menu styling */
.site-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.site-menu li {
  margin-right: 20px;
}

.burger {
  display: none;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
}

@media (max-width: 992px) {
  .burger {
    display: inline-block;
    position: absolute;
    right: 20px;

  }

  .site-menu {
    display: none;
  }

  #mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 300px;
    height: 100vh;
    background-color: white;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
  }
  
}

</style>
