<template>
  <!-- Login form -->
  <div class="row login_row">
    <div class="col-12 col-md-3">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" name="username" id="username" v-model="formData.username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" id="password" v-model="formData.password">
        </div>
        <button class="btn btn-dark">Login</button>
      </form>
    </div>
  </div>
  <!-- User alert/message (unsuccessful login) -->
  <div v-if="userAlert.show" class="row">
    <div class="col-3">
      <div class="alert alert-danger" role="alert">
        {{ userAlert.message }}
      </div>
    </div>
  </div>
  <!-- Link to registration page -->
  <div class="row">
    <div class="col">
      <router-link :to="{ name: 'Register' }" class="register_link">Register</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import UserService from '@/components/auth/user/UserService'
import LoginCommand from '@/components/auth/LoginCommand'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const auth = computed(() => store.getters.isUserAuthenticated)
    const userService: UserService = new UserService()
    const formData: LoginCommand = reactive(new LoginCommand())
    const userAlert = reactive({
      show: false,
      message: '',
      type: 'danger'
    })

    function submitForm() {
      loginUser(formData)
    }

    function loginUser(formData: LoginCommand): void {
      userService.loginUser(formData)
        .then(response => response.json())
        .then(data => {
          successfulLogin(data.token)
        })
        .catch(err => {
          userAlert.show = true
          userAlert.message = 'Login error: ' + err.message
        })
    }


    /**
     * Save user's details and auth data to vuex store, 
     *  check if user is admin, redirect to (user or admin) homepage
     **/
    function successfulLogin(jwtToken: string) {
      store.dispatch('setAuthenticated', true)
      store.dispatch('setToken', jwtToken)

      userService.getCurrentUser()
        .then(user => { 
          store.dispatch('setUser', user)
          store.getters.isUserAdmin ? router.push('/admin') : router.push('/')
        })
        .catch(err => {
          userAlert.show = true
          userAlert.message = 'Current user error: ' + err.message
        })
    }

    return {
      auth,
      formData,
      submitForm,
      userAlert
    }
  }
})
</script>

<style scoped>
  .login_row{
    margin-bottom: 20px;
  }
  .register_link {
    color: black;
  }
</style>