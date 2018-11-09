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
                  <v-icon name="spinner" pulse
                    v-if="isUploadingLoading"
                  />
                </label>
                <input type="file" id="customFile" class="form-control"
                  ref="file"
                  @change="uploadFile"
                >
              </div>
              <img class="img-fluid"
                v-if="productData.imageUrl"
                :src="productData.imageUrl"
              >
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
          <ActionButton
            colorStyle="primary"
            btnLabel="確認"
            :isLoading="isLoading"
            @click.native="confirm"
          />
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
import ActionButton from '@/components/ActionButton'
export default {
  props: {
    operateType: {
      type: String,
      validator: string => ['add', 'edit'].indexOf(string) !== -1
    },
    productInfo: {
      type: Object,
      default(){
        return productDataTemplate
      }
    }
  },
  components: {
    ActionButton
  },
  data(){
    return {
      productData: { ...this.productInfo },
      isLoading: false,
      isUploadingLoading: false,
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
      this.productData = { ...productDataTemplate }
    },
    uploadFile(){
      this.isUploadingLoading = true
      const uploadedFile = this.$refs.file.files[0]
      console.log(uploadedFile)
      
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const API = `${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/upload`
      this.$http.post(API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(
          ({data}) => {
            this.isUploadingLoading = false
            if(data.success){
              this.$set(this.productData, 'imageUrl', data.imageUrl)
            }
          }
        )
    },
    cancel(){
      console.log('取消');
      // this.clearData()
    },
    confirm(){
      console.log('確定' + this.operateType)
      this.isLoading = true
      this.$store.dispatch(`product/${this.operateType}Product`, this.productData)
        .then(() => {
          this.isLoading = false
          $(`#${this.operateType}ProductModal`).modal('hide')
        })
    }
  },
  // 偵聽上層組件若有注入prop即表示要編輯商品
  watch: {
    productInfo(){
      this.productData = {...this.productInfo}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
