<template>
<!-- SHIPYARD FORM INPUT FIELDS -->
  <!-- Id -->
  <div v-if="formData.id" class="form-group">
    <label for="id">Id</label>
    <input type="text" class="form-control" name="id" id="id" v-model="formData.id" disabled>
  </div>
  <!-- Name -->
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" name="name" id="name" v-model="formData.name" required>
  </div>
  <!-- Country -->
  <div class="form-group">
    <label for="country">Country</label>
    <input type="text" class="form-control" name="country" id="country" v-model="formData.country">
  </div>
  <!-- Year founded -->
  <div class="form-group">
    <label for="yearFounded">Year founded</label>
    <input type="number" class="form-control" name="yearFounded" id="yearFounded" v-model="formData.yearFounded">
  </div>
  <!-- Website url -->
  <div class="form-group">
    <label for="websiteUrl">Website url</label>
    <input type="text" class="form-control" name="websiteUrl" id="websiteUrl" v-model="formData.websiteUrl">
  </div>
  <!-- Youtube channel url -->
  <div class="form-group">
    <label for="youtubeChannelUrl">Youtube channel url </label>
    <input type="text" class="form-control" name="youtubeChannelUrl" id="youtubeChannelUrl" v-model="formData.youtubeChannelUrl">
  </div>
  
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ShipyardFormInputFields',
  props: {
      formData: {
        type: Object
      }
  },
  setup(props) {
    const formData = computed(() => props.formData)

    return {
      formData
    }
  }
})
</script>

<style>

</style>