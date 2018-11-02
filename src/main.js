// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
Vue.use(VueAxios, axios)

// 開啟 axios 請求繫帶cookie
axios.defaults.withCredentials = true

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
  console.log('to', to)
  console.log('from', from)
  console.log('next', next)

  if(to.meta.loginRequired){
    console.log('此頁面需驗證登入')

    const API = `${process.env.API_PATH}/api/user/check`
    axios.post(API)
      .then(
        ({data}) => {
          if(data.success){
            next()
          }else{
            alert('錯誤！請重新登入')
            next({
              path: '/login'
            })
          }
        }
      )
      .catch(e => {
        console.error(e)
      })
  }else{
    next()
  }
  
})