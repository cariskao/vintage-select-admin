<template>
  <div>
    <loading :active.sync="isPageLoading"/>
    <div class="row mt-4">
      <SimulateOrderItem
        v-for="product in enabledProducts"
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
      v-if="showModal"
      :productInfo="product"
      @modalHidden="showModal = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters} from 'vuex'
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
  data(){
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState('shopping', [
      'product',
      'pagination',
      'cart',
      'isPageLoading'
    ]),
    ...mapGetters('shopping', ['enabledProducts'])
  },
  methods: {
    ...mapActions('shopping', ['getProducts', 'getCart']),
    checkDetail(id){
      this.showModal = true
    },
  },
  mounted() {
    this.getProducts()
    this.getCart()
  },
}


</script>

<style>

</style>
