<template>
  <Button
    :class="btnclass"
  >
    <v-icon v-if="isLoading" name="spinner" pulse/>
    <span :class="showLoading">{{btnLabel}}</span>
  </Button>
</template>

<script>
export default {
  props: {
    btnClass: {
      type: String
    },
    btnLabel: {
      type: String
    },
    isLoading: {
      type: Boolean
    }
  },
  computed: {
    showLoading(){
      return {
        transparent: this.isLoading
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.transparent {
  opacity: 0;
}
</style>
