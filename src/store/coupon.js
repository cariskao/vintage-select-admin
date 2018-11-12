import axios from 'axios'

export default {
  namespaced: true,
  state: {
    coupons: [],
    pagination: {},
    isPageLoading: false
  },
  mutations: {
    setCoupons(state, coupons){
      state.coupons = coupons
    },
    setPagination(state, pagination){
      state.pagination = pagination
    },
    setPageLoading(state, boolean){
      state.isPageLoading = boolean
    }
  },
  actions: {
    getCoupons({commit, dispatch}, page = 1){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/coupons?page=${page}
      `
      commit('setPageLoading', true)
      axios.get(API)
        .then( ({data}) => {
          console.log('getCoupons：', data)
          if(data.success){
            commit('setCoupons', data.coupons)
            commit('setPagination', data.pagination)
          }else{
            dispatch('alert/updateMessage', {
              message: data.message,
              status: 'danger'
            }, { root: true})
          }
          commit('setPageLoading', false)
        })
    },
    addCoupon({dispatch}, coupon){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/coupon
      `
      return axios.post(API, {data: coupon})
        .then( ({data}) => {
          console.log(data)

          dispatch('getCoupons')
        })
    },
    editCoupon({dispatch}, coupon){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/coupon/${coupon.id}
      `
      return axios.put(API, {data: coupon})
        .then( ({data}) => {
          console.log(data)

          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          dispatch('getCoupons')
        })

    },
    deleteCoupon({dispatch}, id){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/coupon/${id}
      `
      return axios.delete(API)
        .then( ({data}) => {
          console.log(data)

          dispatch('alert/updateMessage', {
            message: data.message,
            status: data.success === true
              ? 'success'
              : 'danger'
          }, { root: true})

          dispatch('getCoupons')
        })
    }
  }
}