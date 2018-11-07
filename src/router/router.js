import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/components/pages/Login'
import Dashboard from '@/components/Dashboard'
import SimulateOrder from '@/components/pages/SimulateOrder'
import Products from '@/components/pages/Products'

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
          },
        }
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