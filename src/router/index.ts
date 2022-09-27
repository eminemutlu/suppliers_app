import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import JwtService from "@/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/components/Overview.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/components/dashboard.vue"),
      },
      {
        path: "/suppliers",
        name: "suppliers",
        component: () => import("@/components/content/SuppliersList.vue"),
      },
      {
        path: "/quotes",
        name: "quotes",
        component: () => import("@/components/content/Quotes.vue"),
      }
    ],
  },
  {
    
    path: "/",
    component: () => import("@/components/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/components/authentication/SignIn.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import("@/components/authentication/SignUp.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {

  const publicPages = ['/sign-in', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !JwtService.getToken()) {
    next('/sign-in');
  } else {
    next();
  }

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
