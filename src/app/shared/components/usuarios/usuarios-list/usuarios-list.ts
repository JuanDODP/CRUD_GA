import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { UsuariosService } from '../../../../home/pages/services/usuarios.service';
import { Usuario } from '../../../../home/interface/usuarios.interface';
import { AlertSucess } from "../../../../utils/alert-sucess/alert-sucess";
import { ActionAlertError } from "../../../../utils/action-alert-error/action-alert-error";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-usuarios-list',
  imports: [AlertSucess, ActionAlertError, CurrencyPipe],
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
isSuccess = this.usuariosService.isSuccess;
isError = this.usuariosService.isError;
}
