<template>

  <div class="row">
    <div class="col">
      <h1>{{ yacht?.modelName }}</h1>
      <h2>
        <router-link :to="{ name: 'ShipyardDetails', params: { id: yacht?.shipyard?.id }}" class="shipyard-name-link mt-0 mb-1">
          {{ yacht?.shipyard?.name }}
        </router-link>
      </h2>
      <hr>

      <div v-if="yacht.lengthOverallMeters > 0">
        Length overall (m): {{ yacht?.lengthOverallMeters }}
      </div>

      <div v-if="yacht.beamMeters > 0">
        Beam (m): {{ yacht?.beamMeters }}
      </div>
       
      <hr>
    </div>
  </div>

  <template v-if="videosByYacht.length">
    <div class="row">
      <div class="col-12">
        <h3>{{ yacht?.shipyard?.name }} {{ yacht?.modelName }} videos:</h3>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="video in videosByYacht" :key="video.id">
        <VideoThumb :id="video.id" :title="video.title" :youtubeId="video.youtubeId"></VideoThumb>
      </div>
    </div>
  </template>

</template>


<script lang="ts">
import YachtService from '@/components/domain/yacht/YachtService'
import VideoService from '@/components/domain/video/VideoService'
import { Video, Yacht } from '@/ts/interface'
import VideoThumb from '@/components/domain/video/VideoThumb.vue'
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'YachtDetails',
  components: { VideoThumb },
  props: {
    id: {
      type: Number
    }
  },
  setup(props) {
    const router = useRouter()
    const yachtService: YachtService = new YachtService()
    const videoService: VideoService = new VideoService()
    const yacht: Ref<Yacht> = ref({} as Yacht)
    const videosByYacht: Ref<Video[]> = ref<Video[]>([])

    yachtService.getYachtById(props.id!)
      .then((data: Yacht) => yacht.value = data)
      .catch(err => {
        console.log(err.message)
        router.push('/error404')
      })

    videoService.getVideosByYacht(props.id!)
      .then((data: Video[]) => videosByYacht.value = data)
      .catch(err => console.log(err.message))


    return {
      yacht,
      videosByYacht
    }
  },
})
</script>


<style scoped>
h2 a{
  font-size: 1.4rem;
  color: rgb(88, 88, 88);
}
h3 {
  font-size: 1.2rem;
}
</style>