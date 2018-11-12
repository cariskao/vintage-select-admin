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
    adminUser,
    alert,
    product,
    coupon,
    order,
    shopping
  },
})

// ----- guildline -----
// adminUser   帳號與驗證操作
// alert       錯誤訊息
// product     商品管理
// coupon      優惠券管理
// order       訂單管理
// shopping    客戶購物

// action中，較大的loading狀態寫成一個state
// 其餘皆 return axios的promise，給外層組件做小讀取操作
// 特殊狀況自訂return Promise