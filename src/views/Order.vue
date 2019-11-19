<template>
  <div class="bg-light pt-6">
    <loading :active.sync="isLoading" />
    <Navigation />
    <!-- 標題區塊 -->
    <div class="container">
      <div class="row">
        <div class="col-md-2 mb-3 mb-md-0">
          <img class="img-fluid" src="@/assets/img/step_2.png" alt="">
        </div>
        <div class="col-md-10">
          <h3>您的訂單</h3>
          <ul class="d-flex justify-content-start list-unstyled">
            <li class="font-weight-bold">購物車</li>
            <li><i class="fa fa-angle-right mx-2" aria-hidden="true"></i></li>
            <li class="text-primary h6">訂單資訊</li>
            <li><i class="fa fa-angle-right mx-2" aria-hidden="true"></i></li>
            <li class="text-muted">確認付款</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="order container mt-2 mb-5">
      <div class="row">
        <!-- 購物清單 -->
        <div class="col-md-12 col-lg-5">
          <table class="table mt-2 shadow-sm border border-dark table-striped">
            <thead　class="thead-dark">
              <th scope="col" class="text-center" width="60px">編號</th>
              <th class="text-center">選書</th>
              <th width="30px" class="text-right">小計</th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in cart.carts" :key="index">
              <th scope="row" class="text-center align-middle">{{index + 1}}</th>
                <td>
                  《{{ item.product.title }}》× {{ item.qty }}　本
                  <div class="text-secondary" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td class="align-middle text-right">
                  <small>NT</small>{{ item.final_total | currency }}
                </td>
              </tr>
            </tbody>
            <tfoot class="table-dark">
              <tr> 
                <td colspan="2" class="text-right">總計：</td>
                <td class="text-right"　v-if="cart.final_total === cart.total">
                  <strong class="h5">
                    <small>NT</small>{{ cart.total | currency }}
                  </strong>
                </td>
                <td class="text-right"　v-if="cart.final_total !== cart.total">
                  <s class="h5">
                    <small>NT</small>{{ cart.total | currency }}
                  </s>
                </td>
              </tr>
              <!-- 折扣價 "cart.final_total 不等於 cart.total 才顯示 -->
              <tr class="bg-light" v-if="cart.final_total !== cart.total">
                <td colspan="2" class="text-right text-secondary">折扣後總價：</td>
                <td class="text-right text-secondary">
                  <strong class="h5">
                    <small>NT</small>{{ cart.final_total | currency }}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group">
            <input type="text" class="form-control form-control-sm rounded-0" placeholder="現在輸入優惠碼 1111 立即享折扣！" v-model="coupon_code" />
            <div class="input-group-append">
              <button class="btn btn-sm btn-primary rounded-0" @click="addCouponCode" type="button">
                套用
              </button>
            </div>
          </div>

          <div class="text-right my-3">
            <router-link　class="btn btn-outline-dark rounded-0 btn-sm" to="/cart"><i class="fa fa-long-arrow-left" aria-hidden="true"></i
                > 回購物車</router-link>
          </div>
        </div>
        <!--收件人資訊欄位 -->
        <div class="col-md-12 col-lg-7 mb-3">
          <form @submit.prevent="createOrder()">
            <h2>收件人資訊</h2>
            <div class="form-row">
              <!-- 姓名 -->
              <div class="form-group col-md-6">
                <label for="username">收件人姓名</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.has('name') }"
                  name="name"
                  id="username"
                  v-model="form.user.name"
                  v-validate="'required'"
                  placeholder="輸入姓名"
                />
                <span class="text-danger" v-if="errors.has('name')">請輸入姓名哦</span>
              </div>
              <!-- 電話 -->
              <div class="form-group col-md-6">
                <label for="usertel">收件人電話</label>
                <input
                  type="tel"
                  class="form-control"
                  :class="{ 'is-invalid': errors.has('tel') }"
                  name="tel"
                  id="usertel"
                  v-model="form.user.tel"
                  v-validate="'required'"
                  placeholder="請輸入電話"
                />
                <span class="text-danger" v-if="errors.has('tel')">別忘了輸入電話</span>
              </div>
            </div>
            <!-- email -->
            <div class="form-group">
              <label for="useremail">Email</label>
              <input
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors.has('email') }"
                name="email"
                id="useremail"
                v-model="form.user.email"
                v-validate="'required|email'"
                placeholder="請輸入 Email"
              />
              <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
            <!-- 地址 -->
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors.has('address') }"
                name="address"
                id="useraddress"
                v-model="form.user.address"
                v-validate="'required'"
                placeholder="請輸入地址"
              />
              <span class="text-danger" v-if="errors.has('address')">讓我們知道要送貨到哪裡吧</span>
            </div>
            <!-- 留言 -->
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="10" rows="5" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-primary rounded-0">送出訂單 <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>

    <Footer />
    <BacktopBtn />
  </div>
</template>

<script>
import $ from 'jquery';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BacktopBtn from '@/components/BacktopBtn';

export default {
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      coupon_code: '',
    };
  },
  methods: {
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const order = vm.form;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            // console.log(response.data);
            if (response.data.success) {
              vm.$router.push(`/checkout/${response.data.orderId}`);
            }
          });
        } else {
          // console.log(response.data);
          vm.$bus.$emit('message:push', '欄位不完整', 'danger');
        }
      });
    },
    getCart() {
      this.$store.dispatch('a_getCart');
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$store.dispatch('a_updateLoading', true);
      this.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', '已套用優惠券', 'success');
        } else {
          vm.$bus.$emit('message:push', '優惠券無效', 'danger');
        }
        // console.log(response.data);
        vm.getCart(); // 更新購物車列表
        vm.$store.dispatch('a_updateLoading', false);
      });
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  created() {
    const vm = this;
    vm.getCart();
  },
  components: {
    Navigation,
    Footer,
    BacktopBtn,
  },
};
</script>

<style scoped lang="scss">
  .order{
    min-height: 60vh;
  }
</style>