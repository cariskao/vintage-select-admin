<template>
  <div>
    <loading :active.sync="isPageLoading"/>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">購買時間</th>
          <th width="200">email</th>
          <th>購買品項</th>
          <th width="80">應付金額</th>
          <th width="100">是否付款</th>
          <th width="50">查看</th>
        </tr>
      </thead>
      <tbody>
        <OrderItem
          v-for="order in orders"
          :key="order.id"
          :orderInfo="order"
          @showOrder="showOrderModal"
        />
      </tbody>
    </table>

    <Pagination
      v-if="pagination.total_pages > 1"
      module="order"
      api="getOrders"
    />

    <OrderModal
      v-if="modalActive"
      :orderInfo="tempOperateData"
      @modalHidden="modalActive = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrderItem from '@/components/OrderItem'
import OrderModal from '@/components/OrderModal'
import Pagination from '@/components/Pagination'
export default {
  components: {
    OrderItem,
    OrderModal,
    Pagination
  },
  data(){
    return {
      tempOperateData: {
        user: {},
        products: []
      },
      modalActive: false
    }
  },
  computed: {
    ...mapState('order', [
        'orders',
        'isPageLoading',
        'pagination'
      ])
  },
  methods: {
    ...mapActions('order', ['getOrders']),
    showOrderModal(data){
      this.tempOperateData = data
      this.modalActive = true
    }
  },
  mounted() {
    this.getOrders()
  },
}
</script>

<style>

</style>
