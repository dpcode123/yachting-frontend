<template>
  <!-- Header row -->
  <div class="row header_row">
    <div class="col-6">
      <h1>Videos Admin</h1>
    </div>
    <div class="col-6 nav-buttons-container">

      <router-link 
        :to="{ name: 'VideosAdmin', params: { pageNumber: 1, statusFilter: EntityStatus.IMPORTED } }" 
        class="btn btn-outline-dark">
          Imported
      </router-link>

      <router-link 
        :to="{ name: 'VideosAdmin', params: { pageNumber: 1, statusFilter: EntityStatus.PUBLISHED } }" 
        class="btn btn-outline-success">
          Published
      </router-link>

      <router-link 
        :to="{ name: 'VideosAdmin', params: { pageNumber: 1, statusFilter: EntityStatus.REMOVED } }" 
        class="btn btn-outline-danger">
          Removed
      </router-link>

    </div>
  </div>
  <!-- Videos Table -->
  <div class="row">
    <div class="col">
      <table v-if="videos.length" class="table table-bordered table-hover">
        <thead>
          <tr class="text-center">
            <!-- Header cells always shown -->
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Title</th>
            <th scope="col">Yacht</th>

            <!-- Header cells shown depending on entity status filter -->
            <!-- IMPORTED -->
            <template v-if="propsStatusFilter === EntityStatus.IMPORTED">
              <th scope="col">Imported</th>
              <th scope="col">Remove</th>
              <th scope="col">Edit</th>
              <th scope="col">Publish</th>
            </template>
            <!-- PUBLISHED -->
            <template v-else-if="propsStatusFilter === EntityStatus.PUBLISHED">
              <th scope="col">Published</th>
              <th scope="col">Unpublish</th>
              <th scope="col">Edit</th>
            </template>
            <!-- INACTIVE -->
            <template v-else-if="propsStatusFilter === EntityStatus.REMOVED">
              <th scope="col">Removed</th>
              <th scope="col">Restore</th>
            </template>
              
          </tr>
        </thead>
        <tbody>
          <tr v-for="(video, index) in videos" 
              :key="video.id" 
              :class="{ 
                'table-success': index === activeRowIndex && rowHighlightColor.green, 
                'table-warning': index === activeRowIndex && rowHighlightColor.yellow,
                'table-danger': index === activeRowIndex && rowHighlightColor.red,
                'table-info': index === activeRowIndex && rowHighlightColor.lightblue
              }">
                  <!-- Data cells always shown -->
                  <td class="text-center">{{ (pageSize * pageIndex) + index + 1 }}.</td>
                  <td>{{ video.id }}</td>
                  <td>
                    <img class="" :src="getYoutubeImgUrl(video.youtubeId)" :alt="video.title" />
                  </td>
                  <td>{{ video.title }}</td>
                  <td>{{ video.yacht?.shipyard.name }} {{ video.yacht?.modelName }}</td>

                  <!-- Data cells shown depending on entity status filter -->
                  <!-- IMPORTED -->
                  <template v-if="propsStatusFilter === EntityStatus.IMPORTED">
                    <td class="text-center">
                      {{ formatDate(video.importedAt) }}
                    </td>
                    <td class="text-center">
                      <button @click="updateActivationStatus(ActivationAction.DEACTIVATE, video.id, index)" class="btn btn-danger">
                        <span class="material-icons align-middle">delete</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <router-link :to="{ name: 'EditVideo', params: { id:video.id }}" class="btn btn-primary">
                        <span class="material-icons align-middle">edit</span>
                      </router-link>
                    </td>
                    <td class="text-center">
                      <button @click="updatePublishingStatus(PublishingAction.PUBLISH, video.id, index)" class="btn btn-success">
                        <span class="material-icons align-middle">publish</span>
                      </button>
                    </td>
                  </template>
                  <!-- PUBLISHED -->
                  <template v-else-if="propsStatusFilter === EntityStatus.PUBLISHED">
                    <td class="text-center">
                      {{ formatDate(video.publishedUpdatedAt) }}
                    </td>
                    <td class="text-center">
                      <button @click="updatePublishingStatus(PublishingAction.UNPUBLISH, video.id, index)" class="btn btn-warning">
                        <span class="material-icons align-middle">unpublished</span>
                      </button>
                    </td>
                    <td class="text-center">
                      <router-link :to="{ name: 'EditVideo', params: { id:video.id }}" class="btn btn-primary">
                        <span class="material-icons align-middle">edit</span>
                      </router-link>
                    </td>
                  </template>
                  <!-- INACTIVE -->
                  <template v-else-if="propsStatusFilter === EntityStatus.REMOVED">
                    <td class="text-center">
                      {{ formatDate(video.activeUpdatedAt) }}
                    </td>
                    <td class="text-center">
                      <button @click="updateActivationStatus(ActivationAction.ACTIVATE, video.id, index)" class="btn btn-info">
                        <span class="material-icons align-middle">restore_from_trash</span>
                      </button>
                    </td>
                  </template>

          </tr>
        </tbody>
      </table>
      <span v-if="!videosFound">No videos found.</span>
    </div>
  </div>
  <PaginationVideosAdmin v-if="videos.length" 
    :pageNumber="propsPageNumber" 
    :statusFilter="propsStatusFilter"
    :totalPages="totalPages">
  </PaginationVideosAdmin>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue'
import VideoService from '@/components/domain/video/VideoService'
import { EntityStatus, ActivationAction, PublishingAction } from '@/ts/enum'
import PaginationVideosAdmin from '@/components/domain/video/PaginationVideosAdmin.vue'
import { getYoutubeImgUrl } from '@/components/youtube'
import { EntityPage, Video } from '@/ts/interface'

export default defineComponent({
  name: 'VideosAdmin',
  components: { PaginationVideosAdmin },
  props: {
      statusFilter: {
        type: String,
        default: EntityStatus.IMPORTED
      },
      pageNumber: {
        type: Number,
        default: 1
      }
  },
  setup(props) {
    const videoService: VideoService = new VideoService()
    const videos: Ref<Video[]> = ref<Video[]>([])
    const videosFound: Ref<boolean> = ref<boolean>(true)
    const totalPages: Ref<number> = ref<number>(0)
    const pageSize: Ref<number> = ref<number>(0)
    const pageIndex: Ref<number> = ref<number>(0)
    const propsStatusFilter: ComputedRef<string> = computed((): string => props.statusFilter)
    const propsPageNumber: ComputedRef<number> = computed((): number => props.pageNumber)
    const activeRowIndex: Ref<number> = ref<number>(-1)
    
    const rowHighlightColor = {
      green: false,
      yellow: false,
      red: false,
      lightblue: false,
      reset(): void {
        this.green = false
        this.yellow = false
        this.red = false
        this.lightblue = false
      }
    }

    getVideosPage(props.statusFilter, props.pageNumber)


    function getVideosPage(status: string, pageNum: number): void {
      videoService.getAdminVideosPage(status, pageNum)
        .then((data: EntityPage) => {
          videos.value = data.content as Video[];
          totalPages.value = data.totalPages
          pageSize.value = data.size
          pageIndex.value = data.number
        })
        .catch(err => {
            console.log(err.message)
            videosFound.value = false
        })
    }

    function updateActivationStatus(activationAction: ActivationAction, id: number, rowIndex: number): void {
      highlightRow(rowIndex, activationAction)
      videoService.changeActivationStatus(id, activationAction)
        .then(() => videos.value = videos.value.filter(video => (video as Video).id !== id))
        .then(() => clearRowHighlights())
        .catch(err => console.log(err.message))
    }

    function updatePublishingStatus(publishingAction: PublishingAction, id: number, rowIndex: number): void {
      highlightRow(rowIndex, publishingAction)
      videoService.changePublishingStatus(id, publishingAction)
        .then(() => videos.value = videos.value.filter(video => (video as Video).id !== id))
        .then(() => clearRowHighlights())
        .catch(err => console.log(err.message))
    }

    function highlightRow(rowIndex: number, action: ActivationAction | PublishingAction): void {
      switch (action) {
        case PublishingAction.PUBLISH:
          rowHighlightColor.green = true 
          break;
        case PublishingAction.UNPUBLISH:
          rowHighlightColor.yellow = true 
          break;
        case ActivationAction.ACTIVATE:
          rowHighlightColor.lightblue = true
          break;
        case ActivationAction.DEACTIVATE:
          rowHighlightColor.red = true
          break;
        default:
          break;
      }
      activeRowIndex.value = rowIndex;
    }

    function clearRowHighlights(): void {
      activeRowIndex.value = -1;
      rowHighlightColor.reset()
    }

    function formatDate(dateString: string) {
      const date = dayjs(dateString);
      return date.format('DD.MM.YYYY HH:mm');
    }

    return {
      videos, videosFound,
      ActivationAction, PublishingAction,
      updateActivationStatus, updatePublishingStatus,
      getYoutubeImgUrl, formatDate, 
      propsPageNumber, totalPages, pageSize, pageIndex, 
      EntityStatus, propsStatusFilter,
      activeRowIndex, highlightRow, rowHighlightColor
    }
  },
})
</script>

<style scoped>

td img {
  height: 84px;
}
.table > tbody > tr > td {
  vertical-align: middle;
}


/**
  Active link buttons
*/
.router-link-active, .router-link-exact-active {
  color: white;
}
.router-link-active.router-link-exact-active.btn.btn-outline-dark {
  background-color: #343a40 !important;
}
.router-link-active.router-link-exact-active.btn.btn-outline-success {
  background-color: #28a745 !important;
}
.router-link-active.router-link-exact-active.btn.btn-outline-danger {
  background-color: #dc3545 !important;
}
.router-link-active.router-link-exact-active.btn.btn-outline-secondary {
  background-color: #6c757d !important;
}


</style>
