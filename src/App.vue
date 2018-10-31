<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>

    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>

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

