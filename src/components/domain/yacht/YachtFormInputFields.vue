<template>
<!-- YACHT FORM INPUT FIELDS -->
  <!-- Id -->
  <div v-if="formData.id" class="form-group">
    <label for="id">Id</label>
    <input type="text" class="form-control" name="id" id="id" v-model="formData.id" disabled>
  </div>
  <!-- Shipyard Id -->
  <div class="form-group">
    <label for="shipyardId">Shipyard</label>
    <select class="form-control" name="shipyardId" v-model="formData.shipyardId" required>
      <option disabled value="">Please select one</option>
      <option 
        v-for="shipyard in shipyards" 
        :key="shipyard.id" 
        :value="shipyard.id">
          {{ shipyard.name }}
      </option>
    </select>
  </div>
  <!-- Model Name -->
  <div class="form-group">
    <label for="modelName">Model Name</label>
    <input type="text" class="form-control" name="modelName" id="modelName" v-model="formData.modelName" required>
  </div>
  <!-- Length (meters) -->
  <div class="form-group">
    <label for="lengthOverallMeters">Length overall (meters)</label>
    <input type="number" class="form-control" name="lengthOverallMeters" id="lengthOverallMeters" v-model="formData.lengthOverallMeters">
  </div>
  <!-- Beam (meters) -->
  <div class="form-group">
    <label for="beamMeters">Beam (meters)</label>
    <input type="number" class="form-control" name="beamMeters" id="beamMeters" v-model="formData.beamMeters">
  </div>
  <!-- Yacht image thumbnail -->
  <div class="form-group">
    <label for="imageYoutubeId">Yacht image (youtube id)</label>
    <input type="text" class="form-control" name="imageYoutubeId" id="imageYoutubeId" v-model="formData.imageYoutubeId">
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, Ref } from 'vue'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import { Shipyard } from '@/ts/interface'

export default defineComponent({
  name: 'YachtFormInputFields',
  props: {
      formData: {
        type: Object
      }
  },
  setup(props) {
    const shipyardService: ShipyardService = new ShipyardService()
    const shipyards: Ref<Shipyard[]> = ref<Shipyard[]>([])
    
    shipyardService.getShipyards()        
      .then(data => shipyards.value = data)
      .catch(err => console.log(err.message))

    const formData = computed(() => props.formData)

    return {
      shipyards,
      formData
    }
  }
})
</script>

<style>

</style>