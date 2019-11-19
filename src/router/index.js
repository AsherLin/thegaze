// 官方元件
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

// 自訂元件(前台)
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Story from '@/views/Story.vue';
import Products from '@/views/Products.vue';
import Cart from '@/views/Cart.vue';
import Order from '@/views/Order.vue';
import Checkout from '@/views/Checkout.vue';
import Login from '@/views/Login.vue';
import Product from '@/views/Product.vue';
import Page404 from '@/components/Page404.vue';

// 自訂元件(後台)
import Dashboard from '@/views/Dashboard.vue';
import ManageProducts from '@/views/ManageProducts.vue';
import ManageOrders from '@/views/ManageOrders.vue';
import Coupons from '@/views/Coupons.vue';

// 啟用 VueRouter 元件
Vue.use(VueRouter);

const routes = [
  // {
  //   path: '',　// 對應的虛擬路徑
  //   name: '',　// 元件呈現的名稱
  //   component: , // 對應的元件
  // },
  // Home
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // About
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  // Login
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  // Admin
  {
    path: '/admin',
    // name: 'Dashboard',
    component: Dashboard,
    redirect: '/admin/manage_products', // 重新導向
    // meta: { requiresAuth: true },
    children: [
      {
        path: 'manage_products',
        name: 'ManageProducts',
        component: ManageProducts,
        meta: { requiresAuth: true },
      },
      {
        path: 'manage_orders',
        name: 'ManageOrders',
        component: ManageOrders,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: Coupons,
        meta: { requiresAuth: true },
      },
    ],
  },
  // Products
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  // Cart
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  // Order
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  // Checkout
  {
    path: '/checkout/:id',
    name: 'Checkout',
    component: Checkout,
  },
  // Story
  {
    path: '/story',
    name: 'Story',
    component: Story,
  },
  // Product
  {
    path: '/products/:id',
    name: 'Product',
    component: Product,
  },
  {
    path: '/404',
    // redirect: 'index', //避免用戶造訪不存在頁面
    name: 'Page404',
    component: Page404,
  },
  { path: '*', redirect: '/404' },
];

const router = new VueRouter({
  routes,
  // 啟用 linkActive Class
  linkActiveClass: 'active',

  // 啟用 Scroll Behavior
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api).then(response => {
      // console.log('檢查用戶是否仍持續登入：', response)
      if (response.data.success) {
        next();
      } else {
        alert('請重新登入。');
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
    // Make sure that the next function is called exactly once in any given pass through the navigation guard.
  }
});

export default router;
