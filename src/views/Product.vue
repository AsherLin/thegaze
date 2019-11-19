<template>
  <div class="pt-6 bg-light">
    <loading :active.sync="isLoading" />
    <Navigation />
    <Alert />

    <div class="product">
      <!-- 商品標題區塊 -->
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="row">
                <div class="product_title">
                  <!-- Title -->
                  <div class="col-md-12">
                    <h2 class="h3">{{ product.title }}</h2>
                  </div>
                  <!-- Category -->
                  <div class="col-md-12">
                    <span>{{ product.category }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- BackPrePage -->
            <div class="col-md-4 mt-3 mt-md-0">
              <a href="#" class="btn btn-sm btn-outline-secondary rounded-0" @click.prevent="toPrePage">
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i> 回上頁</a
              >
            </div>
          </div>
        </div>
      </section>

      <!-- 商品內容區塊 -->
      <section>
        <div class="container mb-5">
          <div class="row">
            <div class="col-md-5 mt-5 mt-md-4">
              <div class="row">
                <div class="col-md-12">
                  <div class="d-flex justify-content-center">
                    <!-- 商品圖片 -->
                    <div class="img">
                      <img :src="`${product.imageUrl}`" alt="" class="img-fluid rounded-sm shadow-sm" />
                    </div>
                    <!-- 商品照片背景 -->
                    <div class="box"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- RightSide -->
            <div class="col-md-7 mt-4">
              <div class="row">
                <!-- Price -->
                <div class="col-md-4 mt-5 mt-md-0">
                  <div class="title">
                    <h4>商品價格</h4>
                  </div>
                  <div class="mt-4">
                    <ul class="pr-5">
                      <li class="text-muted">
                        <strong>定價：</strong><del><small>NT</small>{{ product.origin_price | currency }} </del>
                      </li>
                      <li>
                        <strong>特價：</strong
                        ><span class="text-danger h4"><small>NT</small>{{ product.price | currency }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- 入手吧 -->
                <div class="col-md-8">
                  <!-- title -->
                  <div class="title mt-3 mt-md-0">
                    <h4>入手吧！</h4>
                  </div>
                  <div class="input-group mt-4 mt-md-5">
                    <!-- 減1btn -->
                    <div class="input-group-prepend">
                      <a
                        href="#"
                        class="btn btn-outline-primary rounded-0"
                        :class="{ disabled: qty === 1 }"
                        id="button-addon1"
                        @click.prevent="qty = qty - 1"
                        >−</a
                      >
                    </div>
                    <!-- 購買數量欄 -->
                    <input type="number" min="1" max="20" class="form-control text-center" v-model.number="qty" />
                    <!-- 加1btn -->
                    <div class="input-group-append">
                      <a
                        href="#"
                        class="btn btn-outline-primary rounded-0"
                        :class="{ disabled: qty === 20 }"
                        id="button-addon2"
                        @click.prevent="qty = qty + 1"
                        >+</a
                      >
                    </div>
                    <!-- 加入購物車btn -->
                    <button
                      class="btn btn-sm btn-outline-primary rounded-0 ml-3"
                      @click="addtoCart(product.id, qty)"
                      :disabled="loadingItem === product.id"
                    >
                      <i class="fa fa-spinner fa-spin fa-fw" v-if="loadingItem === product.id"></i>
                      <i class="fa fa-shopping-cart" aria-hidden="true" 　v-if="loadingItem !== product.id"></i>
                      加入購物車
                    </button>
                  </div>
                </div>
                <!-- 商品描述 -->
                <div class="col-md-12">
                  <div class="title mt-4">
                    <h4>商品描述</h4>
                  </div>
                  <div class="description mt-4">
                    <p>
                      {{ product.content }}
                    </p>
                  </div>
                </div>
                <!-- 商品規格 -->
                <div class="col-md-12">
                  <div class="title mt-4">
                    <h4>商品規格</h4>
                  </div>
                  <div class="mt-4">
                    <ul>
                      <li>{{ product.description }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
import Alert from '@/components/AlertMessage';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      id: '',
      product: {
        // category: '衣服3',
        // content: '這是內容',
        // description: 'Sit down please 名設計師設計',
        // id: '-L9tH8jxVb2Ka_DYPwng',
        // imageUrl: 'test.testtest',
        // is_enabled: 1,
        // num: 1,
        // origin_price: 100,
        // price: 600,
        // title: '[賣]動物園造型衣服3',
        // unit: '個',
      },
      qty: 1,
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      vm.$store.dispatch('a_updateLoading', true);
      const id = vm.$route.params.id;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then(response => {
        // console.log(response.data);
        vm.product = response.data.product;
        vm.$store.dispatch('a_updateLoading', false);
      });
    },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('a_addtoCart', { id, qty });
      this.$bus.$emit('message:push', '已加入購物車', 'secondary');
    },
    toPrePage() {
      this.$router.back();
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'loadingItem']),
  },
  created() {
    const vm = this;
    vm.getProduct();
  },
  components: {
    Navigation,
    Footer,
    BacktopBtn,
    Alert,
  },
};
</script>

<style scoped lang="scss">
.product {
  min-height: 70vh;
}
.product_title {
  border-left: 3px solid $primary;
}
.title {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 70px;
    height: 4px;
    background-color: $primary;
    bottom: -15px;
    left: 0;
  }
}
.toPrePage {
  &:hover {
    text-decoration: none;
  }
}
.img {
  position: relative;
  z-index: 1;
  &:after {
    position: absolute;
    content: '';
    top: 20px;
    left: -20px;
    height: 100%;
    width: 100%;
    border: 4px solid $primary;
    z-index: -1;
  }
}
</style>
