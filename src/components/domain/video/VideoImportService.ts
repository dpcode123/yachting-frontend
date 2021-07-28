import store from '@/store'
import { ImportVideosByKeywordCommand } from '@/ts/type'

export default class VideoImportService {
  authorizationHeader: string = store.getters.getAuthorizationHeader
  apiUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/admin/youtube-import/videos/by-keyword`

  constructor() { }

  async importVideosByKeyword(command: ImportVideosByKeywordCommand): Promise<Response> {
    const method = 'POST'
    const headers = {
      'Content-Type': 'application/json', 
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.apiUrl}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(command)
      })
      .then(res => {
        if (!res.ok) { throw new Error('Import videos: failed') }
        return res
      })

    return response
  }

}