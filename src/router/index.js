import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/news",
    name: "NewsPage",
    component: () => import("../views/NewsPage.vue"),
    children: [
      {
        path: "about",
        name: "NewsItemPage",
        component: () => import("../views/NewsItemPage.vue"),
        props: true,
      },
    ],
  },

  {
    path: "*",
    component: () => import("../components/errorPages/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
