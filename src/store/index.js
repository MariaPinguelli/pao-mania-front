import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
    cartItems: [] 
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    addItemToCart(state, item) {
      state.cartItems.push(item);
    },
    removeItemFromCart(state, itemId) {
      state.cartItems = state.cartItems.filter(item => item.product.id !== itemId);
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
  actions: {
    login({ commit }, userData) {
      localStorage.setItem('token', userData.token);
      commit('setUser', userData.user);
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('logout');
      window.location.href = '/login';
    },
    addItemToCart({ commit }, item) {
      commit('addItemToCart', item);
    },
    removeItemFromCart({ commit }, itemId) {
      commit('removeItemFromCart', itemId);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
  },
  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
    cartItems: (state) => state.cartItems,
  },
  plugins: [createPersistedState()],
});
