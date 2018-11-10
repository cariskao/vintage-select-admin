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
            :class="activeClass('products')"
            to="/admin/products"
          >
            <v-icon name="box-open"/> 產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"
            :class="activeClass('coupons')"
            to="/admin/coupons"
          >
            <v-icon name="money-bill-alt"/> 優惠券
          </router-link>
        </li>
        <li class="nav-item">
          <!-- 這邊order會重複match到simulate_order，要修改！！！！！ -->
          <router-link class="nav-link"
            :class="activeClass('orders')"
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
            :class="activeClass('simulate_order')"
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
  methods: {
    activeClass(page){
      const data = this.$route.path.split('/')

      return {
        active: data.indexOf(page) > -1
      }
    }
  },
}
</script>

<style>

</style>
