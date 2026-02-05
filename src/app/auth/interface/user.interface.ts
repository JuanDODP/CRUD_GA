export interface User {
    id:       number;
    name:     string;
    email:    string;
    password: string;
    isActive: boolean;
    rol:      string[];
    token:    string;
}
export interface AllUsers {
  ok:       boolean;
  usuarios: Usuario[];
}

export interface Usuario {
  id:    number;
  name:  string;
  email: string;
  rol:   string[];
}
