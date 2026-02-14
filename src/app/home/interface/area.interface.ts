export interface AreasReponse {
  ok:    boolean;
  areas: Area[];
}

export interface Area {
  id:          number;
  nombre:      string;
  description: string;
  imagen:      string;
}
