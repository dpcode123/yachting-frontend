<template>
     <footer class="footer">
        <div class="container">
          <div class="row">
            <!-- left side -->
            <div class="col-8">
              <ul class="list-unstyled footer-links">
                <li v-for="link in footerLinks" :key="link.linkText">
                  <router-link :to="{ name: link.routeName }">
                    {{ link.text }}
                  </router-link>
                </li>
              </ul>

            </div>
            <!-- right side -->
            <div class="col-4">
              <div class="footer-links-right text-right">
                © 2021 YachtingTube 
                <router-link v-if="$store.getters.isUserAdmin" :to="{ name: 'AdminHome' }">Admin</router-link>
              </div>
            </div>
          </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { RouteLink } from '@/ts/type'
import { ref, defineComponent, Ref } from 'vue'

export default defineComponent({
    name: 'TheFooter',
    setup() {
      const footerLinks: Ref<RouteLink[]> = ref<RouteLink[]>([
        { routeName: 'About', text: 'About' },
        { routeName: 'Terms', text: 'Terms of service' },
        { routeName: 'Privacy', text: 'Privacy policy' }
      ])

      return {
        footerLinks
      }
  } 
})
</script>

<style scoped>
footer {
  font-size: 0.9rem;
}
span a {
  margin: 0 20px;
}
.footer-links{
  display: flex;
  margin-bottom: 0;
}
ul.footer-links li {
  margin: 0 5px;
}
ul li a {
  color: rgb(230, 230, 230);
}
.footer-links-right {
  font-size: 0.7rem;
}
.router-link-active, .router-link-exact-active {
color: #dc143c !important;
}
@media (min-width: 576px) {
  .footer-links-right {
    font-size: 0.9rem;
  }
}
</style>