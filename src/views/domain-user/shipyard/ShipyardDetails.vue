<template>

  <div class="row">
    <div class="col">
      <h1>{{ shipyard?.name }}</h1>
      <hr>

      <div v-if="shipyard?.country">
        Country: {{ shipyard?.country }}
      </div>

      <div v-if="shipyard?.yearFounded > 0">
        Founded: {{ shipyard?.yearFounded }}
      </div>

      <div v-if="shipyard?.websiteUrl">
        Website: {{ shipyard?.websiteUrl }}
      </div>

      <div v-if="shipyard?.youtubeChannelUrl">
        Youtube channel: {{ shipyard?.youtubeChannelUrl }}
      </div>
       
      <hr>
    </div>
  </div>

  <template v-if="videosByShipyard.length">
    <div class="row related-videos-by-yacht-thumbs-wrapper">
      <div class="col-12">
        <h3>{{ shipyard?.name }} videos:</h3>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="video in videosByShipyard" :key="video.id">
        <VideoThumb :id="video.id" :title="video.title" :youtubeId="video.youtubeId"></VideoThumb>
      </div>
    </div>
  </template>

</template>


<script lang="ts">
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import VideoService from '@/components/domain/video/VideoService'
import { Shipyard, Video, Yacht } from '@/ts/interface'
import VideoThumb from '@/components/domain/video/VideoThumb.vue'
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ShipyardDetails',
  components: { VideoThumb },
  props: {
    id: {
      type: Number
    }
  },
  setup(props) {
    const router = useRouter()
    const shipyardService: ShipyardService = new ShipyardService()
    const videoService: VideoService = new VideoService()
    const shipyard: Ref<Shipyard> = ref({} as Shipyard)
    const videosByShipyard: Ref<Video[]> = ref<Video[]>([])

    shipyardService.getShipyardById(props.id!)
      .then((data: Shipyard) => shipyard.value = data)
      .catch(err => {
        console.log(err.message)
        router.push('/error404')
      })

    videoService.getVideosByShipyard(props.id!)
      .then((data: Video[]) => videosByShipyard.value = data)
      .catch(err => console.log(err.message))


    return {
      shipyard,
      videosByShipyard
    }
  },
})
</script>



<style scoped>
h2 {
  font-size: 1.4rem;
  color: rgb(88, 88, 88);
}
h3 {
  font-size: 1.2rem;
}
</style>