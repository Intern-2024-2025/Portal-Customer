<script setup>
import { contactInfo } from "../../data/items";

const copyrightText = "Copyright 2024, All rights reserved.";
const column1Heading = "Athena Key Management Server";
const column1Text = "Secure Today. Safe Tomorrow";
const column2Heading = "Projects";
const column3Heading = "Services";
const column4Heading = "Contact";

const connectHeading = "Connect";

const socialItems = [
  {
    link: "https://www.instagram.com/",
    icon: "icon-instagram",
  },
  {
    link: "https://www.twitter.com/",
    icon: "icon-twitter",
  },
  {
    link: "https://www.facebook.com/",
    icon: "icon-facebook",
  },
  {
    link: "https://www.linkedin.com/",
    icon: "icon-linkedin",
  },
  {
    link: "https://www.pinterest.com/",
    icon: "icon-pinterest",
  },
];
</script>

<template>
  <div class="site-footer">
    <div class="footer-dots"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <h3 style="font-weight: bold;">PT Sandhiguna Widya Proteksi</h3>
          <div class="widget">
            <h3>{{ column1Heading }}</h3>
            <p>
              {{ column1Text }} <br />
              When you don't plan accident but you can plan to stay save from
              catastrophic damage.
            </p>
          </div>
          <!-- <div class="widget">
            <h3>{{ connectHeading }}</h3>
            <ul class="list-unstyled social">
              <li style="margin-right: 4px">
                <a :href="socialItems[0].link"
                  ><span :class="socialItems[0].icon"></span
                ></a>
              </li>
              <li style="margin-right: 4px">
                <a :href="socialItems[1].link"
                  ><span :class="socialItems[1].icon"></span
                ></a>
              </li>
              <li style="margin-right: 4px">
                <a :href="socialItems[2].link"
                  ><span :class="socialItems[2].icon"></span
                ></a>
              </li>
              <li style="margin-right: 4px">
                <a :href="socialItems[3].link"
                  ><span :class="socialItems[3].icon"></span
                ></a>
              </li>
              <li>
                <a :href="socialItems[4].link"
                  ><span :class="socialItems[4].icon"></span
                ></a>
              </li>
            </ul>
          </div> -->
        </div>
        <div class="col-lg-2 ml-auto">
          <!-- <div class="widget">
            <h3>{{ column2Heading }}</h3>
            <ul class="list-unstyled float-left links">
              <li><a href="#">La Lega Stadium</a></li>
              <li><a href="#">France Building</a></li>
              <li><a href="#">22 New Homes</a></li>
              <li><a href="#">Manage Center</a></li>
              <li><a href="#">Sports Hall</a></li>
            </ul>
          </div> -->
        </div>
        <div class="col-lg-2">
          <div class="widget">
            <h3>{{ column3Heading }}</h3>
            <p></p>
            <p>Technology</p>
            <p>Product</p>
            <p>Blog</p>
            <p>Contact Us</p>
            <!-- <ul class="list-unstyled links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Technology</a></li>
              <li><a href="#">Product</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul> -->
          </div>
        </div>
        <!-- <div class="col-lg-3">
          <div class="widget">
            <h3>{{ column4Heading }}</h3>
            <address>{{ contactInfo.address }}</address>
            <a href="https://wa.me/6281908824046" style="color:gray; margin-bottom: 15px;">{{ contactInfo.phone1 }}</a>
            <p>{{ contactInfo.email }}</p>
            <ul class="list-unstyled links mb-4">
              <li>
                <a :href="'tel://' + contactInfo.phone1">{{
                  contactInfo.phone1
                }}</a>
              </li>
              <li>
                <a :href="'mailto:' + contactInfo.email"
                  ><span>{{ contactInfo.email }}</span></a
                >
              </li>
            </ul>
          </div>
        </div> -->
      </div>
      <div class="row mt-5">
        <div class="col-12 text-center">
          <p>
            {{ copyrightText }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
