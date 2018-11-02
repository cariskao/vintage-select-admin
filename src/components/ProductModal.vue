<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{modalTitle}}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                  placeholder="請輸入圖片連結"
                  v-model="productData.imageUrl"
                >
              </div>
              <div class="form-group">
                <label for="customFile">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control"
                  ref="files">
              </div>
              <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid" alt="">
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title"
                  placeholder="請輸入標題"
                  v-model="productData.title"
                >
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category"
                    placeholder="請輸入分類"
                    v-model="productData.category"
                  >
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位</label>
                  <input type="unit" class="form-control" id="unit"
                    placeholder="請輸入單位"
                    v-model="productData.unit"
                  >
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                  <input type="number" class="form-control" id="origin_price"
                    placeholder="請輸入原價"
                    v-model.number="productData.origin_price"
                  >
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" id="price"
                    placeholder="請輸入售價"
                    v-model.number="productData.price"
                  >
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea type="text" class="form-control" id="description"
                  placeholder="請輸入產品描述"
                  v-model="productData.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                  placeholder="請輸入產品說明內容"
                  v-model="productData.content"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                    id="is_enabled"
                    v-model="productData.is_enabled"
                    :true-value="1"
                    :false-value="0"
                  >
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" >取消</button>
          <button type="button" class="btn btn-primary"
            @click="confirm"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const productDataTemplate = {
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '',
  image: '',
  description: '',
  content: '',
  is_enabled: 0,
  imageUrl: ''
}

import $ from 'jquery'
export default {
  props: {
    operateType: {
      type: String,
      validator(string){
        return ['add', 'edit'].indexOf(string) !== -1
      }
    },
    propData: {
      type: Object,
      default(){
        return productDataTemplate
      } 
    }
  },
  data(){
    return {
      productData: {...this.propData}
    }
  },
  computed: {
    id(){
      return `${this.operateType}ProductModal`
    },
    modalTitle(){
      return this.operateType === 'add'
        ? '新增產品'
        : '編輯產品'
    }
  },
  methods: {
    clearData(){
      
    },
    cancel(){
      console.log('取消');
    },
    confirm(){
      console.log('確定' + this.operateType)

      this.$store.dispatch(`${this.operateType}Product`, this.productData)
        .then(
          () => $(`#${this.operateType}ProductModal`).modal('hide')
        )
    }
  },
  // 偵聽上層組件若有傳入prop即表示要編輯商品
  watch: {
    propData(){
      this.productData = {...this.propData}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
