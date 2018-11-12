<template>
  <div class="col-md-4 mb-4">
    <div class="card border-0 shadow-sm">
      <div class="image"
        :style="image(productInfo.imageUrl)"
      >
      </div>
      <div class="card-body">
        <h6 class="font-italic">{{ productInfo.category.brand }}</h6>
        <span class="badge badge-secondary float-right ml-2">{{ productInfo.category.class }}</span>
        <h5 class="card-title">{{ productInfo.title }}</h5>
        <p class="card-text">{{ productInfo.content }}</p>
        <div class="d-flex justify-content-between align-items-baseline">
          <del class="h6">原價 {{ productInfo.origin_price }} 元</del>
          <div class="h5">特價 {{ productInfo.price }} 元</div>
        </div>
      </div>
      <div class="card-footer d-flex">
        <ActionButton
          colorStyle="outline-secondary"
          btnLabel="查看更多"
          :isLoading="isLoading.checkDetail"
          @click.native="checkDetail( productInfo.id )"
        />
        <ActionButton
          class="ml-auto"
          colorStyle="outline-danger"
          btnLabel="加到購物車"
          :isLoading="isLoading.addToCart"
          @click.native="addToCart( {id: productInfo.id} )"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      isLoading: {
        checkDetail: false,
        addToCart: false
      }
    }
  },
  methods: {
    ...mapActions('shopping', ['addToCart']),
    checkDetail(id){
      this.isLoading.checkDetail = true
      this.$store.dispatch('shopping/getProduct', id)
        .then(() => {
          this.isLoading.checkDetail = false
          this.$emit('checkDetail', id)
        })
        .catch(() => this.isLoading.checkDetail = false)
    },
    addToCart(product){
      this.isLoading.addToCart = true
      this.$store.dispatch('shopping/addToCart', product)
        .then(() => this.isLoading.addToCart = false)
        .catch(() => this.isLoading.checkDetail = false)
    },
    image(url){
      return {
        backgroundImage: `url('${url}')`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  height: 350px;
  background-position: center center;
  background-size: cover;
}
</style>
