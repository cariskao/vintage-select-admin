<template>
  <div>
    <loading :active.sync="isPageLoading"/>
    <div class="mt-4">
      <button
        class="btn btn-primary"
        @click="showModal( { type: 'add' } )"
      >
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠券名稱</th>
          <th width="120">折扣比例</th>
          <th width="200">到期日</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <CouponItem
          v-for="coupon in coupons"
          :key="coupon.id"
          :couponInfo="coupon"
          @editCoupon="showModal"
          @deleteCoupon="showModal"
        />
      </tbody>
    </table>

    <Pagination
      v-if="pagination.total_pages > 1"
      module="coupon"
      api="getCoupons"
    />

    <!-- Modal -->
    <CouponModal
      v-if="currentOperateType === 'add' || currentOperateType === 'edit'"
      :operateType="currentOperateType"
      :couponInfo="tempOperateData"
      @modalHidden="currentOperateType = ''"
    />
    <DeleteCouponModal
      v-if="currentOperateType === 'delete'"
      :couponInfo="tempOperateData"
      @modalHidden="currentOperateType = ''"
    />

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CouponModal from '@/components/CouponModal'
import DeleteCouponModal from '@/components/DeleteCouponModal'
import CouponItem from '@/components/CouponItem'
import Pagination from '@/components/Pagination'
export default {
  components: {
    CouponModal,
    DeleteCouponModal,
    CouponItem,
    Pagination
  },
  data(){
    return {
      tempOperateData: {},
      currentOperateType: '' // add edit delete 三種
    }
  },
  computed: {
    ...mapState('coupon', ['coupons', 'isPageLoading', 'pagination'])
  },
  methods: {
    ...mapActions('coupon', ['getCoupons']),
    showModal( { data = null, type } ){
      // 先準備好操作的物件，確保modal組件生成時注入內部創建data
      this.tempOperateData = data || this.$store.state.coupon.couponTemplate
      this.currentOperateType = type
      // modal組件mounted會自動執行開啟
    },
  },
  mounted() {
    this.getCoupons()
  },
}
</script>

<style>

</style>
