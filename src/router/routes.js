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
          fail: "homepage",
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
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "users",
        name: "users",
        component: () => import("pages/UsersPage.vue"),
      },{
        path: "products",
        component: () => import("pages/ProductsPage.vue"),
        name: "products",
      },{ 
        path: 'orders', 
        component: () => import('pages/OrdersPage.vue'),
        name: "orders"
      }
    ]
  },
  {
    path: "/user",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "orders",
        name: "orders",
        component: () => import("pages/UserOrders.vue"),
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("pages/MenuPage.vue"),
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
