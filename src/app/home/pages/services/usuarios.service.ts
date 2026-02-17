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
   //  estado para manejar las operaciones
  isSuccess = signal<boolean>(false) // checking, exist, no-exist;
  // resetear el isSuccess
  resetIsSuccess() {
    this.isSuccess.set(false);
  }
   // estado para manejar errores
  isError = signal<boolean>(false);
  // resetear el isError
  resetIsError() {
    this.isError.set(false);
  }
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
  createUsuario(name: string, email: string, password: string, imagen: File | null, salary: number | string) {
    // que llega
    console.log("================================");
    console.log('QUE LLEGA AL SERVICE', { name, email, password, imagen, salary });
    console.log("================================");
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('salary', salary.toString());
    if (imagen) {
      formData.append('imagen', imagen);
    }

    this.http.post<any>(`${environment.baseUrl}/auth/register`, formData).subscribe({
      next: (resp) => {
        console.log('LA RESPUESTA DE USUARIOS ES', resp);
        const nuevoUsuario = resp?.user;
        this.usuarios.update((usuarios) => [...usuarios, nuevoUsuario]);
        this.isSuccess.set(true);
      },
      error: (err) => {
        console.log("================================");
        console.log('OCURRIO UN ERROR AL CREAR EL USUARIO', err);
        console.log("================================");
        this.isError.set(true);
        setTimeout(() => {
          this.resetIsError();
        }, 4000);
      }
    });
  }
  updateUsuario(id: number, name: string, email: string, password?: string, imagen?: File | null, salary?: number | string) {
    // que llega
    console.log("================================");
    console.log('QUE LLEGA AL SERVICE PARA ACTUALIZAR', { id, name, email, password, imagen, salary });
    console.log("================================");
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password!);
    formData.append('salary', salary!.toString());
    if (imagen) {
      formData.append('imagen', imagen);
    }
    if(password === '') {
      formData.delete('password');
    }

    this.http.patch<any>(`${environment.baseUrl}/auth/users/${id}`, formData).subscribe({
      next: (resp) => {
        console.log("================================");
        console.log('LA RESPUESTA DE USUARIOS ES', resp);
        console.log("================================");
        const usuarioActualizado = resp?.usuario;
        this.usuarios.update((usuarios) =>
          usuarios.map((usuario) =>
            usuario.id === id ? usuarioActualizado : usuario
          )
        );
        this.isSuccess.set(true);
      },
      error: (err) => {
        console.log("================================");
        console.log('OCURRIO UN ERROR AL ACTUALIZAR EL USUARIO', err);
        console.log("================================");
        this.isError.set(true);
        setTimeout(() => {
          this.resetIsError();
        }, 4000);
      }
    });
  }
  deleteUser(id: number) {
    this.http.delete(`${environment.baseUrl}/auth/users/${id}`).subscribe({
      next: () => {
        this.usuarios.update((usuarios) => usuarios.filter(usuario => usuario.id !== id));
        this.isSuccess.set(true);
      },
      error: (err) => {
        console.log("================================");
        console.log('OCURRIO UN ERROR AL ELIMINAR EL USUARIO', err);
        console.log("================================");
        this.isError.set(true);
        setTimeout(() => {
          this.resetIsError();
        }, 4000);
      }
    });
  }
}
