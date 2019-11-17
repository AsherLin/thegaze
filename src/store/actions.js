import axios from 'axios';

export default {
  a_getAllProducts(context) {
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
    context.commit('m_loading', true);
    axios.get(url).then(response => {
      context.commit('m_allproducts', response.data.products);
      context.commit('m_categories', response.data.products);
      context.commit('m_loading', false);
      // console.log('取得產品列表:', response);
    });
  },
  a_updateLoading(context, status) {
    context.commit('m_loading', status);
  },
  a_getCart(context) {
    const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
    axios.get(api).then(response => {
      context.commit('m_cart', response.data.data);
      // console.log('購物車資料: ', response);
    });
  },
  a_addtoCart(context, { id, qty = 1 }) {
    const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
    context.commit('m_loadingItem', id);
    const item = { product_id: id, qty };
    axios.post(api, { data: item }).then(response => {
      context.commit('m_loadingItem', '');
      context.dispatch('a_getCart');
      // console.log('加入購物車', response);
    });
  },
  a_delCart(context, id) {
    context.commit('m_loadingItem', id);
    const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
    axios.delete(api).then(response => {
      context.dispatch('a_getCart');
      context.commit('m_loadingItem', '');
      // console.log('刪除購物車' + response.data);
    });
  },
};
