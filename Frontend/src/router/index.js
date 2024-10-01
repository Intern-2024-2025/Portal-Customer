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
    path: "/blog-detail/:id",
    name: "pricing",
    component: () => import("../views/blog/BlogDetail.vue"),
  },
  {
    path: "/technology",
    name: "technology",
    component: () => import("../views/Technology/Technology.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // <-- routes,
});

export default router;
