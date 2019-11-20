export default {
  m_loading(state, status) {
    // state.isLoading = status;
    Object.assign(state, { isLoading: status });
  },
  m_loadingItem(state, id) {
    // state.loadingItem = id;
    Object.assign(state, { loadingItem: id });
  },
  m_cart(state, payload) {
    // state.cart = payload;
    Object.assign(state, { cart: payload });
  },
  m_allproducts(state, payload) {
    // state.allProducts = payload;
    Object.assign(state, { allProducts: payload });
  },
  m_categories(state, payload) {
    const categories = new Set();
    payload.forEach((item) => {
      categories.add(item.category);
    });
    // state.categories = Array.from(categories);
    Object.assign(state, { categories });
  },
};
