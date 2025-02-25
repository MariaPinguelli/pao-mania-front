const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    redirect: "/login",
    children: [
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
        name: "login",
        meta: {
          role: "guest",
          fail: "/user/HomePage",
        },
      },
      {
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
        name: "register",
      },
    ],
  },
  {
    path: "/user",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "homepage",
        name: "homepage",
        component: () => import("pages/HomePage.vue"),
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
