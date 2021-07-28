<template>
  <ul class="nav navbar-nav w-100 ml-auto justify-content-end">
    <li class="nav-item mx-2 dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="material-icons align-middle">account_circle</span> {{ username }}
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <router-link :to="{ name: 'Logout' }" class="dropdown-item">Logout</router-link>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DropdownUserAuthenticated',
  setup() {
    const store = useStore()
    const username = computed(() => store.getters.getUser?.username)

    return {
      username
    }
  },
})
</script>

<style scoped>
  .dropdown-menu {
    background-color: #021631;
  }
  .dropdown-menu a:hover {
    background-color: #03234d;
  }
  .dropdown-item {
    color: #fff;
  }
</style>