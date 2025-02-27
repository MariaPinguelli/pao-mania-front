import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
// import { store } from 'src/store'

export default defineRouter(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // Router.beforeEach((to, from, next) => {
  //   const user = store.state.user; 

  //   if (to.path === '/users' && !user?.admin) {
  //     next('/homepage'); // Redireciona caso não seja admin
  //   } else {
  //     next(); // Prossegue normalmente
  //   }
  // });

  return Router
})