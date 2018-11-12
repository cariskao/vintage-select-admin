import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: [],
    pagination: {},
    isPageLoading: false
  },
  mutations: {
    setOrders(state, orders){
      state.orders = orders
    },
    setPagination(state, pagination){
      state.pagination = pagination
    },
    setPageLoading(state, boolean){
      state.isPageLoading = boolean
    }
  },
  actions: {
    getOrders({commit, dispatch}, page = 1){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/orders?page=${page}
      `
      commit('setPageLoading', true)
      axios.get(API)
        .then( ({data}) => {
          console.log('getOrders', data)
          if(data.success){
            commit('setOrders', data.orders)
            commit('setPagination', data.pagination)
          }else{
            dispatch('alert/updateMessage', {
              message: data.message,
              status: 'danger'
            }, { root: true})
          }
          commit('setPageLoading', false)
        })
        .catch((err) => {
          console.error(err)
          commit('setPageLoading', false)
        })
    }
  }
}