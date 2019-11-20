import Vue from 'vue';
// Vuex './store'(預設取用index)
import Vuex from 'vuex';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// VideoBg
import VideoBg from 'vue-videobg';
// vee-validate
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import 'bootstrap';

import App from './App.vue';
// .vue並非必要，僅"預設需要加入"，ESLint會出現提示，但依然會編譯。

// Vue router
import router from './router';

// Vuex
import store from './store';

// Eventbus
import './bus';

// Filters
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

// Rigister Global
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(Vuex);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);

Vue.component('Loading', Loading);
Vue.component('video-bg', VideoBg);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true; // 設定跨域，使用 Cookies 方式登入。

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
