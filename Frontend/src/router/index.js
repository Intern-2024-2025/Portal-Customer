//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/Home.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard/Dashboard.vue"),
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("../views/blog/Blog.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/Contact/ContactView.vue"),
  },
  {
    path: "/product",
    name: "prouct",
    component: () => import("../views/Product/Product.vue"),
  },
  {
<<<<<<< HEAD
    path: "/blogdetail",
    name: "blogdetail",
    component: () => import( "../views/blog/BlogDetail.vue"),
=======
    path: "/blog-detail/:id",
    name: "pricing",
    component: () => import("../views/blog/BlogDetail.vue"),
  },
  {
    path: "/technology",
    name: "technology",
    component: () => import("../views/Technology/Technology.vue"),
>>>>>>> 8d962a5488404500f514e7973aae33c7fb49e63d
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
