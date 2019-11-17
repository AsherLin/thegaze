export default {
  m_loading(state, status) {
    state.isLoading = status;
  },
  m_loadingItem(state, id) {
    state.loadingItem = id;
  },
  m_cart(state, payload) {
    state.cart = payload;
  },
  m_allproducts(state, payload) {
    state.allProducts = payload;
  },
  m_categories(state, payload) {
    const categories = new Set();
    payload.forEach(item => {
      categories.add(item.category);
    });
    state.categories = Array.from(categories);
  },
};
