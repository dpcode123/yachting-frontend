<template>
  <div class="row header_row header_row_admin">
    <div class="col">
      <h1>Import videos</h1>
    </div>
  </div>
  
  <form @submit.prevent="submitForm">
    <div class="row">
      
      <!-- IMPORT BY KEYWORD -->
      <div class="col-3">
        <h2>Import by keyword</h2>
        <!-- Keyword -->
        <div class="form-group">
          <label for="keyword">Keyword</label>
          <input type="text" class="form-control" name="keyword" id="keyword" v-model="formData.keyword">
        </div>
        <!-- Page Token -->
        <div class="form-group">
          <label for="pageToken">Page Token</label> 
          <input type="text" class="form-control" name="pageToken" id="pageToken" v-model="formData.pageToken">
          <a class="btn btn-sm btn-outline-secondary" @click="resetPageTokenToFirstPage">reset to 1st page</a>
        </div>
        <!-- Max results per page -->
        <div class="form-group">
          <label for="maxResults">Results per page (max 50)</label>
          <input type="number" class="form-control" name="maxResults" id="maxResults" v-model="formData.maxResults" max="50">
        </div>
      </div>

      <!-- IMPORT BY YACHT -->
      <div class="col-3 offset-1">
        <h2>By yacht</h2>
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
          <select class="form-control" name="yachtId" v-model="formData.yachtId" :disabled="!selectedShipyard">
            <option disabled value="">Please select one (first select shipyard)</option>
            <option 
              v-for="yacht in yachtSelectOptions" 
              :key="yacht.id" 
              :value="yacht.id">
                {{ yacht.modelName }} ({{ yacht.shipyard.name }})
            </option>
          </select>
        </div>
        <!-- Button -->
        <div class="text-center">
          <button class="btn btn-primary btn-lg btn-block">Import Videos</button>
        </div>
      </div>

      <!-- IMPORT SUMMARY / LOADING SPINNER -->
      <div class="col-4 offset-1">
        <!-- Import summary-->
        <template v-if="showImportResults">
            <div class="row">       
              <div class="col-12">
                <h2>Import summary:</h2>
                <span>Videos fetched from API: </span>
                <span>{{ importSummary.videosFetchedFromApi }}</span>
                <br>
                <span>Videos already in database: </span>
                <span class="text-danger">{{ importSummary.videosAlreadyInDatabase }}</span>
                <br>
                <span>Videos imported: </span>
                <span class="text-success">{{ importSummary.videosImported }}</span>
                <br>
                <span>Next page token: </span>
                <span>{{ formData.pageToken }}</span>
              </div>
            </div>
        </template>
        <!-- Loading spinner -->
        <template v-else-if="apiFetchRunning">
            <div class="row justify-content-center">
              <h2>Fetching videos...</h2>
            </div>
            <div class="row justify-content-center">
              <LoadingSpinner></LoadingSpinner>
            </div>
        </template>
      </div>

  </div>
 </form>   

  <hr>

  <!-- FETCHED VIDEOS -->
  <div  v-if="showImportResults" class="row">
    <div class="col-12">
      <h2>Fetched videos:</h2>
    </div>
    <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="video in importSummary.videos" :key="video.id">
      <div class="video_container">
        <div class="video_img">
          <img class="video_thumb" :src="getYoutubeImgUrl(video.videoId)" :alt="video.title" />
        </div>
        <div class="video_txt">
          {{ video.title }}
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { ref, reactive, defineComponent, ComputedRef, watch, computed, Ref } from 'vue'
import { getYoutubeImgUrl } from '@/components/youtube'
import YachtService from '@/components/domain/yacht/YachtService'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import VideoImportService from '@/components/domain/video/VideoImportService'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { ImportVideosByKeywordCommand } from '@/ts/type'
import { Shipyard, Yacht } from '@/ts/interface'

export default defineComponent({
  name: 'ImportVideos',
  components: { LoadingSpinner },
  setup() {
    const videoImportService: VideoImportService = new VideoImportService()
    const shipyardService: ShipyardService = new ShipyardService()
    const yachtService: YachtService = new YachtService()
    const shipyards: Ref<Shipyard[]> = ref<Shipyard[]>([])
    const selectedShipyard: Ref<number> = ref<number>(0)
    const yachts: Ref<Yacht[]> = ref<Yacht[]>([])
    const yachtSelectOptions: Ref<any> = ref<any[]>([])
    const apiFetchRunning: Ref<boolean> = ref<boolean>(false)
    
    const formData: ImportVideosByKeywordCommand = reactive({
      keyword: 'yachting',
      pageToken: 'first',
      maxResults: 50,
      yachtId: ref(0)
    })
    const importSummary = reactive({
      videos: [],
      videosFetchedFromApi: 0,
      videosAlreadyInDatabase: 0,
      videosImported: 0
    })
    const selectedYachtWatcher: ComputedRef<number> = computed((): number => formData.yachtId)
    const showImportResults: ComputedRef<boolean> = computed((): boolean => (importSummary.videosFetchedFromApi && !apiFetchRunning.value) === true)

    // when shipyard is selected: filter yachts by that shipyard
    watch([selectedShipyard], () => {
      yachtSelectOptions.value = filterYachtsByShipyard(yachts.value, selectedShipyard.value);
    })

    // when yacht is selected: set search keyword and reset page token to 1st page
    watch([selectedYachtWatcher], () => { 
      setSelectedYachtNameAsKeyword(selectedYachtWatcher.value) //formData.yachtId
      resetPageTokenToFirstPage()
    }) 
        

    shipyardService.getShipyards()        
      .then(data => shipyards.value = data)
      .catch(err => console.log(err))

    yachtService.getYachts()        
      .then(data => yachts.value = data)
      .catch(err => console.log(err))



    function submitForm() {
      importVideosByKeyword(formData)
      apiFetchRunning.value = true
    }

    function filterYachtsByShipyard(yachtList: any[], shipyardId: number): any[] {
      const filteredYachts: any = yachtList.filter(yacht => (yacht as any).shipyard.id === shipyardId)
      return filteredYachts
    }
    
    function importVideosByKeyword(command: ImportVideosByKeywordCommand): void {
      videoImportService.importVideosByKeyword(command)
        .then(res => res.json())
        .then(data => {
          formData.pageToken = data.nextPageToken
          importSummary.videos = data.videos
          importSummary.videosFetchedFromApi = data.videosFetchedFromApi
          importSummary.videosAlreadyInDatabase = data.videosAlreadyInDatabase
          importSummary.videosImported = data.videosImported
        })
        .then(() => apiFetchRunning.value = false)
        .catch(err => console.log(err.message))
    }

    function resetPageTokenToFirstPage() {
      formData.pageToken = 'first'
    }

    function setSelectedYachtNameAsKeyword(yachtId: number): void {
      const yachtsFilteredById: any[] = yachts.value.filter(yacht => (yacht as Yacht).id === yachtId)
      const yachtName: string = yachtsFilteredById[0].modelName
      const shipyardName: string = yachtsFilteredById[0].shipyard.name

      formData.keyword = shipyardName + ' ' + yachtName
    }

    return {
      formData,
      submitForm,
      importSummary,
      importVideosByKeyword,
      resetPageTokenToFirstPage,
      getYoutubeImgUrl,
      shipyards, selectedShipyard,
      yachts, yachtSelectOptions,
      apiFetchRunning,
      showImportResults
    }
  }
})
</script>

<style scoped>
  h2 {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
  .form-group {
    margin-bottom: 36px;
  }



</style>