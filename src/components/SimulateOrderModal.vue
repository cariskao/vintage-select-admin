<template>
  <div class="modal fade" id="SimulateOrderModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{productInfo.title}}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img class="img-fluid" alt=""
            :src="productInfo.imageUrl"  
          >
          <h3 class="mt-4 font-italic">{{ productInfo.category.brand }}</h3>
          <hr>
          <blockquote class="blockquote mt-3">
            <p class="mb-0">{{ productInfo.description }}</p>
            <footer class="blockquote-footer text-right mt-2">
              <pre class="pre">
                {{productInfo.content}}
              </pre>
            </footer>
          </blockquote>

          <div class="d-flex justify-content-between align-items-baseline">
            <template v-if="productInfo.price">
              <del class="h6">{{ productInfo.origin_price | currency }}</del>
              <div class="h4">
                <span class="font-italic">sale</span> {{ productInfo.price | currency }}
              </div>
            </template>
            <div class="h4" v-else>{{ productInfo.origin_price }} 元</div>
          </div>
            
          <div>
            <select name="" class="form-control" mt-3
              v-model="qty"
            >
              <option
                v-for="i in productInfo.amount"
                :key="i"
                :value="i"
              >
                選購 {{ i }} {{productInfo.unit}}
              </option>
            </select>
          </div>
          
        </div>
        <div class="modal-footer">
          <div class="text-muted text-nowrap mr-3">
            小計 <strong>{{totalPrice}}</strong> 元
          </div>
          <ActionButton
            colorStyle="primary"
            btnLabel="加到購物車"
            :isLoading="isLoading"
            @click.native="addToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
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
      qty: 1, //quantity
      isLoading: false
    }
  },
  computed: {
    totalPrice(){
      if(this.productInfo.price){
        return this.productInfo.price * this.qty
      }else{
        return this.productInfo.origin_price * this.qty
      }
    },
  },
  methods: {
    addToCart(){
      this.isLoading = true
      const product = {
        id: this.productInfo.id,
        qty: this.qty,        
      }
      this.$store.dispatch('shopping/addToCart', product)
        .then(() => {
          this.isLoading = false
          this.qty = 1
          $('#SimulateOrderModal').modal('hide')
        })
    }
  },
  mounted(){
    // 由父層v-if動態決定是否生成該組件，當生成完畢即自動開啟
    $('#SimulateOrderModal').modal('show')
    // modal組件生成時監聽關閉事件，以清空currentOperateType來摧毀該組件
    $('#SimulateOrderModal').on('hidden.bs.modal', () => {
      this.$emit('modalHidden')
    })
  }
}
</script>

<style lang="scss" scoped>
.pre {
  font-size: 100%;
}
</style>
