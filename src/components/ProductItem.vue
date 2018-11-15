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
        @click="operateProduct('edit')"
      >編輯</button>
      <button class="btn btn-outline-danger btn-sm"
        @click="operateProduct('delete')"
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
    operateProduct(type){
      this.$emit(`${type}Product`, {
        data: this.productInfo,
        type
      })
    }
  }
}
</script>

<style>

</style>
