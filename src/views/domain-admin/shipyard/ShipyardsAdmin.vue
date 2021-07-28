<template>
  <!-- Header row -->
  <div class="row header_row">
    <div class="col-6">
      <h1>Shipyards Admin</h1>
    </div>
    <div class="col-6 nav-buttons-container">
      <router-link :to="{ name: 'AddShipyard' }" class="btn btn-success btn-lg">Add Shipyard <span class="material-icons align-middle">add_circle</span></router-link>
    </div>
  </div>
  <!-- Shipyards Table -->
  <div class="row">
    <div class="col">
      <table v-if="shipyards.length" class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Year Founded</th>
            <th scope="col">Website</th>
            <th scope="col">Youtube Channel</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shipyard in shipyards" :key="shipyard.id">
            <td>{{ shipyard.id }}</td>
            <td>{{ shipyard.name }}</td>
            <td>{{ shipyard.country }}</td>
            <td>{{ shipyard.yearFounded }}</td>
            <td>{{ shipyard.websiteUrl }}</td>
            <td>{{ shipyard.youtubeChannelUrl }}</td>
            <td class="text-center">
              <router-link :to="{ name: 'EditShipyard', params: { id:shipyard.id }}" class="btn btn-primary">
                <span class="material-icons align-middle">edit</span>
              </router-link>
            </td>
            <td class="text-center">
              <button @click="deleteShipyard(shipyard.id)" class="btn btn-danger">
                <span class="material-icons align-middle">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <span v-else>No shipyards found.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Shipyard } from '@/ts/interface'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import ToastService from '@/components/common/ToastService'

export default defineComponent({
  setup() {
    const shipyardService: ShipyardService = new ShipyardService()
    const toastService: ToastService = new ToastService()
    const shipyards = ref<Shipyard[]>([])
    
    shipyardService.getShipyards()        
      .then((data: Shipyard[]) => shipyards.value = data)
      .catch(err => console.log(err.message))


    function deleteShipyard(shipyardId: number): void {
      shipyardService.deleteShipyard(shipyardId)        
        .then(() => {
            shipyards.value = shipyards.value.filter(shipyard => (shipyard as Shipyard).id !== shipyardId)
            toastService.raiseToast(`Shipyard deleted.`, 'info')
          })
        .catch(err => toastService.raiseToast('Error: Not deleted.', 'danger'))
    }

    return {
      shipyards,
      deleteShipyard
    }
  }
})
</script>

<style scoped>
  .material-icons.md-36 { font-size: 36px; }
</style>