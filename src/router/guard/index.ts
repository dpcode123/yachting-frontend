import store from '@/store'

export function userHasRoleAdmin(to, from, next) {
  if (store.getters.isUserAuthenticated && store.getters.isUserAdmin) {
    next()
  } else {
    next({ name: 'Login' })
  }
}