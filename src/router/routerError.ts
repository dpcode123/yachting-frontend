import { Route } from '@/ts/type'
import ErrorPage from '@/views/error-page/ErrorPage.vue'

const routesError: Route[] = [
  // 404 ERROR PAGE
  { 
    path: '/error404', 
    name: 'ErrorPage', 
    component: ErrorPage 
  },
  // PAGE NOT FOUND (CATCH ALL) - 404 ERROR PAGE
  { 
    path: '/:pathMatch(.*)*', 
    name: 'ErrorPage', 
    component: ErrorPage 
  }
]

export default routesError
