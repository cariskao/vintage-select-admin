import Vue from 'vue'
import Vuex, {Store} from 'vuex'
Vue.use(Vuex)

// 匯入自訂模組
import member from './member'
import alert from './alert'
import product from './product'
import coupon from './coupon'
import shopping from './shopping'

export default new Store({
  modules: {
    alert,
    product,
    coupon,
    member,
    shopping
  },
})