import store from '@/store'
import YachtCommand from '@/components/domain/yacht/YachtCommand'
import { Yacht } from '@/ts/interface'


export default class YachtService {

  authorizationHeader: string = store.getters.getAuthorizationHeader
  publicUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/yacht/public`
  adminUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/yacht/admin`

  constructor() { }

  
  async getYachts(): Promise<Yacht[]> {
    const yachts = await fetch(this.publicUrl)
      .then(res => {
        if (!res.ok) { throw new Error('Get yachts: failed') }
        return res.json()
      })
    return yachts
  }

  async getYachtById(id: number): Promise<Yacht> {
    const yacht = await fetch(`${this.publicUrl}/${id}`)
      .then(res => {
        if (!res.ok) { throw new Error('Get yacht by id: failed') }
        return res.json()
      })
    return yacht
  }

  async addYacht(yachtCommand: YachtCommand): Promise<Yacht> {
    const method = 'POST'
    const headers = {
      'Content-Type': 'application/json', 
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/add`, {
        method: method,
        headers: headers,
        body: JSON.stringify(yachtCommand)
      })
      .then(res => {
        if (!res.ok) { throw new Error('Add yacht: failed') }
        return res.json()
      })
    return response
  }

  async editYacht(id: number, yachtCommand: YachtCommand): Promise<Yacht> {
    const method = 'PUT'
    const headers = {
      'Content-Type': 'application/json', 
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/edit/${id}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(yachtCommand)
      })
      .then(res => {
        if (!res.ok) { throw new Error('Edit yacht: failed') }
        return res.json()
      })
    return response
  }

  async deleteYacht(id: number): Promise<Yacht> {
    const method = 'DELETE'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/delete/${id}`, {
        method: method,
        headers: headers
      })
      .then(res => {
        if (!res.ok) { throw new Error('Delete yacht: failed') }
        return res.json()
      })
    return response
  }

  async countYachts(): Promise<number> {
    const method = 'GET'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const count = await fetch(`${this.adminUrl}/count`, {
        method: method,
        headers: headers,
      })
      .then(res => {
        if (!res.ok) { throw new Error('Count yachts: failed') }
        return res.json()
      })
    return count
  }


}
