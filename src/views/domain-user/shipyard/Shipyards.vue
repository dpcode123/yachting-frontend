<template>
  <div class="row">
    <div class="col">
      <h1>Shipyards</h1>
    </div>
  </div>
  <div class="row">
    <div class="col">
        <hr>
        <div v-for="shipyard in shipyards" class="shipyard-details" :key="shipyard.id">
          <router-link :to="{ name: 'ShipyardDetails', params: { id: shipyard.id }}" class="shipyard-name-link mt-0 mb-1">
            {{ shipyard.name }}
          </router-link>
          <br>
          <span>Country: </span>{{ shipyard.country }}
          <br>
          <span>Founded: </span>{{ shipyard.yearFounded }}
          <hr>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import { getYoutubeImgUrl } from '@/components/youtube'
import { Shipyard } from '@/ts/interface'

export default defineComponent({
  name: 'Shipyards',
    setup() {
      const shipyardService: ShipyardService = new ShipyardService()
      const shipyards = ref<Shipyard[]>([])

      shipyardService.getShipyards()        
        .then(data => shipyards.value = data)
        .catch(err => console.log(err))
      
            
      return {
        shipyards,
        getYoutubeImgUrl
      }
    }
})
</script>



<style scoped>
  .shipyard-name-link {
    font-size: 1.6rem;
    color: rgb(54, 54, 54);
    cursor: pointer;
  }
  .shipyard-details {
    font-size: 0.9rem;
  }
  .media {
      margin-top: 1rem;
  }
  .item-img {
      max-width: 18rem;
  }
</style>