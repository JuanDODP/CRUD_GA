import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersResponse, Usuario } from '../../interface/usuarios.interface';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UsuariosService {
  private http = inject(HttpClient);

  usuarios = signal<Usuario[]>([])

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
