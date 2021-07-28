<template>
  <div class="row">
    <div class="col-12">
      <h1>{{ title }}</h1>
    </div>
    <div class="col-12">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import StaticPageService from '@/components/static-page/StaticPageService'
import { StaticPage } from '@/ts/interface'

export default defineComponent({
  name: 'StaticPage',
  props: {
    pageName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const router = useRouter()
    const staticPageService: StaticPageService = new StaticPageService()
    const title: Ref<string> = ref<string>('')
    const text: Ref<string> = ref<string>('')

    staticPageService.getStaticPage(props.pageName)
      .then((data: StaticPage) => {
        title.value = data.title
        text.value = data.text
      })
      .catch(err => {
        console.log(err.message)
        router.push('/error404')
      })
    
    return {
      title,
      text
    }
  }
})
</script>

<style>

</style>