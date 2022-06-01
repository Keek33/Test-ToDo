import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Edit from "./components/Edit.vue";
import Add from "./components/Add.vue";
import Array from "./components/Array.vue";
// lazy-loaded
const Show = () => import("./components/Show.vue");
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/show",
    name: "show",
    // lazy-loaded
    component: Show,
  },
  {
    path: "/array",
    name: "array",
    // lazy-loaded
    component: Array,
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit,
  },
  {
    path: "/add",
    name: "add",
    component: Add,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  // console.log(localStorage.getItem("user"), "555 user jaaa");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
