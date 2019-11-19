<template>
  <div class="bg-light pt-6">
    <loading :active.sync="isLoading" />
    <Navigation />
    <Alert />
    <!-- 標題區塊 -->
    <div class="container">
      <div class="row">
        <div class="col-md-2 mb-3 mb-md-0 ">
          <img class="img-fluid" src="@/assets/img/step_1.png" alt="">
        </div>
        <div class="col-md-10">
          <h3>您的購物車</h3>
          <ul class="d-flex justify-content-start">
            <li class="text-primary h6">購物車</li>
            <li><i class="fa fa-angle-right mx-2" aria-hidden="true"></i></li>
            <li class="text-muted">訂單資訊</li>
            <li><i class="fa fa-angle-right mx-2" aria-hidden="true"></i></li>
            <li class="text-muted">確認付款</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 購物車無商品 -->
    <div class="cart container text-center my-5" v-if="cart.carts.length === 0">
      <img class="img-fluid" src="@/assets/img/chart_empty.png" alt="">
      <h5 class="text-primary pt-5">
        購物車內還沒有任何商品哦，挑本喜歡的書去吧！
      </h5>
      <div class="mt-5">
        <router-link　class="btn btn-outline-primary rounded-0" to="/products">
          選書去 <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </router-link>
      </div>
    </div>
    <!-- 購物車有商品 -->
    <div class="cart container text-center mb-5" 　v-if="cart.carts.length !== 0">
      <div class="table-responsive-xl">
        <table class="table mt-4 table-striped border border-dark shadow-sm">
          <thead class="thead-dark border border-dark">
            <th scope="col" width="60px">編號</th>
            <th colspan="2">選書</th>
            <th width="60px">數量</th>
            <th class="text-right">小計</th>
            <th width="80px">刪除</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in cart.carts" :key="index">
              <th scope="row" class="align-middle">{{index + 1}}</th>
              <td class="align-middle">
                <img class="img-obj" :src="`${item.product.imageUrl}`" alt="" />
              </td>
              <td class="text-left align-middle">《{{ item.product.title }}》
                <div class="text-secondary" v-if="item.coupon">已套用優惠券
                </div>
              </td>  
              <td class="align-middle">
                {{ item.qty }} <small>{{ item.product.unit }}</small>
              </td>
              <td class="align-middle text-right"><small>NT</small>{{ item.final_total | currency }}</td>
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="delCart(item.id)" :disabled="loadingItem === item.id">
                  <i class="fa fa-spinner fa-spin fa-fw" v-if="loadingItem === item.id"></i>
                  <i class="fa fa-trash-o fa-lg" 　v-if="loadingItem !== item.id"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot class="table-dark">
            <tr>
              <td colspan="4" class="text-right">
                總計：
              </td>
              <td colspan="2" class="text-right">
                <strong class="h5"><small>NT</small>{{ cart.total | currency }}</strong>
                <br />
                <small>已包含運費及營業稅</small>
              </td>
            </tr>
            <!-- "cart.final_total 不等於 cart.total 才顯示 -->
            <tr class="bg-light" v-if="cart.final_total !== cart.total">
              <td colspan="4" class="text-right text-secondary">折扣後只要：</td>
              <td colspan="2" class="text-right text-secondary">
                <strong class="h5">
                  <small>NT</small>{{ cart.final_total | currency }}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="d-flex justify-content-between">
          <router-link class="btn btn-outline-dark rounded-0" to="/products"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> 繼續選書
          </router-link>
          <router-link class="btn btn-primary rounded-0" to="/order">結帳去 
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import $ from 'jquery';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Alert from '@/components/AlertMessage';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      this.$store.dispatch('a_getCart');
    },
    delCart(id) {
      this.$store.dispatch('a_delCart', id);
      this.$bus.$emit('message:push', '已從購物車刪除', 'danger');
    },
  },
  computed: {
    ...mapGetters([ 'loadingItem']),
    cart() {
      return this.$store.state.cart;
    },
    loadingItem() {
      return this.$store.state.loadingItem;
    },
  },
  created() {
    this.getCart();
  },
  components: {
    Navigation,
    Footer,
    Alert,
  },
};
</script>

<style scoped lang="scss">
.cart {
  min-height: 60vh;
}
.img-obj {
  width: 120px;
  height: 120px;
  object-fit: cover;
  object-position: center center;
}
</style>
