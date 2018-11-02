import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/components/pages/Login'
import Admin from '@/components/pages/Admin'
import ProductList from '@/components/ProductList'

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      redirect: '/admin/products',
      component: Admin,
      meta: {
        loginRequired: true
      },
      children: [
        {
          path: 'products',
          alias: 'productlist',
          component: ProductList,
          meta: {
            loginRequired: true
          },
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})

export default router