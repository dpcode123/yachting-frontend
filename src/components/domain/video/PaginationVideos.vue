<template>
<!-- Pagination -->  
  <div class="row justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination pagination-lg">
          <!-- Previous pages -->
          <template v-if="parseInt(getPageNumber()) > 1">
            <li class="page-item">
              <router-link
              :to="{ name: 'Videos', params: { pageNumber: getPageNumber(-1) }}"
                class="page-link">
                &laquo; Previous
              </router-link>
            </li>
            <li class="page-item">
              <router-link
              :to="{ name: 'Videos', params: { pageNumber: getPageNumber(-1) }}"
                class="page-link">
                {{ getPageNumber(-1) }}
              </router-link>
            </li>
          </template>
          <!-- Current page -->
          <li class="page-item">
            <router-link
            :to="{ name: 'Videos', params: { pageNumber: getPageNumber() }}"
              class="page-link">
              {{ getPageNumber() }}
            </router-link>
          </li>
          <!-- Next pages -->
          <template v-if="parseInt(getPageNumber()) < propsTotalPages">
            <li class="page-item">
              <router-link 
              :to="{ name: 'Videos', params: { pageNumber: getPageNumber(1)  }}"
                class="page-link">
                {{ getPageNumber(1) }}
              </router-link>
            </li>
            <li class="page-item">
              <router-link 
              :to="{ name: 'Videos', params: { pageNumber: getPageNumber(1) }}"
                class="page-link">
                Next &raquo;
              </router-link>
            </li>
          </template>
        </ul>
      </nav>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue'

export default defineComponent({
  name: 'PaginationVideos',
  props: {
      pageNumber: {
        type: Number,
        default: 1
      },
      totalPages: {
        type: Number,
        default: 1
      }
  },
  setup(props) {
    const propsTotalPages: ComputedRef<number> = computed((): number => props.totalPages)
    
    function getPageNumber(addNumber: number = 0): number {
      return props.pageNumber + addNumber
    }

    return {
      getPageNumber,
      propsTotalPages
    }
  },
})
</script>

<style scoped>
.page-link {
  color: #fff;
  background-color: #021631;
  border-color: #10315c;
}
.page-item.active .page-link {
  z-index: 3;
  color:#021631;
  background-color: #fff;
}
.router-link-active, .router-link-exact-active {
  color:#021631 !important;
  background-color: #fff;
  font-weight: bold;
}
</style>