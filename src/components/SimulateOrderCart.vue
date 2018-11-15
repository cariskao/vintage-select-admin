<template>
  <div class="my-5 row justify-content-center cart-wrapper">
    <div class="my-5 row justify-content-center">

      <loading :active.sync="isCartLoading" :is-full-page="false"/>

      <table class="table">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <SimulateOrderCartItem
            v-for="item in cart.carts"
            :key="item.id"
            :cartItemInfo="item"
          />
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total | currency }}</td>
          </tr>
          <tr
            v-if="cart.total !== cart.final_total"
          >
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total | currency }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼"
          v-model.trim="couponCode"
          @keydown.enter="useCoupon"
        >
        <div class="input-group-append">
          <ActionButton
            colorStyle="outline-secondary"
            btnLabel="套用優惠碼"
            :isLoading="isUseCouponLoading"
            @click.native="useCoupon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ActionButton from "@/components/ActionButton";
import SimulateOrderCartItem from "@/components/SimulateOrderCartItem";
export default {
  components: {
    ActionButton,
    SimulateOrderCartItem
  },
  data(){
    return {
      couponCode: '',
      isUseCouponLoading: false
    }
  },
  computed: {
    ...mapState('shopping', ['cart', 'isCartLoading'])
  },
  methods: {
    ...mapActions('shopping', ['deleteCartItem']),
    useCoupon(){
      if(!this.couponCode) return

      this.isUseCouponLoading = true
      this.$store.dispatch('shopping/useCoupon', this.couponCode)
        .then(() => {
          this.couponCode = ''
          this.isUseCouponLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// 給loading-overlay定位用
.cart-wrapper {
  position: relative;
}
</style>
