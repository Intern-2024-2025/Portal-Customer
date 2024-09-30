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
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import( "../views/Authentication/Login.vue"),
  // },
  // {
  //   path: "/logik",
  //   name: "logik",
  //   component: () => import( "../views/Authentication/logik.vue"),
  // },
  {
    path: "/contact",
    name: "contact",
    component: () => import( "../views/Contact/ContactView.vue"),
  },
  // {
  //   path: "/Contact1",
  //   name: "contact1",
  //   component: () => import( "../views/Contact/MainPageView.vue"),
  // },
  {
    path: "/Pricing",
    name: "pricing",
    component: () => import( "../views/PricingV/PricingView.vue"),
  },
  {
    path: "/blog-detail/:id",
    name: "pricing",
    component: () => import( "../views/blog/BlogDetail.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
