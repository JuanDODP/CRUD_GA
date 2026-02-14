import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersResponse, Usuario } from '../../interface/usuarios.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private http = inject(HttpClient);
  // editar modal
  update_or_create = signal<number>(0) // 0 para crear, 1 para editar;
  // 1. Creamos el signal para el usuario a editar
  usuarios = signal<Usuario[]>([])
  // logica para editar
  selectedUser = signal<Usuario | null>(null);
  setUserForEdit(usuario: Usuario) {
    this.selectedUser.set(usuario);
    this.update_or_create.set(1);
  }
  clearUser() {
    this.selectedUser.set(null);
    this.update_or_create.set(0);
  }


  constructor() {
    this.getUsers()
  }
  getUsers() {
    this.http.get<UsersResponse>(`${environment.baseUrl}/auth/users`).subscribe({
      next: (resp) => {
        this.usuarios.set(resp.usuarios);
      },
      error: (err) => {
        console.log("================================");
        console.log('OCURRIO UN ERROR AL OBTENER LOS USUARIOS', err);
        console.log("================================");
      }
    });
  }
}
