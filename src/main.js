// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'bootstrap'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
  // 開啟 axios 請求繫帶cookie
axios.defaults.withCredentials = true
// ----------

// vue-loading-overlay
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
Vue.component('Loading', Loading)
// ----------

// vue-awesome
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/box-open'
import 'vue-awesome/icons/shopping-cart'
import 'vue-awesome/icons/money-bill-alt'
import 'vue-awesome/icons/credit-card'
import 'vue-awesome/icons/trash-alt'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)
// ----------

// vee-validate
// 幹林老師照文件調整語言沒用是殺小
import VeeValidate, {Validator} from 'vee-validate'
import zhTW from 'vee-validate/dist/locale/zh_TW'
Validator.localize('zh_TW', zhTW)
Vue.use(VeeValidate)

// 價格千分號filter
import currencyFilter from './filters/currency'
Vue.filter('currency', currencyFilter)


import App from './App'
import router from './router/router'
import store from './store/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 導航守衛
router.beforeEach( (to, from, next) => {
  console.log('導航守衛 to', to)
  console.log('導航守衛 from', from)

  if(to.meta.loginRequired){
    console.log('此頁面需驗證登入')

    store.dispatch('adminUser/checkAdminUser')
      .then(() => {
        next()
      },(errorMessage) => {
        alert(errorMessage)
        next({
          path: '/login'
        })
      })
  }else{
    next()
  }
})