<template>
  <div class="modal fade" id="deleteProductModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ productInfo.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <ActionButton
            colorStyle="danger"
            btnLabel="確認刪除"
            :isLoading="isLoading"
            @click.native="deleteProduct(productInfo.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ActionButton from '@/components/ActionButton'
export default {
  props: {
    productInfo: {
      type: Object
    }
  },
  components: {
    ActionButton
  },
  data(){
    return {
      isLoading: false
    }
  },
  methods: {
    deleteProduct(id){
      this.isLoading = true
      this.$store.dispatch('product/deleteProduct', id)
        .then(() => {
          this.isLoading = false
          $('#deleteProductModal').modal('hide')
        })
    }
  },
  mounted(){
    // 由父層v-if動態決定是否生成該組件，當生成完畢即自動開啟
    $('#deleteProductModal').modal('show')
    // 關閉完成後摧毀該組件
    $('#deleteProductModal').on('hidden.bs.modal', () => {
      this.$emit('modalHidden')
    })
  }
}
</script>

<style>

</style>
