<template>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-yachting">
      <div class="container">
        
        <!-- Navbar toggler -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <!-- Links (left side) -->
          <ul class="navbar-nav mr-auto">
            <li v-for="link in navbarLinksAdmin" :key="link.text" class="nav-item mx-2">
              <router-link 
              :to="{ name: link.routeName, params: link?.params }" 
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
        </div>

      </div>
    </nav>
</template>

<script lang="ts">
import { ref, defineComponent, computed, Ref } from 'vue'
import { useStore } from 'vuex'
import DropdownUserAuthenticated from '@/components/layout/header/DropdownUserAuthenticated.vue'
import { EntityStatus } from '@/ts/enum'
import { RouteLink } from '@/ts/type'

export default defineComponent({
  name: 'TheNavbar',
  components: { DropdownUserAuthenticated },
  setup() {
    const store = useStore()
    const siteName = process.env.VUE_APP_SITE_NAME
    const isAuthenticated = computed(() => store.getters.isUserAuthenticated)
    
    const navbarLinksAdmin: Ref<RouteLink[]> = ref<RouteLink[]>([
      { routeName: 'AdminHome', text: 'Admin Home' },
      { routeName: 'VideosAdmin', text: 'Videos Admin', params: { pageNumber: 1, statusFilter: EntityStatus.IMPORTED } },
      { routeName: 'ImportVideos', text: 'Import Videos' },
      { routeName: 'YachtsAdmin', text: 'Yachts Admin' },
      { routeName: 'ShipyardsAdmin', text: 'Shipyards Admin' }
    ])

    return {
      siteName,
      isAuthenticated,
      navbarLinksAdmin
    }
  } 
})
</script>

<style scoped>
  .navbar-name {
    font-size: 2rem;
    color: rgb(255, 255, 255);
    margin-right: 3rem;
  }
  .navbar .nav-item a {
    text-align: center;
  }
</style>