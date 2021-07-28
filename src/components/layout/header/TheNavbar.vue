<template>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-yachting">
    <div class="container">
      
      <!-- Logo link to homepage -->
      <router-link :to="{ name: 'Home' }" class="navbar-brand">
        <div class="logo-img-container">
          <img class="img-fluid" src="@/assets/logo.png" :alt="siteName" />
        </div>
      </router-link>
      
      <!-- Navbar toggler -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <!-- Links (left side) -->
        <ul class="navbar-nav mr-auto">
          <li v-for="link in navbarLinks" :key="link.text" class="nav-item mx-2">
            <router-link 
            :to="{ name: link.routeName }" 
            class="nav-link" 
            data-toggle="collapse" data-target=".navbar-collapse.show">
              {{ link.text }}
            </router-link>
          </li>
        </ul>
        <!-- User authenticated details dropdown (right side) -->
        <template v-if="isAuthenticated">
          <DropdownUserAuthenticated></DropdownUserAuthenticated>
        </template>
        <!-- Links user NOT authenticated (right side) -->
        <template v-else>
          <ul class="nav navbar-nav w-100 ml-auto justify-content-end">
            <li v-for="link in navbarLinksNotAuthenticated" :key="link.text" class="nav-item mx-2">
              <router-link 
              :to="{ name: link.routeName }" 
              class="nav-link" 
              data-toggle="collapse" data-target=".navbar-collapse.show">
                {{ link.text }}
              </router-link>
            </li>
          </ul>
        </template>
      </div>
      
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent, computed, Ref } from 'vue'
import { useStore } from 'vuex'
import DropdownUserAuthenticated from '@/components/layout/header/DropdownUserAuthenticated.vue'
import { RouteLink } from '@/ts/type'

export default defineComponent({
  name: 'TheNavbar',
  components: { DropdownUserAuthenticated },
  setup() {
    const store = useStore()
    const siteName = process.env.VUE_APP_SITE_NAME
    const isAuthenticated = computed(() => store.getters.isUserAuthenticated)
    
    const navbarLinks: Ref<RouteLink[]> = ref<RouteLink[]>([
      { routeName: 'Videos', text: 'VIDEOS' },
      { routeName: 'Yachts', text: 'YACHTS' },
      { routeName: 'Shipyards', text: 'SHIPYARDS' }
    ])

    const navbarLinksNotAuthenticated: Ref<RouteLink[]> = ref<RouteLink[]>([
      { routeName: 'Login', text: 'Login' }
    ])

    return {
      siteName,
      isAuthenticated,
      navbarLinks,
      navbarLinksNotAuthenticated
    }
  } 
})
</script>

<style scoped>
  .logo-img-container {
    max-width: 120px;
  }
  @media (min-width: 576px) {
    .logo-img-container {
      max-width: 90%;
    }
  }
  @media (min-width: 768px) {
    .logo-img-container {
      max-width: 100%;
    }
  }
  
</style>