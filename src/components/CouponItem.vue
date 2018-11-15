<template>
  <tr>
    <td>{{couponInfo.title}}</td>
    <td>{{couponInfo.percent}} %</td>
    <td>{{time}}</td>
    <td :class="enabledColor">{{enabledSpan}}</td>
    <td>
      <button class="btn btn-outline-primary btn-sm"
        @click="operateCoupon('edit')"
      >編輯</button>
      <button class="btn btn-outline-danger btn-sm"
        @click="operateCoupon('delete')"
      >刪除</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    couponInfo: {
      type: Object
    }
  },
  computed: {
    enabledSpan(){
      return this.couponInfo.is_enabled === 1
        ? '啟用'
        : '停用'
    },
    enabledColor(){
      return {
        'text-success': this.couponInfo.is_enabled === 1
      }
    },
    time(){
      const time = new Date(this.couponInfo.due_date * 1000)
      return `${ time.getFullYear() }年${ time.getMonth() + 1 }月${ time.getDate() }日`
    }
  },
  methods: {
    editCoupon(){
      const data = {...this.couponInfo}
      // 手動修改為日期格式才可正確填入
      data.due_date = new Date(data.due_date * 1000)

      this.$emit('editCoupon', data)
    },
    deleteCoupon(){
      this.$emit('deleteCoupon', this.couponInfo)
    },
    operateCoupon(type){
      const data = { ...this.couponInfo }
      // 手動修改為日期格式才可正確填入
      data.due_date = new Date(data.due_date * 1000)

      this.$emit(`${type}Coupon`, {
        data,
        type
      })
    }
  }
}
</script>

<style>

</style>
