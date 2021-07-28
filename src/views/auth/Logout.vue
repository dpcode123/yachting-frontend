<template>
  <div class="row">
    Logout
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import User from '@/components/auth/user/User'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    
    store.dispatch('setAuthenticated', false)
    store.dispatch('setToken', '')
    store.dispatch('setUser', new User())

    router.push('/')

  }
  
})
</script>

<style>

</style>