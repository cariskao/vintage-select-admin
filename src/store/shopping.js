import axios from 'axios'
import router from '../router/router'

export default {
  namespaced: true,
  state: {
    products: [],
    product:{
      category: {
        brand: '',
        type: ''
      }
    },
    pagination: {},
    isPageLoading: false,
    cart: {
      carts: []
    },
    checkoutOrder: {
      user: {},
      products: []
    }
  },
  getters: {
    enabledProducts(state){
      return state.products.filter( ({is_enabled}) => is_enabled === 1)
    }
  },
  mutations: {
    setProduct(state, data){
      state.product = data
    },
    setProducts(state, data){
      state.products = data
    },
    setPagination(state, pagination){
      state.pagination = pagination
    },
    setCart(state, cart){
      state.cart = cart
    },
    setCheckoutOrder(state, order){
      state.checkoutOrder = order
    },
    setPageLoading(state, boolean){
      state.isPageLoading = boolean
    }
  },
  actions: {
    getProducts({commit}, page = 1){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/products?page=${page}
      `
      commit('setPageLoading', true)
      axios.get(API)
        .then( ({data}) => {
          console.log('getProducts', data)        

          commit('setProducts', data.products)
          commit('setPagination', data.pagination)
          commit('setPageLoading', false)
        })
        .catch(err => {
          console.error(err)
          commit('setPageLoading', false)
        })
    },
    getProduct({commit, dispatch}, id){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/product/${id}
      `
      // 因為可能產品未啟用所以才這樣寫
      // 彈窗在觸發在page組件，用promise處理是否開啟彈窗
      return new Promise((resolve, reject) => {
        axios.get(API)
          .then( ({data}) => {
            console.log(data)
            if(data.success){
              commit('setProduct', data.product)
              resolve()
            }else{
              dispatch('alert/updateMessage', {
                message: data.message,
                status: 'danger'
              }, {root: true})
              reject(data.message)
            }
          })
          .catch(err => reject(err))
      })
    },
    addToCart({dispatch}, {id, qty = 1}){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/cart
      `
      const product = {
        'product_id': id,
        qty
      }

      return axios.post(API, { data: product })
        .then( ({data}) => {
          console.log(data)

          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          dispatch('getCart')
        })
        .catch(err => console.error(err))
    },
    getCart({commit}){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/cart
      `
      commit('setPageLoading', true)
      axios.get(API)
        .then( ({data}) => {
          console.log('購物車資訊', data.data)
          commit('setCart', data.data)
          commit('setPageLoading', false)
        })
        .catch(err => {
          console.error(err)
          commit('setPageLoading', false)
        })
    },
    deleteCartItem({dispatch}, cartItemId){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/cart/${cartItemId}
      `
      return axios.delete(API)
        .then( ({data}) => {

          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          dispatch('getCart')
        })
        .catch(err => console.error(err))
    },
    useCoupon({dispatch}, couponCode){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/coupon
      `
      const coupon = {
        code: couponCode
      }

      return axios.post(API, { data: coupon } )
        .then( ({data}) => {
          console.log(data)
          
          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          if(data.success){
            dispatch('getCart')
          }
        })
        .catch(err => console.error(err))
    },
    createOrder({commit, dispatch}, order){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/order
      `
      commit('setPageLoading', true)
      return axios.post(API, {data: order} )
        .then( ({data}) => {
          console.log(data)

          commit('setPageLoading', false)

          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          if(data.success){
            router.push(`/simulate_order/${data.orderId}`)
          }
        })
        .catch(err => console.error(err))
    },
    getOrder({commit}, orderId){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/order/${orderId}
      `
      commit('setPageLoading', true)
      axios.get(API)
        .then( ({data}) => {
          console.log(data)

          commit('setCheckoutOrder', data.order)
          commit('setPageLoading', false)
        })
        .catch(err => {
          console.error(err)
          commit('setPageLoading', false)
        })
    },
    payOrder({commit, dispatch}, orderId){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/pay/${orderId}
      `
      commit('setPageLoading', true)
      axios.post(API)
        .then( ({data}) => {
          console.log(data)

          if(data.success){
            dispatch('getOrder', orderId)
          }
          commit('setPageLoading', false)
        })
        .catch(err => {
          console.error(err)
          commit('setPageLoading', false)
        })
    }
  }
}