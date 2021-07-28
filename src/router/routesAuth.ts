import { Route } from '@/ts/type'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Logout from '@/views/auth/Logout.vue'

const routesAuth: Route[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

export default routesAuth