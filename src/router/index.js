import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from 'src/store'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const user = store.getters.currentUser;
    const isAuthenticated = store.getters.isAuthenticated;
  
    if (!isAuthenticated && to.path !== '/login') {
      next('/login');
    } else if (to.path.startsWith('/admin') && !user?.admin) {
      next('/user/orders');
    } else if (to.path.startsWith('/user') && user?.admin) {
      next('/admin/orders');
    } else {
      next();
    }
  });
  

  return Router
})