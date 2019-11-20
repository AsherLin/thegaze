<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 pt-3 text-muted"
      >
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/admin/manage_products" class="nav-link">📦 產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/manage_orders" class="nav-link">📜 訂單列表</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupons" class="nav-link">🎁 優惠券列表</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.active {
  color: $secondary;
}
.shadow {
  box-shadow: 2px 2px 5px #000;
}
</style>
