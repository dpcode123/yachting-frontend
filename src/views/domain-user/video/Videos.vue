<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="video in videos" :key="video.id">
      <VideoThumb 
        :id="video.id" 
        :title="video.title" 
        :youtubeId="video.youtubeId">
      </VideoThumb>
    </div>
    <div v-if="!videosFound">
      No videos found.
    </div>
  </div>
  <PaginationVideos v-if="videos.length" 
    :pageNumber="propsPageNumber" 
    :totalPages="totalPages">
  </PaginationVideos>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed, ComputedRef, Ref } from 'vue'
import { getYoutubeImgUrl } from '@/components/youtube'
import VideoThumb from '@/components/domain/video/VideoThumb.vue'
import PaginationVideos from '@/components/domain/video/PaginationVideos.vue'
import VideoService from '@/components/domain/video/VideoService'
import { EntityPage, Video } from '@/ts/interface'

export default defineComponent({
    name: 'Videos',
    components: { VideoThumb, PaginationVideos },
    props: {
      pageNumber: {
        type: Number,
        default: 1
      }
    },
    setup(props) {
      const videoService: VideoService = new VideoService()
      const propsPageNumber: ComputedRef<number> = computed((): number => props.pageNumber)  
      const videos = ref<Video[]>([])
      const videosFound: Ref<boolean> = ref<boolean>(true)
      const totalPages: Ref<number> = ref<number>(0)
      watch([propsPageNumber], () => { getVideosPage(props.pageNumber) }) 
    
      getVideosPage(props.pageNumber)
      
      
      function getVideosPage(pageNum: number): void {
        videoService.getPublicVideosPage(pageNum)
          .then((data: EntityPage) => {
            videos.value = data.content as Video[]
            totalPages.value = data.totalPages
          })
          .catch(err => {
            console.log(err.message)
            videosFound.value = false
          })
      }

      return {
        videos,
        getYoutubeImgUrl,
        propsPageNumber,
        totalPages,
        videosFound
      }
    }
})
</script>


