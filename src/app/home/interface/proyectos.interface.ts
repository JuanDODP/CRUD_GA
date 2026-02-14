export interface ProyectosResponse {
  ok:        boolean;
  proyectos: Proyecto[];
}

export interface Proyecto {
  id:             number;
  nombreProyecto: string;
  fechaInicio:    Date | string;
  fechaFin:       Date | string;
  imagen?:      string;

  area:           Area;
}

export interface Area {
  id:          number;
  nombre:      string;
  description: string;
  imagen?:      string;
}
