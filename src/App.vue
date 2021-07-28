<template>
    <TheHeader />
    <TheMainContent />
    <TheFooter />
</template>

<script>
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/style.css';
import '@/assets/css/sticky-footer.css';
import TheHeader from '@/components/layout/header/TheHeader.vue'
import TheMainContent from '@/components/layout/TheMainContent.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
 
export default {
  components: { TheHeader, TheMainContent, TheFooter }
}
</script>