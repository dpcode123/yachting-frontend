<template>
  <!-- Registration form -->
  <div class="row">
    <div class="col-3">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" name="username" id="username" v-model="formData.username" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" name="email" id="email" v-model="formData.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" id="password" v-model="formData.password" required>
        </div>
        <button class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
  <!-- User alert/message -->
  <div v-if="userAlert.show" class="row">
    <div class="col-3">
      <div 
        class="alert" 
        :class="{ 
          'alert-danger': userAlert.type === 'danger', 
          'alert-success': userAlert.type === 'success' 
        }" 
        role="alert">
          {{ userAlert.message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import RegisterCommand from '@/components/auth/RegisterCommand'
import UserService from '@/components/auth/user/UserService'

export default defineComponent({
  name: 'Register',
  setup() {
    const userService: UserService = new UserService()
    const formData: RegisterCommand = reactive(new RegisterCommand())
    const userAlert = reactive({
      show: false,
      message: '',
      type: ''
    })

    function submitForm() {
      registerUser(formData)
    }

    function registerUser(formData: RegisterCommand) {
      userService.registerUser(formData)
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            throw new Error('Registration failed: ' + data.message)
          }
          else {
            showUserAlertRegistrationSuccessful()
          }
        })
        .catch(err => {
          showUserAlertRegistrationFailed(err.message)
        })
    }

    function showUserAlertRegistrationSuccessful() {
      userAlert.show = true
      userAlert.message = 'Registration successful!'
      userAlert.type = 'success'
    }

    function showUserAlertRegistrationFailed(message: string) {
      userAlert.show = true
      userAlert.message = message
      userAlert.type = 'danger'
    }

    return {
      formData,
      submitForm,
      userAlert
    }
  }
})
</script>

<style scoped>
  .alert {
    margin-top: 10px;
  }
</style>

