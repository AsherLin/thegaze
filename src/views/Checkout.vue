<template>
  <div class="bg-light pt-6">
    <Alert />

    <!-- 標題區塊 -->
    <div class="container">
      <div class="row">
        <div class="col-md-2 mb-3 mb-md-0 ">
          <img class="img-fluid" src="@/assets/img/step_3.png" alt="">
        </div>
        <div class="col-md-10">
          <h3>您的訂單</h3>
          <ul class="d-flex justify-content-start list-unstyled">
            <li class="font-weight-bold">購物車</li>
            <li><i class="fa fa-angle-right mx-2" aria-hidden="true"></i></li>
            <li class="font-weight-bold">訂單資訊</li>
            <li><i class="fa fa-angle-right mx-2" aria-hidden="true"></i></li>
            <li class="text-primary h6">確認付款</li>
          </ul>
        </div>
      </div>
    </div>

    <section class="checkout container py-3 text-center">
      <div class="my-3 row justify-content-center">
        <form class="col-md-8" @submit.prevent="payOrder">
        <div class="table-responsive-lg">
          <table class="table shadow-sm border border-dark table-striped">
            <thead class="thead-dark">
              <th><strong>商品</strong></th>
              <th width="60px"><strong>數量</strong></th>
              <th class="text-right"><strong>小計</strong></th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">《{{ item.product.title }}》</td>
                <td class="align-middle">
                  {{ item.qty }} <small>{{ item.product.unit }}</small>
                </td>
                <td class="align-middle text-right"><small>NT</small>{{ item.final_total | currency }}</td>
              </tr>
            </tbody>
            <tfoot class="table-gray">
              <tr>
                <td colspan="2" class="text-right"><strong>總計</strong></td>
                <td class="text-right">
                  <strong class="h5 text-danger" v-if="order.is_paid === false"><small>NT</small>{{ order.total | currency }} </strong>
                  <strong class="h5 text-primary" v-if="order.is_paid === true"><small>NT</small>{{ order.total | currency }} </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
          <!-- 付款人資訊 -->
          <table class="table">
            <tbody>
              <tr>
                <th class="font-weight-bold">訂單編號</th>
                <td class="text-primary">{{orderId}}</td>
              </tr>
              <tr>
                <th class="font-weight-bold">姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th class="font-weight-bold" width="110">Email</th>
                <td>{{ order.user.email }}</td>
              </tr class="font-weight-bold">
              <tr>
                <th class="font-weight-bold">收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th class="font-weight-bold">收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th　class="font-weight-bold">付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-primary">已完成付款</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-center" v-if="order.is_paid === false">
            <button class="btn btn-danger rounded-0">確認付款</button>
          </div>
          <div class="text-center" v-if="order.is_paid === true">
            <router-link　class="btn btn-primary rounded-0" to="/products">繼續看看其他選書吧！</router-link>
          </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script>
import Alert from '@/components/AlertMessage';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
    };
  },

  methods: {
    getOrder() {
      const vm = this;
      const id = vm.$route.params.id;
      vm.orderId =id;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      this.$http.get(api).then(response => {
        vm.order = response.data.order;
        // console.log(response.data);
      });
    },
    payOrder() {
      const vm = this;
      const id = vm.$route.params.id;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          // console.log(response);
          vm.getOrder();
          vm.$bus.$emit('message:push', '已完成付款', 'primary');
        } else {
          vm.$bus.$emit('message:push', '付款未完成', 'danger');
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getOrder();
  },
  components: {
    Alert,
  },
};
</script>
<style lang="scss">
  .checkout{
    min-height: 60vh;
  }
</style>
