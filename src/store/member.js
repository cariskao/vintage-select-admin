import axios from 'axios'
import router from '@/router/router'

export default {
  namespaced: true,
  actions: {
    logOut(){
      const API = `
        ${process.env.API_PATH}/logout
      `
      axios.post(API)
        .then( ({data}) => {
          console.log(data);
          
          if(data.success){
            router.push('/login')
          }
        })
    },
  }
}