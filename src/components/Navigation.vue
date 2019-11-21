<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-2" id="mainNav">
      <div class="container">
        <router-link class="text-white navbar-brand px-3" :to="{ name: 'home' }">
          <img src="@/assets/img/logo/text-white.png" height="25px" alt />
        </router-link>
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto my-2 my-lg-0">
            <li class="nav-item">
              <!-- 動態切換使用 :to="{ name:home }" -->
              <!-- 靜態切換使用 to="/" -->
              <router-link class="nav-link hover-underline-animation" to="/" exact>首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link hover-underline-animation" to="/about">成員</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link hover-underline-animation" to="/story">時事</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link hover-underline-animation" to="/products">選書</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/cart">
                <span class="cartNum">{{ cart.carts.length }}</span>
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link hover-underline-animation" to="/login">登入</router-link>
            </li>
            <!--
            <li class="nav-item">
              <router-link class="nav-link hover-underline-animation" to="/admin/manage_products">後台管理</router-link>
            </li>
            -->
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    getCart() {
      this.$store.dispatch('a_getCart');
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  created() {
    this.getCart();
  },
};
</script>
<style scoped lang="scss">
nav {
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
}
.nav-item {
  margin: 0 10px;
}
// hover-underline-animation
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: $primary;
}
.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 3px;
  bottom: 0;
  left: 0;
  // background-color: $primary;
  background-image: linear-gradient(90deg, #daa788, $primary);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.cartNum {
  display: inline-block;
  min-width: 20px;
  text-align: right;
  margin-right: 4px;
}
</style>
