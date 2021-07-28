<template>
  <!-- Heading -->
  <div class="row mb20">
    <div class="col">
      <h1>Add Yacht</h1>
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
    <div class="col-3">
      <form @submit.prevent="submitForm">
        <YachtFormInputFields :formData="formData"></YachtFormInputFields>
        <button class="btn btn-primary">Add Yacht</button>
      </form>
    </div>
  </div>

</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import YachtFormInputFields from '@/components/domain/yacht/YachtFormInputFields.vue'
import YachtService from '@/components/domain/yacht/YachtService'
import ToastService from '@/components/common/ToastService'
import YachtCommand from '@/components/domain/yacht/YachtCommand'

export default defineComponent({
  name: 'AddYacht',
  components: { YachtFormInputFields },
  setup() {
    const router = useRouter()
    const yachtService: YachtService = new YachtService()
    const toastService: ToastService = new ToastService()
    const formData: YachtCommand = reactive(new YachtCommand())


    function submitForm() {
      addYacht(formData)
    }

    function addYacht(yachtCommand: YachtCommand): void {
      yachtService.addYacht(yachtCommand)        
        .then(data => {
          toastService.raiseToast(
            `Yacht ${data.modelName} added.`, 
            'success')
          router.push('/admin/yachts')
        })
        .catch(err => {
            toastService.raiseToast(
              'ERROR -  not added: ' + err.message, 
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
