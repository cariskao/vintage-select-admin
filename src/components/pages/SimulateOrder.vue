<template>
  <div>
    <loading :active.sync="isPageLoading"/>
    <div class="row mt-4">
      <SimulateOrderItem
        v-for="product in products"
        :key="product.id"
        :productInfo="product"
        @checkDetail="checkDetail"
      />
      
    </div>
    <div>
      <Pagination
        v-if="pagination.total_pages > 1"
        module="shopping"
        api="getProducts"
      />
    </div>

    <hr>

    <SimulateOrderCart
      v-if="cart.carts.length > 0"
    />

    <SimulateOrderForm
      v-if="cart.carts.length > 0"
    />

    <SimulateOrderModal 
      :productInfo="product"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
import $ from 'jquery'
import { mapState, mapActions} from 'vuex'
import SimulateOrderItem from '@/components/SimulateOrderItem'
import SimulateOrderModal from '@/components/SimulateOrderModal'
import SimulateOrderCart from '@/components/SimulateOrderCart'
import SimulateOrderForm from '@/components/SimulateOrderForm'
import Pagination from '@/components/Pagination'
export default {
  components: {
    SimulateOrderItem,
    SimulateOrderCart,
    SimulateOrderForm,
    Pagination,
    SimulateOrderModal
  },
  computed: {
    ...mapState('shopping', [
      'products',
      'product',
      'pagination',
      'cart',
      'isPageLoading'
    ]),
  },
  methods: {
    ...mapActions('shopping', ['getProducts', 'getCart']),
    checkDetail(id){
      $('#SimulateOrderModal').modal('show')
    },
    closeModal(){
      $('#SimulateOrderModal').modal('hide')
    }
  },
  mounted() {
    this.getProducts()
    this.getCart()
  },
}


</script>

<style>

</style>
