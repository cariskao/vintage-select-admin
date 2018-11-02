<template>
  <tr>
    <td>{{productInfo.category}}</td>
    <td>{{productInfo.title}}</td>
    <td class="text-right">{{productInfo.origin_price}}</td>
    <td class="text-right">{{productInfo.price}}</td>
    <td :class="enabledColor">{{enabledSpan}}</td>
    <td>
      <button class="btn btn-outline-primary btn-sm"
        @click="editProduct(productInfo)"
      >編輯</button>
      <button class="btn btn-outline-danger btn-sm"
        @click="deleteProduct(productInfo)"
      >刪除</button>
    </td>
  </tr>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    productInfo: {
      type: Object
    }
  },
  computed: {
    enabledSpan(){
      return this.productInfo.is_enabled === 1
        ? '啟用'
        : '停用'
    },
    enabledColor(){
      return {
        'text-success': this.productInfo.is_enabled === 1
      }
    }
  },
  methods: {
    editProduct(productInfo){
      console.log(productInfo)
      this.$emit('editProduct', productInfo)
    },
    deleteProduct(productInfo){
      this.$emit('deleteProduct', productInfo)
    },
  }
}
</script>

<style>

</style>
