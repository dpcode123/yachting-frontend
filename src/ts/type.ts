export type Route = {
  path: string,
  name: string,
  component: any,
  props?: any,
  linkText?: string,
  beforeEnter?: any
}

export type RouteLink = {
  routeName: string,
  text: string,
  params?: {}
}

export type ImportVideosByKeywordCommand = {
  keyword: string,
  pageToken: string,
  maxResults: number,
  yachtId: number
}

export type VideoCommand = {
  title: string,
  youtubeId: string,
  yachtId?: number | null,
  shipyardId?: number | null
}

