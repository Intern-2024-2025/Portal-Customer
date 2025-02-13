import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // {
  //   path: "/",
  //   name: "maintenance",
  //   component: () => import("../views/Maintenance/Maintenance.vue"),
  // },
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/Home.vue"),
    meta: {
      title: "Home",
      metaTags: [
        {
          name: "description",
          content:
            "Sandhiguna - Enigma Series as a data encryption strategy is a crucial component in mitigating security risks and legitimate access must pass through all layers of defense.",
        },
        {
          name: "keywords",
          content:
            "kms, key management system, encryption, decryption, sandhiguna",
        },
        {
          property: "og:title",
          content: "Sandhiguna - Enigma Series",
        },
        {
          property: "og:description",
          content:
            "Software-Based Key Management System with Hardware-Based Root of Trust",
        },
        {
          property: "og:image",
          content: "https://sandhiguna.com/src/assets/images/service2a.png",
        },
      ],
    },
  },
  // {
  //   path: "/dashboard",
  //   name: "dashboard",
  //   component: () => import("../views/Dashboard/Dashboard.vue"),
  // },
  // {
  //   path: "/blog",
  //   name: "blog",
  //   component: () => import("../views/blog/Blog.vue"),
  // },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact/ContactView.vue"),
    meta: {
      title: "Contact",
      metaTags: [
        {
          name: "description",
          content: "We are waiting for your message with pleasure",
        },
        {
          name: "keywords",
          content:
            "kms, key management system, encryption, decryption, sandhiguna",
        },
        {
          property: "og:title",
          content: "Sandhiguna - Enigma Series",
        },
        {
          property: "og:description",
          content:
            "Software-Based Key Management System with Hardware-Based Root of Trust",
        },
        {
          property: "og:image",
          content: "https://sandhiguna.com/src/assets/images/service2a.png",
        },
      ],
    },
  },
  {
    path: "/technology",
    name: "technology",
    component: () => import("../views/Technology/Technology.vue"),
    meta: {
      title: "Technology",
      metaTags: [
        {
          name: "description",
          content:
            "Sandhiguna - Enigma Series utilizes several advanced technologies to provide secure key management and protection services",
        },
        {
          name: "keywords",
          content:
            "kms, key management system, encryption, decryption, sandhiguna",
        },
        {
          property: "og:title",
          content: "Sandhiguna - Enigma Series",
        },
        {
          property: "og:description",
          content:
            "Software-Based Key Management System with Hardware-Based Root of Trust",
        },
        {
          property: "og:image",
          content: "https://sandhiguna.com/src/assets/images/service2a.png",
        },
      ],
    },
  },
  {
    path: "/product",
    name: "prouct",
    component: () => import("../views/Product/Product.vue"),
    meta: {
      title: "Product",
      metaTags: [
        {
          name: "description",
          content:
            "Is highly secured and trusted cryptographic engine on Hardware-based Secure Enclave technology enforced by Intel® SGX to secure your data's confidentiality, criticality and regulatory complied, at the enterprise level across various industries.",
        },
        {
          name: "keywords",
          content:
            "kms, key management system, encryption, decryption, sandhiguna",
        },
        {
          property: "og:title",
          content: "Sandhiguna - Enigma Series",
        },
        {
          property: "og:description",
          content:
            "Software-Based Key Management System with Hardware-Based Root of Trust",
        },
        {
          property: "og:image",
          content: "https://sandhiguna.com/src/assets/images/service2a.png",
        },
      ],
    },
  },
  // {
  //   path: "/blog-detail",
  //   name: "blog detail",
  //   component: () => import("../views/blog/BlogDetail.vue"),
  // },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Default Title";

  // Hapus semua meta tag lama sebelum menambahkan yang baru
  document
    .querySelectorAll("meta[name], meta[property]")
    .forEach((el) => el.remove());

  // Tambahkan meta tag baru sesuai dengan meta data di rute
  if (to.meta.metaTags) {
    to.meta.metaTags.forEach((tag) => {
      let element = document.createElement("meta");

      if (tag.name) {
        element.setAttribute("name", tag.name);
      } else if (tag.property) {
        element.setAttribute("property", tag.property);
      }

      element.setAttribute("content", tag.content);
      document.head.appendChild(element);
    });
  }

  next();
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }

//   if (to.meta.metaTags) {
//     to.meta.metaTags.forEach((tag) => {
//       let element = document.querySelector(`meta[name="${tag.name}"]`);
//       if (!element) {
//         element = document.createElement("meta");
//         document.head.appendChild(element);
//       }
//       element.setAttribute("name", tag.name);
//       element.setAttribute("content", tag.content);
//     });
//   }

//   next();
// });

export default router;
