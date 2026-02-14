import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { UsuariosService } from '../../../../home/pages/services/usuarios.service';
import { Usuario } from '../../../../home/interface/usuarios.interface';

@Component({
  selector: 'app-usuarios-list',
  imports: [],
  templateUrl: './usuarios-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosList {
  usuariosService=inject(UsuariosService)
  usuarios = input.required<Usuario[]>();
  // limpiar datos de el usuario
  clear() {
    this.usuariosService.clearUser();
  }
  getUsuarios(usuario: any) {
    console.log('test usuario', usuario);
    this.usuariosService.setUserForEdit(usuario)
 }

}
