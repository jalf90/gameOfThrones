export interface Resource {
  name: string,
  children: ResourceChild[]
}

export interface ResourceChild {
  name: string,
  role?: string,
  displayOrder?: number,
  details: ResourceDetail
}

export interface ResourceDetail {
  description: string,
  episodes?: number,
  transmitionDates?: string,
  productionDates?: string,
  releaseDate?: string,
  birth?: string,
  city?: string,
  rate?: number,
  votes?: number
}

export enum ResourceType {
  Season = 1,
  Episode = 2,
  Cast = 3
}
