
export interface Character {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: string | null;
  originPlanet: OriginPlanet;
  transformations: Transformation[];
  
}

export interface OriginPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: string | null;
}

export interface Transformation {
  name: string;
  kiIncrease: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Links {
  first: string;
  previous: string | null;
  next: string | null;
  last: string;
}

export interface CharactersResponse {
  items: Character[];
  meta: Meta;
  links: Links;
}
