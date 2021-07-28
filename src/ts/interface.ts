export interface Shipyard {
  id: number,
  name: string,
  country: string,
  yearFounded: number,
  websiteUrl: string,
  youtubeChannelUrl: string
}

export interface Yacht {
  id: number,
  shipyard: Shipyard,
  modelName: string,
  lengthOverallMeters: number
  beamMeters: number,
  imageYoutubeId: string
}

export interface Video {
  id: number,
  title: string,
  yacht: Yacht | null,
  youtubeId: string,
  importedAt: Date,
  activeUpdatedAt: Date,
  publishedUpdatedAt: Date
}

export interface VideoWithRelatedVideos extends Video {
  relatedVideosSameYacht: [],
  relatedVideosSameShipyard: []
}

export interface EntityPage {
  content: {}[],
  empty: boolean,
  first: boolean,
  last: boolean,
  number: number,
  numberOfElements: number,
  pageable: {},
  size: number,
  sort: {},
  totalElements: number,
  totalPages: number
}

export interface StaticPage {
  title: string,
  text: string
}

