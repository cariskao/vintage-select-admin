<template>
  <div>
    <loading :active.sync="isPageLoading"/>
    <div class="mt-4">
      <button
        class="btn btn-primary"
        @click="showModal( { type: 'add' } )"
      >
        新增商品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">品牌</th>
          <th>產品名稱</th>
          <th width="100">類型</th>
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
          @editProduct="showModal"
          @deleteProduct="showModal"
        />
      </tbody>
    </table>

    <Pagination
      v-if="pagination.total_pages > 1"
      module="product"
      api="getProducts"
    />

    <!-- Modal -->
    <ProductModal
      v-if="currentOperateType === 'add' || currentOperateType === 'edit'"
      :operateType="currentOperateType"
      :productInfo="tempOperateData"
      @modalHidden="currentOperateType = ''"
    />
    <DeleteProductModal
      v-if="currentOperateType === 'delete'"
      :productInfo="tempOperateData"
      @modalHidden="currentOperateType = ''"
    />

  </div>
</template>

<script>
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
      tempOperateData: {},
      currentOperateType: '' // add edit delete 三種
    }
  },
  computed: {
    ...mapState('product' , ['products', 'pagination', 'isPageLoading']),
  },
  methods: {
    showModal( { data = null, type } ){
      // 先準備好操作的物件，確保modal組件生成時注入內部創建data
      this.tempOperateData = data || this.$store.state.product.productTemplate
      this.currentOperateType = type
      // modal組件mounted會自動執行開啟
    },
  },
  mounted() {
    this.$store.dispatch('product/getProducts')
  },
}

// modal邏輯
// 開啟
// 每次操作產品前，先設定currentOperateType ->
// 設定完觸發modal組件v-if，生成modal組件同時將操作物件注入modal props -> 
// modal組件內data生成完畢，mounted時觸發開啟彈窗
// 關閉
// 關閉彈窗事件觸發 -> 修改currentOperateType為空 -> 
// modal組件摧毀，確保下次生成新的modal與新的資料
</script>

<style>

</style>
