import { Route } from '@/ts/type'
import AdminHome from '@/views/domain-admin/AdminHome.vue'
import VideosAdmin from '@/views/domain-admin/video/VideosAdmin.vue'
import ImportVideos from '@/views/domain-admin/video/ImportVideos.vue'
import EditVideo from '@/views/domain-admin/video/EditVideo.vue'
import ShipyardsAdmin from '@/views/domain-admin/shipyard/ShipyardsAdmin.vue'
import AddShipyard from '@/views/domain-admin/shipyard/AddShipyard.vue'
import EditShipyard from '@/views/domain-admin/shipyard/EditShipyard.vue'
import YachtsAdmin from '@/views/domain-admin/yacht/YachtsAdmin.vue'
import AddYacht from '@/views/domain-admin/yacht/AddYacht.vue'
import EditYacht from '@/views/domain-admin/yacht/EditYacht.vue'
import { userHasRoleAdmin } from '@/router/guard'
import { EntityStatus } from '@/ts/enum'

const routesAdmin: Route[] = [
  // ADMIN HOME
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome, 
    linkText: 'Admin Home',
    beforeEnter: userHasRoleAdmin
  },

  // VIDEOS ADMIN
  {
    path: '/admin/videos/:statusFilter/:pageNumber',
    name: 'VideosAdmin',
    component: VideosAdmin,
    props: ({ params }) => ({ 
      pageNumber: Number.parseInt(params.pageNumber, 10) || 1,
      statusFilter: params.statusFilter.toString() || EntityStatus.IMPORTED
    }),
    linkText: 'Videos Admin',
    beforeEnter: userHasRoleAdmin
  },
  {
    path: '/admin/import-videos',
    name: 'ImportVideos',
    component: ImportVideos,
    linkText: 'Import Videos',
    beforeEnter: userHasRoleAdmin
  },
  {
    path: '/admin/edit-video/:id',
    name: 'EditVideo',
    component: EditVideo,
    props: ({params}) => ({ id: Number.parseInt(params.id, 10) || 0 }),
    linkText: 'Edit Video',
    beforeEnter: userHasRoleAdmin
  },

  // SHIPYARDS ADMIN
  {
    path: '/admin/shipyards',
    name: 'ShipyardsAdmin',
    component: ShipyardsAdmin, 
    linkText: 'Shipyards Admin',
    beforeEnter: userHasRoleAdmin
  },
  {
    path: '/admin/add-shipyard',
    name: 'AddShipyard',
    component: AddShipyard, 
    linkText: 'Add Shipyard',
    beforeEnter: userHasRoleAdmin
  },
  {
    path: '/admin/edit-shipyard/:id',
    name: 'EditShipyard',
    component: EditShipyard,
    props: ({params}) => ({ id: Number.parseInt(params.id, 10) || 0 }),
    linkText: 'Edit Shipyard',
    beforeEnter: userHasRoleAdmin
  },

  // YACHTS ADMIN
  {
    path: '/admin/yachts',
    name: 'YachtsAdmin',
    component: YachtsAdmin, 
    linkText: 'Yachts Admin',
    beforeEnter: userHasRoleAdmin
  },
  {
    path: '/admin/add-yacht',
    name: 'AddYacht',
    component: AddYacht, 
    linkText: 'Add Yacht',
    beforeEnter: userHasRoleAdmin
  },
  {
    path: '/admin/edit-yacht/:id',
    name: 'EditYacht',
    component: EditYacht,
    props: ({params}) => ({ id: Number.parseInt(params.id, 10) || 0 }),
    linkText: 'Edit Yacht',
    beforeEnter: userHasRoleAdmin
  }
]

export default routesAdmin