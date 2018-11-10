<template>
  <tr>
    <td>{{ time }}</td>
    <td>{{ orderInfo.user.email }}</td>
    <td>
      <div
        v-for="item in orderInfo.products"
        :key="item.id"
      >
        {{ item.product.title }} 數量：{{ item.qty }}{{ item.product.unit }}
      </div>
    </td>
    <td>{{ orderInfo.total | currency }}</td>
    <td :class="paidColor">{{ paidSpan }}</td>
    <td>
      <button class="btn btn-outline-primary btn-sm"
        @click="editOrder"
      >修改</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    orderInfo: {
      type: Object
    }
  },
  computed: {
    paidSpan(){
      return this.orderInfo.is_paid === true
        ? '已付款'
        : '尚未付款'
    },
    paidColor(){
      return {
        'text-success': this.orderInfo.is_paid === true
      }
    },
    time(){
      const time = new Date(this.orderInfo.create_at * 1000)
      return `${ time.getFullYear() }年${ time.getMonth() + 1 }月${ time.getDate() }日`
    }
  },
  methods: {
    editOrder(){

    }
  }
}
</script>

<style>

</style>
