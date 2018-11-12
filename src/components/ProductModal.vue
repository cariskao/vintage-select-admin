<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ modalTitle }}</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="title">名稱</label>
                <input type="text" class="form-control" id="title"
                  placeholder="請輸入商品名稱"
                  v-model="productData.title"
                >
              </div>
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
              <div class="form-row">
                <div class="form-group col-md-6">
                <label for="title">品牌</label>
                <input type="text" class="form-control" id="title"
                  placeholder="請輸入品牌"
                  v-model="productData.category.brand"
                >
              </div>
                <div class="form-group col-md-6">
                  <label for="size">數量</label>
                  <input type="number" class="form-control" id="size"
                    placeholder="請輸入數量"
                    v-model.number="productData.amount"
                  >
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category"
                    placeholder="請輸入分類"
                    v-model="productData.category.type"
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
                <label for="description">商品介紹</label>
                <textarea type="text" class="form-control" id="description"
                  placeholder="請輸入產品描述"
                  v-model="productData.description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">商品備註</label>
                <textarea type="text" class="form-control" id="content"
                  rows="3"
                  placeholder="請輸入商品備註"
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
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
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
import $ from 'jquery'
import cloneDeep from 'lodash/clonedeep'  // template中有多層物件，故用深層複製
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
        return this.$store.state.product.productTemplate
      }
    }
  },
  components: {
    ActionButton
  },
  data(){
    return {
      productData: cloneDeep(this.productInfo), // 每次都複製新物件參考，確保不會改到template
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
    uploadFile(){
      this.isUploadingLoading = true
      const uploadedFile = this.$refs.file.files[0]      
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)

      const API = `${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/upload`
      this.$http.post(API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then( ({data}) => {
          this.isUploadingLoading = false

          this.$store.dispatch('alert/updateMessage', {
            message: data.success === true
              ? '上傳圖片成功'
              : '上傳圖片失敗'
            ,
            status: data.success === true
              ? 'success'
              : 'danger'
          })

          if(data.success){
            this.$set(this.productData, 'imageUrl', data.imageUrl)
          }
        })
        .catch( (err) => {
          this.isUploadingLoading = false
          console.error(err)
        })
    },
    confirm(){
      console.log('確定' + this.operateType)

      if(this.productData.price > this.productData.origin_price){
        this.$store.dispatch('alert/updateMessage', {
          message: '原價不可小於特價',
          status: 'danger'
        })
        return
      }

      this.isLoading = true
      this.$store.dispatch(`product/${this.operateType}Product`, this.productData)
        .then(() => {
          this.isLoading = false
          $(`#${this.operateType}ProductModal`).modal('hide')
        })
    }
  },
  // 偵聽上層組件若有變更prop則更新data建立新物件參考
  watch: {
    productInfo(){
      this.productData = cloneDeep(this.productInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
