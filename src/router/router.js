import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/pages/Login'



export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
