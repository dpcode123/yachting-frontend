<template>
  <div id="main-content-wrapper">
    <main role="main" class="container">        
      <router-view :key="$route.path" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TheMainContent'
})
</script>


<style>
#main-content-wrapper{
    padding: 100px 15px 0;
}

</style>