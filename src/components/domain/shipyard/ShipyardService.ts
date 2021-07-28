import store from '@/store'
import ShipyardCommand from '@/components/domain/shipyard/ShipyardCommand'
import { Shipyard } from '@/ts/interface'


export default class ShipyardService {

  authorizationHeader: string = store.getters.getAuthorizationHeader
  publicUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/shipyard/public`
  adminUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/shipyard/admin`
  
  constructor() { }


  /*
   * PUBLIC ENDPOINTS
   * */
  
  async getShipyards(): Promise<Shipyard[]> {
    const shipyards = await fetch(this.publicUrl)
      .then(res => {
        if (!res.ok) { throw new Error('Get shipyards: failed') }
        return res.json()
      })
    return shipyards
  }

  async getShipyardById(id: number): Promise<Shipyard> {
    const shipyard = await fetch(`${this.publicUrl}/${id}`)
      .then(res => {
        if (!res.ok) { throw new Error('Get shipyard by id: failed') }
        return res.json()
      })
    return shipyard
  }


  /*
   * ADMIN ENDPOINTS
   * */

  async addShipyard(shipyardCommand: ShipyardCommand): Promise<Shipyard> {
    const method = 'POST'
    const headers = {
      'Content-Type': 'application/json', 
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/add`, {
        method: method,
        headers: headers,
        body: JSON.stringify(shipyardCommand)
      })
      .then(res => {
        if (!res.ok) { throw new Error('Add shipyard: failed') }
        return res.json()
      })
    return response
  }

  async editShipyard(id: number, shipyardCommand: ShipyardCommand): Promise<Shipyard> {
    const method = 'PUT'
    const headers = {
      'Content-Type': 'application/json', 
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/edit/${id}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(shipyardCommand)
      })
      .then(res => {
        if (!res.ok) { throw new Error('Edit shipyard: failed') }
        return res.json()
      })
    return response
  }

  async deleteShipyard(id: number): Promise<Shipyard> {
    const method = 'DELETE'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const response = await fetch(`${this.adminUrl}/delete/${id}`, {
        method: method,
        headers: headers
      })
      .then(res => {
        if (!res.ok) { throw new Error('Delete shipyard: failed') }
        return res.json()
      })
    return response
  }

  async countShipyards(): Promise<number> {
    const method = 'GET'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const count = await fetch(`${this.adminUrl}/count`, {
        method: method,
        headers: headers,
      })
      .then(res => {
        if (!res.ok) { throw new Error('Count shipyards: failed') }
        return res.json()
      })
    return count
  }


}
