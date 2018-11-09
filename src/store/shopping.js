import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    product:{},
    pagination: {},
    cart: {
      carts: []
    },
    isPageLoading: false
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
          console.log(data)        

          commit('setProducts', data.products)
          commit('setPagination', data.pagination)
          commit('setPageLoading', false)
        })
    },
    getProduct({commit, dispatch}, id){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/product/${id}
      `
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
    }
  }
}