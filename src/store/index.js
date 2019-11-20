import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    loadingItem: '',
    cart: {
      carts: [],
    },
    allProducts: [],
    categories: [],
  },
  getters: {
    isLoading: (state) => state.isLoading,
    loadingItem: (state) => state.loadingItem,
    cart: (state) => state.cart,
    allProducts: (state) => state.allProducts,
    categories: (state) => state.categories,
  },
  actions,
  mutations,
});

export default store;
