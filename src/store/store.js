import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import axios from 'axios'
import router from '@/router/router'
Vue.use(Vuex)

// 開啟 axios 請求繫帶cookie
// axios.defaults.withCredentials = true

export default new Store({
  state: {
    products: [],
  },
  getters: {

  },
  mutations: {
    setProducts(state, data){
      state.products = data
    }
  },
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

            // return new Promise((resolve, reject) => {
            //   if(data.success){
            //     resolve()
            //   }
            // })
          }
        )
    },
    getProducts({commit}){
      const API = `
        ${process.env.API_PATH}/api/${process.env.CUSTOM_API_PATH}/admin/products
      `
      axios.get(API)
        .then(
          ({data: {products} }) => {
            console.log(products)          
            commit('setProducts', products)
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
      axios.delete(API)
        .then(
          ({data}) => {
            if(data.success){
              console.log('in vuex', data)
              dispatch('getProducts')
            }else{
              console.log('in vuex', data.message)
            }
          }
        )
        .catch(e => console.error(e))
    }
  }
})