import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
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
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
  },
  plugins: [createPersistedState()],
});
