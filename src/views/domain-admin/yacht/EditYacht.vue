<template>
  <!-- Heading -->
  <div class="row">
    <div class="col">
      <h1>Edit Yacht</h1>
    </div>
  </div>
  <!-- Back to all yachts -->
  <div class="row mb20">
    <div class="col">
      <router-link :to="{ name: 'YachtsAdmin'}" class="btn btn-dark btn-lg">All Yachts</router-link>
    </div>
  </div>
  <!-- Form -->
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <form @submit.prevent="submitForm">
        <YachtFormInputFields :formData="formData"></YachtFormInputFields>
        <button class="btn btn-primary">Save changes</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import YachtFormInputFields from '@/components/domain/yacht/YachtFormInputFields.vue'
import YachtService from '@/components/domain/yacht/YachtService'
import ToastService from '@/components/common/ToastService'
import YachtCommand from '@/components/domain/yacht/YachtCommand'
import { Yacht } from '@/ts/interface'

export default defineComponent({
  name: 'EditYacht',
  components: { YachtFormInputFields },
  props: {
      id: {
        type: Number
      }
  },
  setup(props) {
    const yachtService: YachtService = new YachtService()
    const toastService: ToastService = new ToastService()
    const formData: YachtCommand = reactive(new YachtCommand())


    getYachtByIdAndSetFormData(props.id!)
    

    function submitForm(): void {
      editYacht(props.id as number, formData)
    }

    function editYacht(yachtId: number, yachtCommand: YachtCommand): void {
      yachtService.editYacht(yachtId, yachtCommand)        
        .then(data => {
            toastService.raiseToast(
              `Yacht ${data.modelName} saved.`, 
              'success')
        })
        .catch(err => {
            toastService.raiseToast(
              'ERROR - Changes not saved: ' + err.message, 
              'danger')
        })
    }

    function getYachtByIdAndSetFormData(yachtId: number): void {
      yachtService.getYachtById(yachtId)        
        .then((data: Yacht) => { 
          formData.modelName = data.modelName 
          formData.shipyardId = data.shipyard.id
          formData.lengthOverallMeters = data.lengthOverallMeters 
          formData.beamMeters = data.beamMeters 
          formData.imageYoutubeId = data.imageYoutubeId
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