import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    pagination: {},
    isPageLoading: false
  },
  mutations: {
    setProducts(state, data){
      state.products = data
    },
    setPagination(state, pagination){
      state.pagination = pagination
    },
    setPageLoading(state, boolean){
      state.isPageLoading = boolean
    }
  },
  actions: {
    getProducts({commit, dispatch}, page = 1){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/products?page=${page}
      `
      commit('setPageLoading', true)
      axios.get(API)
        .then( ({data}) => {
          console.log('getProducts：', data)
          if(data.success){
            commit('setProducts', data.products)
            commit('setPagination', data.pagination)
          }else{
            dispatch('alert/updateMessage', {
              message: data.message,
              status: 'danger'
            }, { root: true})
          }
          commit('setPageLoading', false)
        })
        .catch(err => {
          console.error(err)
          commit('setPageLoading', false)
        })
    },
    addProduct({dispatch}, product){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/product
      `
      return axios.post(API, { data: product })
        .then( ({data}) => {

          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          console.log(data)
          dispatch('getProducts')
        })
        .catch(err => console.error(err))
    },
    editProduct({dispatch}, product){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/product/${product.id}
      `
      return axios.put(API, { data: product })
        .then( ({data}) => {

          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          if(data.success){
            console.log(data)
            dispatch('getProducts')
          }
        })
        .catch(err => console.error(err))
    },
    deleteProduct({dispatch}, productId){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/product/${productId}
      `
      return axios.delete(API)
        .then( ({data}) => {
          // 指派 Alert 的方法
          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          if(data.success){
            console.log(data)
            dispatch('getProducts')
          }else{
            console.log(data.message)
          }
        })
        .catch(err => console.error(err))
    },
  }
}