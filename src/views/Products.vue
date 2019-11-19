<template>
  <div class="bg-light">
    <loading :active.sync="isLoading" />
    <Alert />
    <div class="container pt-6">
      <!-- 單元介紹區塊 -->
      <div class="row">
        <div class="col">
          <h2>凝視選書</h2>
          <p>- 推薦最值得給您讀的書。</p>
        </div>
      </div>

      <!-- 商品內容區塊 -->
      <div class="row">
        <div class="col-sm-4 col-lg-2 mb-4 mb-md-0">
          <!-- 分類選單 -->
          <div class="list-group sticky-top text-center">
            <a
              href="#"
              class="list-group-item rounded-0 list-group-item-action"
              @click.prevent="searchCategories = ''"
              :class="{ active: searchCategories === '' }"
            >
              檢視全部
            </a>
            <a
              class="list-group-item rounded-0 list-group-item-action"
              href="#"
              @click.prevent="searchCategories = item"
              :class="{ active: item === searchCategories }"
              v-for="(item, index) in categories"
              :key="index"
            >
              {{ item }}
            </a>
          </div>
        </div>

        <div class="products col-sm-8 col-lg-10">
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <div class="col-md-6 col-lg-4 col-xl-3 mb-4" v-for="item in filterCategories" :key="item.id">
                <div class="card border-0 shadow-sm h-100 bg-light">
                  <a href="#" class="text-dark" @click.prevent="toProductPage(item.id)">
                    <img class="card-img-top" :src="item.imageUrl" alt="Card image cap" />
                  </a>
                  <div class="card-body">
                    <h6 class="card-title">
                      <a href="#" class="text-dark" @click.prevent="toProductPage(item.id)">《{{ item.title }}》</a>
                    </h6>
                    <div class="text-left text-dark">
                      <div class="h5">
                        <small>NT</small>
                        {{ item.price | currency }}
                      </div>
                    </div>
                  </div>

                  <div class="card-footer border-top-0 bg-white">
                    <button
                      class="btn btn-outline-primary btn-block btn-sm rounded-0"
                      @click="addtoCart(item.id)"
                      :disabled="loadingItem === item.id"
                    >
                      <i class="fa fa-spinner fa-spin fa-fw" v-if="loadingItem === item.id"></i>
                      <i class="fa fa-shopping-cart" aria-hidden="true" 　v-if="loadingItem !== item.id"></i>
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'; //　引入 jQuery $
import Alert from '@/components/AlertMessage';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchText: '',
      searchCategories: '',
    };
  },
  methods: {
    ...mapActions(['a_getAllProducts']),

    addtoCart(id, qty = 1) {
      this.$store.dispatch('a_addtoCart', { id, qty });
      this.$bus.$emit('message:push', '已加入購物車', 'secondary');
    },
    toProductPage(id) {
      const vm = this;
      vm.$router.push(`/products/${id}`);
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'loadingItem', 'allProducts', 'categories']),
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.allProducts.filter(item => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.allProducts;
    },
    filterCategories() {
      const vm = this;
      if (vm.searchCategories) {
        return vm.allProducts.filter(item => {
          const data = item.category.toLowerCase().includes(vm.searchCategories.toLowerCase());
          return data;
        });
      }
      return this.allProducts;
    },
  },
  created() {
    const vm = this;
    vm.a_getAllProducts();
  },
  components: {
    Alert,
  },
};
</script>

<style scoped lang="scss">
.products {
  min-height: 100vh;
}
.sticky-top {
  top: 60px;
}
</style>
