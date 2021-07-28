<template>
<!-- Pagination -->  
  <div class="row justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <!-- Previous pages -->
          <template v-if="parseInt(getPageNumber()) > 1">
            <li class="page-item">
              <router-link
              :to="{ name: 'VideosAdmin', params: { pageNumber: getPageNumber(-1), statusFilter: propsStatusFilter }}"
                class="page-link">
                &laquo; Previous
              </router-link>
            </li>
            <li class="page-item">
              <router-link
              :to="{ name: 'VideosAdmin', params: { pageNumber: getPageNumber(-1), statusFilter: propsStatusFilter }}"
                class="page-link">
                {{ getPageNumber(-1) }}
              </router-link>
            </li>
          </template>
          <!-- Current page -->
          <li class="page-item">
            <router-link
            :to="{ name: 'VideosAdmin', params: { pageNumber: getPageNumber(), statusFilter: propsStatusFilter }}"
              class="page-link">
              {{ getPageNumber() }}
            </router-link>
          </li>
          <!-- Next pages -->
          <template v-if="parseInt(getPageNumber()) < propsTotalPages">
            <li class="page-item">
              <router-link 
              :to="{ name: 'VideosAdmin', params: { pageNumber: getPageNumber(1), statusFilter: propsStatusFilter  }}"
                class="page-link">
                {{ getPageNumber(1) }}
              </router-link>
            </li>
            <li class="page-item">
              <router-link 
              :to="{ name: 'VideosAdmin', params: { pageNumber: getPageNumber(1), statusFilter: propsStatusFilter }}"
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
import { EntityStatus } from '@/ts/enum'
import { computed, ComputedRef, defineComponent } from 'vue'

export default defineComponent({
  name: 'PaginationVideosAdmin',
  props: {
      pageNumber: {
        type: Number,
        default: 1
      },
      statusFilter: {
        type: String,
        default: EntityStatus.IMPORTED
      },
      totalPages: {
        type: Number,
        default: 1
      }
  },
  setup(props) {
    const propsTotalPages: ComputedRef<number> = computed((): number => props.totalPages)
    const propsStatusFilter: ComputedRef<string> = computed((): string => props.statusFilter)
    
    function getPageNumber(addNumber: number = 0): number {
      return props.pageNumber + addNumber
    }

    return {
      getPageNumber,
      propsTotalPages,
      propsStatusFilter
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