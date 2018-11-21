import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import SimulateOrder from '@/components/pages/SimulateOrder'
import SimulateOrderCheckout from '@/components/pages/SimulateOrderCheckout'
import Products from '@/components/pages/Products'
import Coupons from '@/components/pages/Coupons'
import Orders from '@/components/pages/Orders'

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
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
          component: Products,
          meta: {
            loginRequired: true
          }
        },
        {
          path: 'coupons',
          component: Coupons,
          meta: {
            loginRequired: true
          }
        },
        {
          path: 'orders',
          component: Orders,
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
        {
          path: 'simulate_order/:orderId',
          component: SimulateOrderCheckout,
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