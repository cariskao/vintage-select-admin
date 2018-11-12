import axios from 'axios'
import router from '@/router/router'

export default {
  namespaced: true,
  state: {
    isSignInLoading: false
  },
  mutations: {
    setSignInLoading(state, boolean){
      state.isSignInLoading = boolean
    }
  },
  actions: {
    signIn({commit}, user){
      const API = `
        ${process.env.API_PATH}/admin/signin
      `
      commit('setSignInLoading', true)
      axios.post(API, user)
        .then( ({data}) => {
          console.log('sign in', data)

          if(data.success){
            router.push('/admin/products')
          }else{
            alert('登入失敗！請確認帳號密碼是否有誤')
          }
          commit('setSignInLoading', false)
        })
    },
    logOut(){
      const API = `
        ${process.env.API_PATH}/logout
      `
      axios.post(API)
        .then( ({data}) => {
          console.log('logOut', data);
          
          if(data.success){
            router.push('/login')
          }
        })
    },
    checkAdminUser(){
      const API = `
        ${process.env.API_PATH}/api/user/check
      `
      return new Promise((resolve, reject) => {   
        axios.post(API)
          .then( ({data}) => {
            if(data.success){
              resolve('驗證成功')
            }else{
              reject('驗證失敗！請重新登入！')
            }
          })
      })
    }
  }
}