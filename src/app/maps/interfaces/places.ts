export interface PlacesResponse {
  type:        string;
  features:    Feature[];
  query:       string[];
  attribution: string;
}

export interface Feature {
  type:                 string;
  properties:           Properties;
  geometry:             Geometry;
  bbox:                 number[];
  center:               number[];
  place_name:           string;
  place_type:           string[];
  relevance:            number;
  id:                   string;
  text:                 string;
  place_type_name:      Array<null | string>;
  context:              Context[];
  language?:            string;
  text_es:              string;
  language_es?:         string;
  place_name_es:        string;
  matching_text?:       string;
  matching_place_name?: string;
}

export interface Context {
  ref:               string;
  country_code:      CountryCode;
  id:                string;
  text:              string;
  wikidata?:         string;
  kind:              Kind;
  text_es:           string;
  language?:         string;
  language_es?:      string;
  "osm:place_type"?: string;
}

export enum CountryCode {
  Co = "co",
}

export enum Kind {
  AdminArea = "admin_area",
  Place = "place",
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  ref:               string;
  country_code:      CountryCode;
  wikidata?:         string;
  kind:              string;
  place_type_name:   Array<null | string>;
  "osm:place_type"?: string;
}
