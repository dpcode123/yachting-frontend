import { StaticPage } from "@/ts/interface"

export default class StaticPageService {

  staticPageUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/static-page/public`

  constructor() { }


  async getStaticPage(pageName: string): Promise<StaticPage> {
    const staticPage = await fetch(`${this.staticPageUrl}/${pageName}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Get info page: failed') 
        }
        return res.json()
      })
    return staticPage
  }
 
}