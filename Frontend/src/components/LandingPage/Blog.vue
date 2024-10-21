<script setup>
import { ref, computed } from "vue";

const heading = "Our News";
const subHeading = "BLOGS";
const blogItems = [
  {
    title: "Kripto vs Kriptografi",
    // name: "Encrypt vs Kriptografi",
    date: "Jun 14, 2020",
    category: "Digital Service",
    photo: "../src/assets/images/Kripto.svg",
    description:
      "Istilah kripto dan kriptografi sering terdengar, terutama ketika kita berbicara tentang keamanan siber dan mata uang digital...",
    link: "/blogdetail",
  },
  // {
  //   title: "Pak Vincent beserta muridnya pergi dengan jumlah orang 2",
  //   name: "John",
  //   date: "Jun 15, 2020",
  //   category: "Digital Service",
  //   photo: "images/person_2.jpg",
  //   description:
  //     "This is called present tense. Do you know This is called present tense. Do you know This is called present tense...",
  //   link: "/blogdetail",
  // },
  // {
  //   title: "Far far away behind the word mountains far from the countries",
  //   name: "Lucy",
  //   date: "Jun 16, 2020",
  //   category: "Business",
  //   photo: "images/person_3.jpg",
  //   description:
  //     "This is called present tense. Do you know This is called present tense. Do you know This is called present tense...",
  //   link: "/blogdetail",
  // },
];

const searchQuery = ref("");
const filteredBlogItems = computed(() => {
  return blogItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="untree_co-section bg-light">
    <div class="container">
      <div class="row mb-4 justify-content-center text-center">
        <div class="col-md-8" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">{{ heading }}</h2>
          <p>{{ subHeading }}</p>
        </div>
      </div>
      <div class="row mb-4 justify-content-center">
        <div class="col-md-4">
          <div class="input-group">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search articles..."
              class="form-control"
            />
            <span class="input-group-text">
              <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(item, index) in filteredBlogItems"
          :key="index"
          class="col-md-6 mb-4 mb-lg-0 col-lg-4"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="news-item">
            <div class="vcard d-flex align-items-center mb-4">
                <div class="img-wrap">
                  <a :href="item.link" title="Klik untuk melihat lebih lanjut">
                    <img :src="item.photo" alt="Image" class="img-fluid" />
                  </a>
                </div>
            </div>
            <div class="news-contents mb-4">
              <!-- <span class="post-meta-2">{{ item.category }}, 4 min read</span> -->
              <h3>
                <a href="/blogdetail">{{ item.title }}</a>
              </h3>
              <span class="post-meta-2">{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 text-center p-4">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">1</a>
                </li>
                <!-- 
                <li class="page-item">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">3</a>
                </li>
                -->
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
