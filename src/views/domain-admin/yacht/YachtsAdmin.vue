<template>
  <!-- Header row -->
  <div class="row header_row">
    <div class="col-6">
      <h1>Yachts Admin</h1>
    </div>
    <div class="col-6 nav-buttons-container">
      <router-link :to="{ name: 'AddYacht' }" class="btn btn-success btn-lg">
        Add Yacht <span class="material-icons align-middle">add_circle</span>
      </router-link>
    </div>
  </div>
  <!-- Yachts Table -->
  <div class="row">
    <div class="col">
      <table v-if="yachts.length" class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th scope="col">Id</th>
            <th scope="col">Model Name</th>
            <th scope="col">Shipyard</th>
            <th scope="col">Length overall [m]</th>
            <th scope="col">Beam [m]</th>
            <th scope="col">Image</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="yacht in yachts" :key="yacht.id">
            <td>{{ yacht.id }}</td>
            <td class="font-weight-bold">{{ yacht.modelName }}</td>
            <td>{{ yacht.shipyard.name }}</td>
            <td>{{ yacht.lengthOverallMeters }}</td>
            <td>{{ yacht.beamMeters }}</td>
            <td>
              <img class="" :src="getYoutubeImgUrl(yacht.imageYoutubeId)" :alt="yacht.modelName" />
            </td>
            <td class="text-center">
              <router-link :to="{ name: 'EditYacht', params: { id:yacht.id }}" class="btn btn-primary">
                <span class="material-icons align-middle">edit</span>
              </router-link>
            </td>
            <td class="text-center">
              <button @click="deleteYacht(yacht.id)" class="btn btn-danger">
                <span class="material-icons align-middle">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <span v-else>No yachts found.</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Yacht } from '@/ts/interface'
import YachtService from '@/components/domain/yacht/YachtService'
import ToastService from '@/components/common/ToastService'
import { getYoutubeImgUrl } from '@/components/youtube'


export default defineComponent({
  setup() {
    const yachtService: YachtService = new YachtService()
    const toastService: ToastService = new ToastService()
    const yachts = ref<Yacht[]>([])
    
    yachtService.getYachts()        
      .then(data => yachts.value = data)
      .catch(err => console.log(err.message))


    function deleteYacht(yachtId: number) {
      yachtService.deleteYacht(yachtId)        
        .then(() => {
            yachts.value = yachts.value.filter(yacht => (yacht as Yacht).id !== yachtId)
            toastService.raiseToast(`Yacht deleted.`, 'info')
          })
        .catch(err => toastService.raiseToast('Error: Not deleted.', 'danger'))
    }

    return {
      yachts,
      deleteYacht,
      getYoutubeImgUrl
    }
  }
})
</script>

<style scoped>
td img {
  height: 84px;
}
.material-icons.md-36 { 
  font-size: 36px; 
}
</style>