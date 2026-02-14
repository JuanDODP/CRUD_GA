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
 }
