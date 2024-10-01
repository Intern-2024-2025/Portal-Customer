<script setup>
import { themeColor, siteName } from "../../data/items";
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
            <router-link to="/" class="" active-class="active">Home</router-link>
            <!-- <a href="/" class="nav-link">Home</a> -->
          </li>
          <!-- contoh a href menuju ke id #about-section -->
          <li><a href="" class="nav-link">Technology</a></li>
          <li><a href="/pricing" class="nav-link">Product</a></li>
          <li><router-link to="/blog" active-class="active">Blog</router-link></li>
          <li><router-link to="/contact" active-class="active">Contact Us</router-link></li>
          <li class="cta-button-rounded" :style="[{ color: themeColor }, { borderColor: themeColor }]">
            <a href="#">Sign in</a>
          </li>
          <!-- <li class="cta-primary">
            <a href="#" :style="[{ backgroundColor: themeColor }]">Register</a>
          </li> -->
        </ul>
        <a
          href="#"
          class="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none"
          data-toggle="collapse"
          data-target="#main-navbar"
        >
          <span></span>
        </a>
      </div>
    </div>
  </nav>
</template>
