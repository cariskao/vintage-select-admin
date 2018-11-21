<template>
  <div class="col-md-4 mb-4">
    <div class="card border-0 shadow-sm">
      <div class="image"
        :style="image(productInfo.imageUrl)"
      >
      </div>
      <div class="card-body">
        <h6 class="font-italic">{{ productInfo.category.brand }}</h6>
        <span class="badge badge-secondary float-right ml-2">{{ productInfo.category.type }}</span>
        <h5 class="card-title">{{ productInfo.title }}</h5>
        <p class="card-text">{{ productInfo.description }}</p>
        <div class="d-flex justify-content-between align-items-baseline">
          <del class="h6" v-if="isSale">{{ productInfo.origin_price | currency}}</del>
          <div class="h5">
            <span class="font-italic" v-if="isSale">sale</span>
            {{ productInfo.price | currency }}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <ActionButton
          class="btn-block btn-lg"
          colorStyle="outline-secondary"
          btnLabel="購買商品"
          :isLoading="isLoading.checkDetail"
          @click.native="checkDetail( productInfo.id )"
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
          this.$emit('checkDetail')
        })
        .catch(() => this.isLoading.checkDetail = false)
    },
    image(url){
      return {
        backgroundImage: `url('${url}')`
      }
    }
  },
  computed: {
    isSale(){
      return this.productInfo.origin_price !== this.productInfo.price
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
