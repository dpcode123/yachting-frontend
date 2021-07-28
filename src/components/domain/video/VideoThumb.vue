<template>
  <div class="video_container">
    <div class="video_img">
      <router-link :to="{ name: 'VideoDetails', params: { id }}">
        <img class="video_thumb" :src="getYoutubeImgUrl(youtubeId)" :alt="title" />
      </router-link>
    </div>
    <div class="video_txt">
      <router-link :to="{ name: 'VideoDetails', params: { id }}" class="video_link" >
        {{ title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'
import { getYoutubeImgUrl } from '@/components/youtube'

export default defineComponent({
  name: 'VideoThumb',
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    youtubeId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const id: ComputedRef<number> = computed((): number => props.id) 
    const title: ComputedRef<string> = computed((): string => props.title)
    const youtubeId: ComputedRef<string> = computed((): string => props.youtubeId)
    
    return {
      id,
      title,
      youtubeId,
      getYoutubeImgUrl
    }
  }
})
</script>


<style scoped>
</style>