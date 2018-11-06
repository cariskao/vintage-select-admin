import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import axios from 'axios'
import router from '@/router/router'
Vue.use(Vuex)

// 開啟 axios 請求繫帶cookie
// axios.defaults.withCredentials = true


const alert = {
  namespaced: true,
  state: {
    messages: []
  },
  mutations: {
    pushMessage(state, message){
      state.messages.push(message)
    },
    removeMessage(state, index) {
      state.messages.splice(index, 1);
    }
  },
  actions: {
    updateMessage({commit, dispatch}, {message, status}) {
      const timestamp = Math.floor(new Date() / 1000);
      commit('pushMessage', {
        message,
        status,
        timestamp
      })
      // this.removeMessageWithTiming(timestamp);
      dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessageWithTiming({state, commit}, timestamp) {
      setTimeout(() => {
        state.messages.forEach((item, index) => {
          if (item.timestamp === timestamp) {
            commit('removeMessage', index)
          }
        })
      }, 3000);
    },
  }
}

const product = {
  namespaced: true,
  state: {
    products: [],
    pagination: {}
  },
  mutations: {
    setProducts(state, data){
      state.products = data
    },
    setPagination(state, pagination){
      state.pagination = pagination
    }
  },
  actions: {
    getProducts({commit}, page = 1){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/products?page=${page}
      `
      commit('loading/setPageLoading', true , {root: true} )
      axios.get(API)
        .then(
          ({data}) => {
            console.log(data)        

            commit('setProducts', data.products)
            commit('setPagination', data.pagination)
            commit('loading/setPageLoading', false , {root: true} )
          }
        )
    },
    addProduct({dispatch}, product){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/product
      `
      return axios.post(API, { data: product })
        .then(
          ({data}) => {

            dispatch('alert/updateMessage', {
              message: data.message,
              status: data.success === true
                ? 'success'
                : 'danger'
            }, { root: true})

            console.log('in vuex', data)
            dispatch('getProducts')
          }
        )
        .catch(
          e => {
            console.error(e)
          }
        )
    },
    editProduct({dispatch}, product){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/product/${product.id}
      `
      return axios.put(API, { data: product })
        .then(
          ({data}) => {

            dispatch('alert/updateMessage', {
              message: data.message,
              status: data.success === true
                ? 'success'
                : 'danger'
            }, { root: true})

            if(data.success){
              console.log('in vuex', data)
              dispatch('getProducts')
            }
          }
        )
        .catch(e => console.error(e))
    },
    deleteProduct({dispatch}, productId){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/product/${productId}
      `
      return axios.delete(API)
        .then(
          ({data}) => {
            // 指派 Alert 的方法
            dispatch('alert/updateMessage', {
              message: data.message,
              status: data.success === true
                ? 'success'
                : 'danger'
            }, { root: true})

            if(data.success){
              console.log('in vuex', data)
              dispatch('getProducts')
            }else{
              console.log('in vuex', data.message)
            }
          }
        )
        .catch(e => console.error(e))
    },
  }
}

const loading = {
  namespaced: true,
  state: {
    isPageLoading: false
  },
  mutations: {
    setPageLoading(state, boo){
      state.isPageLoading = boo
    }
  },
}


const member = {
  namespaced: true,
  actions: {
    logOut(){
      const API = `${process.env.API_PATH}/logout`
      axios.post(API)
        .then(
          ({data}) => {
            console.log(data);
            
            if(data.success){
              router.push('/login')
            }
          }
        )
    },
  }
}


export default new Store({
  modules: {
    alert,
    product,
    member,
    loading
  },
})