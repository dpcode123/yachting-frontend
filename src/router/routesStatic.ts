import { Route } from '@/ts/type'
import StaticPage from '@/views/static-page/StaticPage.vue'
import { StaticPageName } from '@/ts/enum'


const routesStatic: Route[]  = [
  // PREDEFINED STATIC PAGES
  {
    path: '/about',
    name: 'About',
    component: StaticPage,
    props: () => ({ pageName: StaticPageName.ABOUT }),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: StaticPage,
    props: () => ({ pageName: StaticPageName.TERMS_OF_SERVICE }),
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: StaticPage,
    props: () => ({ pageName: StaticPageName.PRIVACY_POLICY }),
  },
  
  // GENERIC STATIC PAGE
  {
    path: '/static-page/:pageName',
    name: 'GenericStaticPage',
    component: StaticPage,
    props: true
  },
]

export default routesStatic