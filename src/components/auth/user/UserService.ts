import store from '@/store'
import LoginCommand from '../LoginCommand'
import RegisterCommand from '../RegisterCommand'
import User from './User'

export default class UserService {

  authorizationHeader: string = store.getters.getAuthorizationHeader
  authUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/auth`
  userUrl: string = `${process.env.VUE_APP_BACKEND_API_URL}/api/user`

  constructor() {}

  async loginUser(formData: LoginCommand): Promise<Response> {
    const user = await fetch(`${this.authUrl}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      .then(res => {
        if (!res.ok) { throw new Error('User login failed')}
        return res
      })
    return user
  }

  async registerUser(formData: RegisterCommand): Promise<Response> {
    const registrationResponse = await fetch(`${this.authUrl}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      .then(res => {
        if (!res.ok) { throw new Error('Registration failed')}
        return res
      })
    return registrationResponse
  }

  async getCurrentUser(): Promise<User> {
    const currentUser = await fetch(`${this.userUrl}/current-user`, { 
        headers: {'Authorization': 'Bearer ' + store.getters.getJwtToken} 
      })
      .then(res => {
        if (!res.ok) { throw new Error('Get current user failed')}
        return res.json()
      })
    return currentUser
  }

  async countUsers(): Promise<number> {
    const method = 'GET'
    const headers = {
      'Authorization': this.authorizationHeader
    }
    const count = await fetch(`${this.userUrl}/count`, {
        method: method,
        headers: headers,
      })
      .then(res => {
        if (!res.ok) { throw new Error('Count users: failed') }
        return res.json()
      })
    return count
  }


}
