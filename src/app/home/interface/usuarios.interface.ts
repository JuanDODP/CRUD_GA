export interface UsersResponse {
  ok:       boolean;
  usuarios: Usuario[];
}

export interface Usuario {
  id:     number;
  name:   string;
  email:  string;
  rol:    Rol;
  imagen: string;
  salary?: number | string;
}

export enum Rol {
  Admin = "admin",
  SuperUser = "super-user",
  User = "user",
}
