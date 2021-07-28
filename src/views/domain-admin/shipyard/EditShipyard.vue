<template>
  <!-- Heading -->
  <div class="row">
    <div class="col">
      <h1>Edit Shipyard</h1>
    </div>
  </div>
  <!-- Back to all shipyards -->
  <div class="row mb20">
    <div class="col">
      <router-link :to="{ name: 'ShipyardsAdmin'}" class="btn btn-dark btn-lg">All Shipyards</router-link>
    </div>
  </div>
  <!-- Form -->
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <form @submit.prevent="submitForm">
        <ShipyardFormInputFields :formData="formData"></ShipyardFormInputFields>
        <button class="btn btn-primary">Save changes</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ShipyardFormInputFields from '@/components/domain/shipyard/ShipyardFormInputFields.vue'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import ToastService from '@/components/common/ToastService'
import ShipyardCommand from '@/components/domain/shipyard/ShipyardCommand'

export default defineComponent({
  name: 'EditShipyard',
  components: { ShipyardFormInputFields },
  props: {
      id: {
        type: Number
      }
  },
  setup(props) {
    const shipyardService: ShipyardService = new ShipyardService()
    const toastService: ToastService = new ToastService()
    const formData: ShipyardCommand = reactive(new ShipyardCommand())

    getShipyardByIdAndSetFormData(props.id!)
    

    function submitForm(): void {
      editShipyard(props.id!, formData)
    }

    function editShipyard(shipyardId: number, shipyardCommand: ShipyardCommand): void {
      shipyardService.editShipyard(shipyardId, shipyardCommand)        
        .then(data => {
            toastService.raiseToast(
              `Shipyard ${data.name} saved.`, 
              'success')
        })
        .catch(err => {
            toastService.raiseToast(
              'ERROR - Changes not saved: ' + err.message, 
              'danger')
        })
    }

    function getShipyardByIdAndSetFormData(shipyardId: number): void {
      shipyardService.getShipyardById(shipyardId)        
        .then(data => { 
          formData.name = data.name 
          formData.country = data.country 
          formData.yearFounded = data.yearFounded 
          formData.websiteUrl = data.websiteUrl 
          formData.youtubeChannelUrl = data.youtubeChannelUrl 
        })
        .catch(err => {
          toastService.raiseToast('ERROR - Data fetch failed: ' + err.message, 'danger')
        })
    }

    return {
      formData,
      submitForm
    } 


  }
})
</script>

<style>
  
</style>