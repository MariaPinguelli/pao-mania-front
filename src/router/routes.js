const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),  // Layout principal
    children: [
      {
        path: '',
        component: () => {
          const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';  // Ou Vuex
          return isLoggedIn
            ? import('pages/HomePage.vue')  // Página principal
            : import('pages/LoginPage.vue'); // Página de login
        }
      }
    ]
  },
  
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'), // Layout de login
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue')
      }
    ]
  },

  // Sempre deixe isso por último
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
