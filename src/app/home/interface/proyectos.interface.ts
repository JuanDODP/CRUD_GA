export interface ProyectosResponse {
  ok:        boolean;
  proyectos: Proyecto[];
}

export interface Proyecto {
  id:             number;
  nombreProyecto: string;
  fechaInicio:    Date;
  fechaFin:       Date;
  area:           Area;
}

export interface Area {
  id:          number;
  nombre:      string;
  description: string;
}
