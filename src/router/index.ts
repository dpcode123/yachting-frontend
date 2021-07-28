import { createRouter, createWebHistory } from 'vue-router'
import { Route } from '@/ts/type'
import routesMain from '@/router/routesMain'
import routesAuth  from '@/router/routesAuth'
import routesStatic from '@/router/routesStatic'
import routesAdmin from '@/router/routesAdmin'
import routesError from '@/router/routerError'

let routes: Route[] = []

routes = routes.concat(
  routesMain, 
  routesStatic, 
  routesAuth,
  routesAdmin,
  routesError
)

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router