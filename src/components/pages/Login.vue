<template>
  <div>
    <form class="form-signin" @submit.prevent="signIn">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
        v-model="user.username"
      >

      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
        v-model="user.password"
      >
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-block" type="submit"
        :class="btnClass"
      >
        {{signInLabel}}
        <v-icon name="spinner" scale="1.2" pulse
          v-if="isLoading"
        />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  computed: {
    btnClass(){
      return {
        'btn-primary': !this.isLoading,
        'btn-secondary': this.isLoading,
        'disabled': this.isLoading
      }
    },
    signInLabel(){
      return this.isLoading === true
        ? '登入中'
        : '登入'
    }
  },
  methods: {
    signIn(){
      const API = `${process.env.API_PATH}/admin/signin`
      this.isLoading = true
      this.$http.post(API, this.user)
        .then(
          ({data}) => {
            console.log(data)
            this.isLoading = false
            
            if(data.success){
              this.$router.push('/admin/products')
            }else{
              alert('登入失敗！請確認帳號密碼是否有誤')
            }
          }
        )
    },
  }
}
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
