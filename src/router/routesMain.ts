import { Route } from '@/ts/type'
import Videos from '@/views/domain-user/video/Videos.vue'
import VideoDetails from '@/views/domain-user/video/VideoDetails.vue'
import Yachts from '@/views/domain-user/yacht/Yachts.vue'
import YachtDetails from '@/views/domain-user/yacht/YachtDetails.vue'
import Shipyards from '@/views/domain-user/shipyard/Shipyards.vue'
import ShipyardDetails from '@/views/domain-user/shipyard/ShipyardDetails.vue'

const routesMain: Route[] = [
  {
    path: '/',
    name: 'Home',
    component: Videos,
    props: true
  },

  // VIDEOS
  {
    path: '/videos/:pageNumber?',
    name: 'Videos',
    component: Videos,
    props: ({params}) => ({ pageNumber: Number.parseInt(params.pageNumber, 10) || 1 })
  },
  {
    path: '/video/:id',
    name: 'VideoDetails',
    component: VideoDetails,
    props: ({params}) => ({ id: Number.parseInt(params.id, 10) || 0 })
  },

  // YACHTS
  {
    path: '/yachts',
    name: 'Yachts',
    component: Yachts
  },
  {
    path: '/yacht/:id',
    name: 'YachtDetails',
    component: YachtDetails,
    props: ({params}) => ({ id: Number.parseInt(params.id, 10) || 0 })
  },

  // SHIPYARDS
  {
    path: '/shipyards',
    name: 'Shipyards',
    component: Shipyards
  },
  {
    path: '/shipyard/:id',
    name: 'ShipyardDetails',
    component: ShipyardDetails,
    props: ({params}) => ({ id: Number.parseInt(params.id, 10) || 0 })
  },
  
]

export default routesMain
