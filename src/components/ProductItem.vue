<template>
  <tr>
    <td>{{ productInfo.category.brand }}</td>
    <td>{{ productInfo.title }}</td>
    <td>{{ productInfo.category.type }}</td>
    <td>{{ productInfo.amount }}</td>
    <td class="text-right">{{ productInfo.origin_price | currency }}</td>
    <td class="text-right">{{ productInfo.price | currency }}</td>
    <td :class="enabledColor">{{ enabledSpan }}</td>
    <td>
      <button class="btn btn-outline-primary btn-sm"
        @click="editProduct"
      >編輯</button>
      <button class="btn btn-outline-danger btn-sm"
        @click="deleteProduct"
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
    editProduct(){
      this.$emit('editProduct', this.productInfo)
    },
    deleteProduct(){
      this.$emit('deleteProduct', this.productInfo)
    },
  }
}
</script>

<style>

</style>
