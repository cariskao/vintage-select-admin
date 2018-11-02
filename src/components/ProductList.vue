<template>
  <div>
    <div class="text-right mt-4">
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
          <th width="120">分類</th>
          <th>產品名稱</th>
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

    <!-- Modal -->
    <ProductModal operateType="add"/>
    <ProductModal :productInfo="tempEditProduct" operateType="edit"/>
    <DeleteProductModal :productInfo="tempEditProduct"/>

  </div>
</template>

<script>
import $ from 'jquery'
import {mapState} from 'vuex'
import ProductItem from '@/components/ProductItem'
import ProductModal from '@/components/ProductModal'
import DeleteProductModal from '@/components/DeleteProductModal'
export default {
  components: {
    ProductItem,
    ProductModal,
    DeleteProductModal
  },
  data(){
    return {
      tempEditProduct: {}
    }
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    addProductModal(){
      // $(`#${type}ProductModal`).modal('show')
      $('#addProductModal').modal('show')
    },
    editProductModal(data){
      this.tempEditProduct = data
      $('#editProductModal').modal('show')
    },
    deleteProductModal(data){
      this.tempEditProduct = data
      $('#deleteProductModal').modal('show')
    }
  },
  mounted() {
    this.$store.dispatch('getProducts')
  },
}
</script>

<style>

</style>
