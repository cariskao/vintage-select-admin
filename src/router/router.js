import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import SimulateOrder from '@/components/pages/SimulateOrder'
import Products from '@/components/pages/Products'
import Coupons from '@/components/pages/Coupons'

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/admin',
      redirect: '/admin/products',
      component: Dashboard,
      meta: {
        loginRequired: true
      },
      children: [
        {
          path: 'products',
          alias: 'product',
          component: Products,
          meta: {
            loginRequired: true
          }
        },
        {
          path: 'coupons',
          alias: 'coupon',
          component: Coupons,
          meta: {
            loginRequired: true
          }
        },
      ]
    },

    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: 'simulate_order',
          component: SimulateOrder,
        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})

export default router