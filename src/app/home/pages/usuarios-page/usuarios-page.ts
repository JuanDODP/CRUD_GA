import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { UsuariosList } from "../../../shared/components/usuarios/usuarios-list/usuarios-list";
import { UsuariosService } from '../services/usuarios.service';
import { ModalImagePreview } from "../../../utils/modal-image-preview/modal-image-preview";

@Component({
  selector: 'app-usuarios-page',
  imports: [Navbar, UsuariosList, ModalImagePreview],
  templateUrl: './usuarios-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsuariosPage {

  usuariosService=inject(UsuariosService)
}
