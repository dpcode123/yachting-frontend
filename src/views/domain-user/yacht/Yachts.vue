<template>
  <div class="row">
    <div class="col">
      <h1>Yachts</h1>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <ul class="list-unstyled">
          <li v-for="yacht in yachts" class="media" :key="yacht.id">
              <img class="mr-3 item-img" :src="getYachtImgUrl(yacht.imageYoutubeId)" :alt="yacht.modelName" />

              <div class="media-body">
                <router-link :to="{ name: 'YachtDetails', params: { id: yacht.id }}" class="yacht-name mt-0 mb-1">
                  {{ yacht.modelName }}
                </router-link>
                <br>
                <router-link :to="{ name: 'ShipyardDetails', params: { id: yacht.shipyard.id }}" class="shipyard-name mt-0 mb-1">
                  {{ yacht.shipyard.name }}
                </router-link>
                
              </div>
          </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import YachtService from '@/components/domain/yacht/YachtService'
import { getYoutubeImgUrl } from '@/components/youtube'
import { Yacht } from '@/ts/interface'

export default defineComponent({
  name: 'Yachts',
  setup() {
    const yachtService: YachtService = new YachtService()
    const yachts: Ref<Yacht[]> = ref<Yacht[]>([])
    

    yachtService.getYachts()        
      .then(data => yachts.value = data)
      .catch(err => console.log(err))

    function getYachtImgUrl(youtubeThumbId: string): string {
      const placeholderYachtImgThumbId: string = 'C5dMg1Jc9yA'
      const thumbId: string =  youtubeThumbId?.length ? youtubeThumbId : placeholderYachtImgThumbId
      return getYoutubeImgUrl(thumbId)
    }

    return {
      yachts,
      getYachtImgUrl
    }
  }
})
</script>

<style scoped>
  .yacht-name {
    font-size: 1.6rem;
    color: rgb(54, 54, 54);
    cursor: pointer;
  }
  .shipyard-name {
    font-size: 0.9rem;
    color: rgb(88, 88, 88);
    cursor: pointer;
  }
  .media{
      margin-top: 1rem;
  }
  .item-img{
      max-width: 18rem;
  }
</style>