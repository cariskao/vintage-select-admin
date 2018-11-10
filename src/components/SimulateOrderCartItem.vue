<template>
  <tr>
    <td class="align-middle">
      <ActionButton
        colorStyle="outline-danger"
        :isLoading="isDateleItemLoading"
        @click.native="deleteCartItem( cartItemInfo.id )"
      >
        <v-icon name="trash-alt"/>
      </ActionButton>
    </td>
    <td class="align-middle">
      {{ cartItemInfo.product.title }}
      <div class="text-success" v-if="cartItemInfo.coupon">
        已套用優惠券
      </div>
    </td>
    <td class="align-middle">{{ cartItemInfo.qty }}/{{ cartItemInfo.product.unit }}</td>
    <td class="align-middle text-right">{{ cartItemInfo.final_total | currency }}</td>
  </tr>
</template>

<script>
import ActionButton from '@/components/ActionButton'
export default {
  props: {
    cartItemInfo: {
      type: Object
    }
  },
  components: {
    ActionButton
  },
  data(){
    return {
      isDateleItemLoading: false
    }
  },
  methods: {
    deleteCartItem(id){
      this.isDateleItemLoading = true
      this.$store.dispatch('shopping/deleteCartItem', id)
        .then(() => this.isDateleItemLoading = false)
    }
  }
}
</script>

<style>

</style>
