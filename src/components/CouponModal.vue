<template>
  <div class="modal fade" id="operateCouponModal" tabindex="-1" role="dialog"
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
          <div class="form-group">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title"
              placeholder="請輸入標題"
              v-model="couponData.title"
            >
          </div>

          <div class="form-group">
            <label for="category">折扣</label>
            <input type="number" class="form-control" id="category"
              placeholder="請輸入折扣百分比"
              v-model.number="couponData.percent"
            >
          </div>
          <div class="form-group">
            <label for="category">代碼</label>
            <input type="text" class="form-control" id="category"
              placeholder="請輸入優惠券代碼"
              v-model.trim="couponData.code"
            >
          </div>
          <div class="form-group">
            <label for="category">到期日</label>
            <VueDatepickerLocal
              class="test"
              v-model="couponData.due_date"
              inputClass="form-control"
              placeholder="請輸入到期日"
              :disabled="false"
            />
          </div>

          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                id="is_enabled"
                v-model="couponData.is_enabled"
                :true-value="1"
                :false-value="0"
              >
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
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
import VueDatepickerLocal from 'vue-datepicker-local'
import ActionButton from '@/components/ActionButton'
export default {
  props: {
    operateType: {
      type: String,
      validator: string => ['add', 'edit'].indexOf(string) !== -1
    },
    couponInfo: {
      type: Object,
      default(){
        return this.$store.state.coupon.couponTemplate
      }
    }
  },
  components: {
    ActionButton,
    VueDatepickerLocal
  },
  data(){
    return {
      couponData: { ...this.couponInfo },
      isLoading: false,
    }
  },
  computed: {
    modalTitle(){
      return this.operateType === 'add'
        ? '新增優惠券'
        : '編輯優惠券'
    }
  },
  methods: {
    confirm(){
      console.log('確定' + this.operateType)

      if(this.couponData.percent < 1 || this.couponData.percent > 100){
        this.$store.dispatch('alert/updateMessage', {
          message: '請輸入1~100間的折扣比',
          status: 'danger'
        })
        return
      }

      this.isLoading = true
      // 轉換時間格式給後端
      const data = { ...this.couponData }
      data.due_date = data.due_date.getTime() / 1000

      this.$store.dispatch(`coupon/${this.operateType}Coupon`, data)
        .then(() => {
          this.isLoading = false
          $('#operateCouponModal').modal('hide')
        })
    }
  },
  mounted(){
    // 由父層v-if動態決定是否生成該組件，當生成完畢即自動開啟
    $('#operateCouponModal').modal('show')
    // modal組件生成時監聽關閉事件，以清空currentOperateType來摧毀該組件
    $('#operateCouponModal').on('hidden.bs.modal', () => {
      this.$emit('modalHidden')
    })
  }
}
</script>

<style lang="scss">
.datepicker {
  display: block !important;

  .form-control[readonly] {
    background: #fff;
  }
}
</style>
