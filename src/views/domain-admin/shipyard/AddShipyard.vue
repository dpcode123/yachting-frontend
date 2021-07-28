<template>
  <!-- Heading -->
  <div class="row mb20">
    <div class="col">
      <h1>Add Shipyard</h1>
    </div>
  </div>
  <!-- Back to all shipyards -->
  <div class="row mb20">
    <div class="col">
      <router-link :to="{ name: 'ShipyardsAdmin' }" class="btn btn-dark btn-lg">All Shipyards</router-link>
    </div>
  </div>
  <!-- Form -->
  <div class="row">
    <div class="col-3">
      <form @submit.prevent="submitForm">
        <ShipyardFormInputFields :formData="formData"></ShipyardFormInputFields>
        <button class="btn btn-primary">Add Shipyard</button>
      </form>
    </div>
  </div>

</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ShipyardFormInputFields from '@/components/domain/shipyard/ShipyardFormInputFields.vue'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import ToastService from '@/components/common/ToastService'
import ShipyardCommand from '@/components/domain/shipyard/ShipyardCommand'

export default defineComponent({
  name: 'AddShipyard',
  components: { ShipyardFormInputFields },
  setup() {
    const router = useRouter()
    const shipyardService: ShipyardService = new ShipyardService()
    const toastService: ToastService = new ToastService()
    const formData: ShipyardCommand = reactive(new ShipyardCommand())
    
    
    function submitForm() {
      addShipyard(formData)
    }

    function addShipyard(shipyardCommand: ShipyardCommand): void {
      shipyardService.addShipyard(shipyardCommand)        
        .then(data => {
          toastService.raiseToast(
            `Shipyard ${data.name} added.`, 
            'success')
          router.push('/admin/shipyards')
        })
        .catch(err => {
            toastService.raiseToast(
              'ERROR - not added: ' + err.message, 
              'danger')
        })
    }

    return {
      formData,
      submitForm
    }
  }
})
</script>

<style scoped>
  .form-group {
    margin-bottom: 36px;
  }
</style>