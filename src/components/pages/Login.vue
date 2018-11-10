<template>
  <div class="wrapper">
    <form class="form-signin" @submit.prevent="signIn(user)">
      <h1 class="h3 mb-3 font-weight-normal text-center">管理員登入</h1>
      <label for="inputEmail" class="sr-only">Email</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入使用者email"
        required
        autofocus
        v-model="user.username"
      >

      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入密碼"
        required
        v-model="user.password"
      >
      <button class="btn btn-lg btn-block mt-4" type="submit"
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
import { mapActions, mapState } from 'vuex'
import ActionButton from '@/components/ActionButton'
export default {
  components: {
    ActionButton
  },
  data(){
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('adminUser', {
      isLoading: 'isSignInLoading'
    }),
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
    ...mapActions('adminUser', ['signIn'])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
