<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link"
            to="/admin/products"
          >
            <v-icon name="box-open"/> 產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            to="/admin/coupons"
          >
            <v-icon name="money-bill-alt"/> 優惠券
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            to="/admin/orders"
          >
            <v-icon name="credit-card"/> 訂單
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>模擬功能</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link"
            to="/simulate_order"
          >
            <v-icon name="shopping-cart"/> 模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  color: #007bff;
}
</style>
