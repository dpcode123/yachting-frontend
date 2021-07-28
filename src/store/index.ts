import { Commit, createStore } from 'vuex'
import { Authority } from '@/ts/enum';
import User from '@/components/auth/user/User';

export default createStore({
  state: {
    user: new User(),
    isUserAuthenticated: false,
    jwtToken: ''
  },
  mutations: {
    SET_AUTHENTICATED(state, authenticated: boolean) { 
      state.isUserAuthenticated = authenticated 
    },
    SET_TOKEN(state, token: string) { 
      state.jwtToken = token 
    },
    SET_USER(state, user: User) { 
      state.user = user 
    }
  },
  actions: {
    setAuthenticated({commit}: { commit: Commit}, authenticated: boolean) {
      commit('SET_AUTHENTICATED', authenticated)
    },
    setToken({commit}: { commit: Commit}, token: string) {
      commit('SET_TOKEN', token)
    },
    setUser({commit}: { commit: Commit}, user: User) {
      commit('SET_USER', user)
    }
  },
  getters: {
    getUser(state): User {
      return state.user
    },
    isUserAuthenticated(state): boolean {
      return state.isUserAuthenticated
    },
    getJwtToken(state): string {
      return state.jwtToken
    },
    getAuthorizationHeader(state): string {
      return 'Bearer ' + state.jwtToken
    },
    isUserAdmin(state): boolean {
      return userHasRole(state.user.authorities, Authority.ADMIN)
    }
  },
  modules: {
  }
})



function userHasRole(userRoles: string[], role: string): boolean {
  return userRoles?.some(userRole => userRole === role)
}