<template>
  <!-- Heading -->
  <div class="row">
    <div class="col">
      <h1>Edit Video</h1>
    </div>
  </div>
  <!-- Back to all videos -->
  <div class="row mb20">
    <div class="col">
      <router-link 
        :to="{ name: 'VideosAdmin', params: { pageNumber: '1', statusFilter: EntityStatus.IMPORTED } }" 
        class="btn btn-dark btn-lg">
          All Videos
        </router-link>
    </div>
  </div>
  <!-- Form -->
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4 mb20">
      <form @submit.prevent="submitForm">
        <!-- Id -->
        <div class="form-group">
          <label for="id">Id</label>
          <input type="text" class="form-control" name="id" id="id" v-model="id" disabled>
        </div>
        <!-- Youtube Id -->
        <div class="form-group">
          <label for="name">Youtube Id</label>
          <input type="text" class="form-control" name="youtubeId" id="youtubeId" v-model="formData.youtubeId">
        </div>
        <!-- Title -->
        <div class="form-group">
          <label for="name">Title</label>
          <input type="text" class="form-control" name="title" id="title" v-model="formData.title" required>
        </div>
        <a class="btn btn-sm btn-outline-secondary" @click="removeSelectedYacht">Remove yacht</a>
        <!-- Shipyard Id -->
        <div class="form-group">
          <label for="shipyardId">Shipyard</label>
          <select class="form-control" name="shipyardId" v-model="selectedShipyard">
            <option disabled value="">Please select one</option>
            <option 
              v-for="shipyard in shipyards" 
              :key="shipyard.id" 
              :value="shipyard.id">
                {{ shipyard.name }}
            </option>
          </select>
        </div>
        <!-- Yacht Id -->
        <div class="form-group">
          <label for="yachtId">Yacht</label>
          <select class="form-control" name="yachtId" v-model="selectedYacht" :disabled="!selectedShipyard">
            <option disabled value="">Please select one (first select shipyard)</option>
            <option 
              v-for="yacht in yachtSelectOptions" 
              :key="yacht.id" 
              :value="yacht.id">
                {{ yacht.modelName }} ({{ yacht.shipyard.name }})
            </option>
          </select>
        </div>
        <!-- Submit button -->
        <button class="btn btn-primary">Save changes</button>
      </form>
    </div>
    <div class="col-12 col-md-6 col-lg-8">
      <div id="ytplayer" type="text/html" class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" :src="getYoutubeEmbedUrl(formData.youtubeId)" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, watch } from 'vue'
import VideoService from '@/components/domain/video/VideoService'
import ToastService from '@/components/common/ToastService'
import { EntityStatus } from '@/ts/enum'
import { getYoutubeEmbedUrl } from '@/components/youtube'
import { VideoCommand } from '@/ts/type'
import YachtService from '@/components/domain/yacht/YachtService'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import { Shipyard, Yacht } from '@/ts/interface'

export default defineComponent({
  name: 'EditVideo',
  props: {
    id: {
      type: Number
    }
  },
  setup(props) {
    const videoService: VideoService = new VideoService()
    const toastService: ToastService = new ToastService()
    const shipyardService: ShipyardService = new ShipyardService()
    const shipyards: Ref<Shipyard[]> = ref<Shipyard[]>([])
    const yachtService: YachtService = new YachtService()
    const selectedShipyard: Ref<number> = ref<number>(0)
    const selectedYacht: Ref<number> = ref<number>(0)
    const yachts: Ref<Yacht[]> = ref<Yacht[]>([])
    const yachtSelectOptions: Ref<any> = ref<any[]>([])
    const formData: VideoCommand = reactive({
      title: '',
      youtubeId: '',
      yachtId: ref(0),
      shipyardId: ref(0)
    })

    // when selected shipyard is changed: filter yachts by that shipyard
    watch([selectedShipyard], () => {
      formData.shipyardId = selectedShipyard.value;
      yachtSelectOptions.value = filterYachtsByShipyard(yachts.value, selectedShipyard.value);
      selectedYacht.value = formData.yachtId!
    })

    // when selected yacht is changed
    watch([selectedYacht], () => {
      formData.yachtId = selectedYacht.value;
    })


    shipyardService.getShipyards()
      .then(data => {shipyards.value = data})
      .catch(err => console.log(err.message))

    yachtService.getYachts()
      .then(data => { 
        yachts.value = data
        yachtSelectOptions.value = yachts.value
      })
      .catch(err => console.log(err))
    
    getVideoAndSetFormData(props.id!)
    

    function submitForm(): void {
      editVideo(props.id!, formData)
    }

    function editVideo(videoId: number, videoCommand: VideoCommand): void {
      videoService.editVideo(videoId, videoCommand)
        .then(data => {
            toastService.raiseToast(
              `Video ${data.id} saved.`, 
              'success')
        })
        .catch(err => {
            toastService.raiseToast(
              'ERROR - Changes not saved: ' + err.message, 
              'danger')
        })
    }

    function getVideoAndSetFormData(videoId: number): void {
      videoService.getVideoById(videoId)
        .then(data => {
          formData.title = data.title
          formData.youtubeId = data.youtubeId
          formData.yachtId = data.yacht?.id!
          formData.shipyardId = data.yacht?.shipyard.id!

          selectedShipyard.value = formData.shipyardId
          yachtSelectOptions.value = filterYachtsByShipyard(yachts.value, selectedShipyard.value);
        })
        .catch(err => {
          toastService.raiseToast(
            'ERROR - Data fetch failed: ' + err.message, 
            'danger')
        })
    }

    function filterYachtsByShipyard(yachtList: any[], shipyardId: number): any[] {
      const filteredYachts: any = yachtList.filter(yacht => (yacht as any).shipyard.id === shipyardId)
      return filteredYachts
    }

    function removeSelectedYacht() {
      selectedShipyard.value = 0
      selectedYacht.value = 0
      formData.shipyardId = null
      formData.yachtId = null
    }

    return {
      formData,
      submitForm,
      EntityStatus,
      getYoutubeEmbedUrl,
      shipyards, selectedShipyard,
      yachts, yachtSelectOptions, selectedYacht,
      removeSelectedYacht
    }
    

  }
})
</script>
