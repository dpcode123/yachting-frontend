<template>

  <div class="row">
    <div class="col">
      <h1>{{ videoDetails.title }}</h1>
    </div>
  </div>

  <div class="row">

    <div class="col-12 col-lg-10">

      <!-- Video Player -->
      <div class="row video-player-container">
        <div class="col-12">
          <div id="ytplayer" type="text/html" class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" :src="getYoutubeEmbedUrl(videoDetails.youtubeId)" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
      
      <!-- Related videos - same shipyard (BELOW THE VIDEO) 12 videos -->
      <template v-if="videoDetails.yacht">
        <div class="row mt2rem">
          <div class="mx-auto related-videos-by-shipyard">{{ videoDetails.yacht.shipyard.name }} videos</div>
        </div>
        <div class="row">
          <div class="col-4" v-for="video in videoDetails.relatedVideosSameShipyard" :key="video.id">
            <VideoThumb :id="video.id" :title="video.title" :youtubeId="video.youtubeId"></VideoThumb>
          </div>
        </div>
      </template>

    </div>

    <!-- Related videos - same yacht (ON RIGHT SIDE OF VIDEO) 8 videos -->
    <template v-if="videoDetails.yacht">
      <div class="col-12 col-lg-2 related-videos-by-yacht">
        <div class="row">
          <div class="mx-auto">
            <h2>
              {{ videoDetails.yacht.shipyard.name }} {{ videoDetails.yacht.modelName }} videos
            </h2>
          </div>
        </div>
        <div class="row related-videos-by-yacht-thumbs-wrapper">
          <div class="col-xs-12 col-sm-6 col-lg-12" v-for="video in videoDetails.relatedVideosSameYacht" :key="video.id">
            <VideoThumb :id="video.id" :title="truncateString(video.title, 36)" :youtubeId="video.youtubeId"></VideoThumb>
          </div>
        </div>
      </div>
    </template>

  </div>

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getYoutubeEmbedUrl } from '@/components/youtube'
import VideoThumb from '@/components/domain/video/VideoThumb.vue'
import VideoService from '@/components/domain/video/VideoService'
import { VideoWithRelatedVideos } from '@/ts/interface'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'VideoDetails',
    components: { VideoThumb },
    props: {
      id: Number
    },
    setup(props) {
      const router = useRouter()
      const videoService: VideoService = new VideoService()
      const videoDetails: VideoWithRelatedVideos = reactive({
        id: props.id!,
        title: '',
        yacht: null,
        youtubeId: '',
        importedAt: new Date(),
        activeUpdatedAt: new Date(),
        publishedUpdatedAt: new Date(),
        relatedVideosSameYacht: [],
        relatedVideosSameShipyard: []
      })
      

      videoService.getVideoDetailsById(props.id!)
        .then(videoWithRelatedVideosDTO => {
          setVideoDetails(videoWithRelatedVideosDTO)
        })
        .catch(err => {
          console.log(err.message)
          router.push('/error404')
      })

      
      function setVideoDetails(details: any): void {
        videoDetails.id = details.videoDTO.id
        videoDetails.title = details.videoDTO.title
        videoDetails.yacht = details.videoDTO.yacht
        videoDetails.youtubeId = details.videoDTO.youtubeId
        videoDetails.importedAt = details.videoDTO.importedAt
        videoDetails.activeUpdatedAt = details.videoDTO.activeUpdatedAt
        videoDetails.publishedUpdatedAt = details.videoDTO.publishedUpdatedAt
        videoDetails.relatedVideosSameYacht = details.relatedVideosSameYacht
        videoDetails.relatedVideosSameShipyard = details.relatedVideosSameShipyard
      }

      function truncateString(string: string, limit: number) {
        if (string.length > limit) {
          return string.substring(0, limit) + "..."
        } else {
          return string
        }
      }

      return {
        videoDetails,
        getYoutubeEmbedUrl,
        truncateString
      }
    }
})
</script>

<style>
  .video-player-container {
    margin-bottom: 20px;
  }
  .related-videos-by-shipyard {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
  }
  .related-videos-by-yacht h2 {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  .related-videos-by-yacht-thumbs-wrapper .video_container .video_txt a.video_link {
    font-size: 0.8rem;
  }
</style>