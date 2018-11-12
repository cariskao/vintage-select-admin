<template>
  <div>
    <loading :active.sync="isPageLoading"/>
    <div class="mt-4">
      <button
        class="btn btn-primary"
        @click="addProductModal"
      >
        新增商品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">品牌</th>
          <th width="100">類型</th>
          <th>產品名稱</th>
          <th width="60">數量</th>
          <th width="80">原價</th>
          <th width="80">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <ProductItem
          v-for="product in products"
          :key="product.id"
          :productInfo="product"
          @editProduct="editProductModal"
          @deleteProduct="deleteProductModal"
        />
      </tbody>
    </table>

    <Pagination
      v-if="pagination.total_pages > 1"
      module="product"
      api="getProducts"
    />

    <!-- Modal -->
    <ProductModal operateType="add"/>
    <ProductModal :productInfo="tempOperateData" operateType="edit"/>
    <DeleteProductModal :productInfo="tempOperateData"/>

  </div>
</template>

<script>
import $ from 'jquery'
import { mapState } from 'vuex'
import ProductItem from '@/components/ProductItem'
import ProductModal from '@/components/ProductModal'
import DeleteProductModal from '@/components/DeleteProductModal'
import Pagination from '@/components/Pagination'
export default {
  components: {
    ProductItem,
    ProductModal,
    DeleteProductModal,
    Pagination
  },
  data(){
    return {
      tempOperateData: {
        category: {
          brand: '',
          class: ''
        }
      },
    }
  },
  computed: {
    ...mapState('product' , ['products', 'pagination', 'isPageLoading']),
  },
  methods: {
    addProductModal(){
      $('#addProductModal').modal('show')
    },
    editProductModal(data){
      // 修改物件參考，否則不會觸發modal內的watch
      this.tempOperateData = { ...data }
      $('#editProductModal').modal('show')
    },
    deleteProductModal(data){
      this.tempOperateData = data
      $('#deleteProductModal').modal('show')
    }
  },
  mounted() {
    this.$store.dispatch('product/getProducts')
  },
}
</script>

<style>

</style>
