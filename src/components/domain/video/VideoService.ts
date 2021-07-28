import store from '@/store'
import { ActivationAction, PublishingAction } from '@/ts/enum'
import { EntityPage, Video, VideoWithRelatedVideos } from '@/ts/interface'
import { VideoCommand } from '@/ts/type'

export default class VideoService {

  authorizationHeader: string = store.getters.getAuthorizationHeader
  publicUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/video/public`
  adminUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/video/admin`
  
  constructor() { }

  
  // PUBLIC (not authenticated)

  async getPublicVideosPage(pageNum: number): Promise<EntityPage> {
    // decrease by 1 (page n here is page n-1 on backend)
    const pageNumberParam: string = (pageNum - 1).toString()

    const videosPage = await fetch(`${this.publicUrl}/paginated?pageNumber=${pageNumberParam}`)
      .then(res => {
        if (!res.ok) { throw new Error('Get paginated videos: failed') }
        return res.json()
      })
    return videosPage;
  }

  async getVideoById(id: number): Promise<Video> {
    const video = await fetch(`${this.publicUrl}/${id}`)
      .then(res => {
        if (!res.ok) { throw new Error('Get video by id: failed') }
        return res.json()
      })
    return video
  }

  async getVideoDetailsById(id: number): Promise<VideoWithRelatedVideos> {
    const video = await fetch(`${this.publicUrl}/details/${id}`)
      .then(res => {
        if (!res.ok) { throw new Error('Get video details by id: failed') }
        return res.json()
      })
    return video
  }

  async getVideosByYacht(yachtId: number): Promise<Video[]> {
    const videos = await fetch(`${this.publicUrl}/find-by-yacht/${yachtId}`)
      .then(res => {
        if (!res.ok) { throw new Error('Get videos by yacht: failed') }
        return res.json()
      })
    return videos;
  }

  async getVideosByShipyard(shipyardId: number): Promise<Video[]> {
    const videos = await fetch(`${this.publicUrl}/find-by-shipyard/${shipyardId}`)
      .then(res => {
        if (!res.ok) { throw new Error('Get videos by shipyard: failed') }
        return res.json()
      })
    return videos;
  }


  // ADMIN (authenticated)

  async getAdminVideosPage(status: string, pageNum: number): Promise<EntityPage> {
    const method = 'GET'
    const headers = {
      'Authorization': this.authorizationHeader
    }

    // decrease by 1 (page n here is page n-1 on backend)
    const pageNumber: string = (pageNum - 1).toString()

    const videosPage = await fetch(`${this.adminUrl}/filtered-paginated?entityStatus=${status.toUpperCase()}&pageNumber=${pageNumber}`, {
        method: method,
        headers: headers,
      })
      .then(res => {
        if (!res.ok) { throw new Error('Get paginated videos: failed') }
        return res.json()
      })
    return videosPage;
  }

  async getVideos(status: string): Promise<Video[]> {
    const method = 'GET'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const videos = await fetch(`${this.adminUrl}/${status}`, {
        method: method,
        headers: headers,
      })
      .then(res => {
        if (!res.ok) { throw new Error('Get videos: failed') }
        return res.json()
      })
    return videos
  }

  async editVideo(id: number, videoCommand: VideoCommand): Promise<Video> {
    const method = 'PUT'
    const headers = {
      'Content-Type': 'application/json', 
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/edit/${id}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(videoCommand)
      })
      .then(res => {
        if (!res.ok) { throw new Error('Video edit: failed') }
        return res.json()
      })
    return response
  }

  async changeActivationStatus(id: number, activationAction: ActivationAction): Promise<Video> {
    const method = 'PATCH'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/activation/${id}`, {
      method: method,
      headers: headers,
      body: activationAction
    })
    .then(res => {
      if (!res.ok) { throw new Error('Activation action: failed') }
      return res.json()
    })
    return response
  }

  async changePublishingStatus(id: number, publishingAction: PublishingAction): Promise<Video> {
    const method = 'PATCH'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/publishing/${id}`, {
      method: method,
      headers: headers,
      body: publishingAction
    })
    .then(res => {
      if (!res.ok) { throw new Error('Publishing action: failed') }
      return res.json()
    })
    return response
  }

  async countVideos(status: string): Promise<number> {
    const method = 'GET'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const count = await fetch(`${this.adminUrl}/count/${status}`, {
        method: method,
        headers: headers,
      })
      .then(res => {
        if (!res.ok) { throw new Error('Count videos: failed') }
        return res.json()
      })
    return count
  }


}
