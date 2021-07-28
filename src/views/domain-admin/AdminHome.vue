<template>
  <!-- Header row -->
  <div class="row header_row header_row_admin">
    <div class="col">
      <h1>Admin Dashboard</h1>
    </div>
  </div>

  <div class="row">

    <div class="col-12">
      <h2>Videos</h2>
      <p>{{ totalImportedVideos }} imported videos</p>
      <p>{{ totalPublishedVideos }} published videos</p>
      <p>{{ totalRemovedVideos }} removed videos</p>
      <hr>
    </div>

    <div class="col-12">
      <h2>Yachts</h2>
      <p>{{ totalYachts }} yachts</p>
      <hr>
    </div>
      
    <div class="col-12">
      <h2>Shipyards</h2>
      <p>{{ totalShipyards }} shipyards</p>
      <hr>
    </div>

    <div class="col-12">
      <h2>Users</h2>
      <p>{{ totalUsers }} users</p>
      <hr>
    </div>

  </div>
</template>

<script lang="ts">
import VideoService from '@/components/domain/video/VideoService'
import ShipyardService from '@/components/domain/shipyard/ShipyardService'
import YachtService from '@/components/domain/yacht/YachtService'
import UserService from '@/components/auth/user/UserService'
import { ref, defineComponent, Ref } from 'vue'
import { EntityStatus } from '@/ts/enum'

export default defineComponent({
  name: 'AdminHome',
  setup() {
    const videoService: VideoService = new VideoService()
    const shipyardService: ShipyardService = new ShipyardService()
    const yachtService: YachtService = new YachtService()
    const userService: UserService = new UserService()
    
    const totalImportedVideos: Ref<number> = ref<number>(0)
    const totalPublishedVideos: Ref<number> = ref<number>(0)
    const totalRemovedVideos: Ref<number> = ref<number>(0)
    const totalShipyards: Ref<number> = ref<number>(0)
    const totalYachts: Ref<number> = ref<number>(0)
    const totalUsers: Ref<number> = ref<number>(0)

    videoService.countVideos(EntityStatus.IMPORTED)        
      .then((data: number) => totalImportedVideos.value = data)
      .catch(err => console.log(err.message))
    
    videoService.countVideos(EntityStatus.PUBLISHED)        
      .then((data: number) => totalPublishedVideos.value = data)
      .catch(err => console.log(err.message))

    videoService.countVideos(EntityStatus.REMOVED)        
      .then((data: number) => totalRemovedVideos.value = data)
      .catch(err => console.log(err.message))

    shipyardService.countShipyards()        
      .then((data: number) => totalShipyards.value = data)
      .catch(err => console.log(err.message))

    yachtService.countYachts()        
      .then((data: number) => totalYachts.value = data)
      .catch(err => console.log(err.message))

    userService.countUsers()
      .then((data: number) => totalUsers.value = data)
      .catch(err => console.log(err.message))


    return {
      totalImportedVideos,
      totalPublishedVideos,
      totalRemovedVideos,
      totalShipyards,
      totalYachts,
      totalUsers      
    }
  }
})
</script>
