import Vue from 'vue'
import Vuex, {Store} from 'vuex'
Vue.use(Vuex)

// 匯入自訂模組
import adminUser from './adminUser'
import alert from './alert'
import product from './product'
import coupon from './coupon'
import order from './order'
import shopping from './shopping'

export default new Store({
  modules: {
    alert,
    product,
    coupon,
    order,
    adminUser,
    shopping
  },
})