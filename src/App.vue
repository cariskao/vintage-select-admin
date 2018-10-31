<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const API = `${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/products`

    this.$http.get(API)
      .then(response => console.log(response))
  },
}
</script>

<style lang="scss">
@import '@/assets/all.scss';
</style>

