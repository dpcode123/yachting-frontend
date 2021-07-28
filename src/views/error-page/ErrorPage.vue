<template>
  <div class="row">
    <div class="col-12">
      <h1>{{ title }}</h1>
    </div>
    <div class="col-12">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  name: 'ErrorPage',
  props: {
    statusCode: {
      type: Number,
      default: 404
    },
    errorMessage: {
      type: String,
      default: 'Page Not Found'
    }
  },
  setup(props) {
    const title: Ref<string> = ref<string>('')
    const text: Ref<string> = ref<string>('')
    
    title.value = 'Error ' + props.statusCode;
    text.value = props.errorMessage;


    return {
      title,
      text
    }
  }
})
</script>

<style>

</style>