import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { UsuariosList } from "../../../shared/components/usuarios/usuarios-list/usuarios-list";
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuarios-page',
  imports: [Navbar, UsuariosList],
  templateUrl: './usuarios-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsuariosPage {

  usuariosService=inject(UsuariosService)
}
