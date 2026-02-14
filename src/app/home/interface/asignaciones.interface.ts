export interface AsignacionesResponse {
  ok:           boolean;
  asignaciones: Asignacione[];
}

export interface Asignacione {
  id:              number;
  fechaAsignacion: string;
  usuario:         Usuario;
  proyecto:        Proyecto;
}

export interface Proyecto {
  id:             number;
  nombreProyecto: string;
  fechaInicio:    Date;
  fechaFin:       Date;
  imagen?:       string;
  area:           Area;
}

export interface Area {
  id:          number;
  nombre:      string;
  description: string;
    imagen?:      string;
}

export interface Usuario {
  id:            number;
  name:          string;
  email:         string;
  password?:      string;
  isActive:      boolean;
  rol:           string[];
  fechaRegistro: Date;
}
