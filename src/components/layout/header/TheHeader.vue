<template>
  <header>
    <div v-if="$store.getters.isUserAdmin">
      <TheAdminNavbar />
    </div>
    <div v-else>
      <TheNavbar />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheNavbar from '@/components/layout/header/TheNavbar.vue'
import TheAdminNavbar from '@/components/layout/header/TheAdminNavbar.vue'

export default defineComponent({
  name: "TheHeader",
  components: { TheNavbar, TheAdminNavbar }
})

</script>