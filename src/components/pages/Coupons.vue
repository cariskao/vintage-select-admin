<template>
  <div>
    <loading :active.sync="isPageLoading"/>
    <div class="mt-4">
      <button
        class="btn btn-primary"
        @click="addCoupon"
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
          @editCoupon="editCouponModal"
          @deleteCoupon="deleteCouponModal"
        />
      </tbody>
    </table>

    <Pagination
      v-if="pagination.total_pages > 1"
      module="coupon"
      api="getCoupons"
    />

    <!-- Modal -->
    <CouponModal :couponInfo="tempOperateData" operateType="add"/>
    <CouponModal :couponInfo="tempOperateData" operateType="edit"/>
    <DeleteCouponModal :couponInfo="tempOperateData"/>

  </div>
</template>

<script>
import $ from "jquery";
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
      tempOperateData: {}
    }
  },
  computed: {
    ...mapState('coupon', ['coupons', 'isPageLoading', 'pagination'])
  },
  methods: {
    ...mapActions('coupon', ['getCoupons']),
    addCoupon(){
      // 修改物件參考，否則不會觸發modal內的watch
      this.tempOperateData = { ...this.$store.state.coupon.couponTemplate }
      $('#addCouponModal').modal('show')
    },
    editCouponModal(couponInfo){
      // 修改物件參考，否則不會觸發modal內的watch
      this.tempOperateData = { ...couponInfo }
      $('#editCouponModal').modal('show')
    },
    deleteCouponModal(couponInfo){
      this.tempOperateData = couponInfo
      $('#deleteCouponModal').modal('show')
    },
  },
  mounted() {
    this.getCoupons()
  },
}
</script>

<style>

</style>
