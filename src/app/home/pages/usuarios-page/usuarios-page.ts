import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { UsuariosList } from "../../../shared/components/usuarios/usuarios-list/usuarios-list";
import { UsuariosService } from '../services/usuarios.service';
import { ModalImagePreview } from "../../../utils/modal-image-preview/modal-image-preview";
import { UsuariosModal } from "../../../shared/components/usuarios/usuarios-modal/usuarios-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";

@Component({
  selector: 'app-usuarios-page',
  imports: [Navbar, UsuariosList, ModalImagePreview, UsuariosModal, ModalDelete],
  templateUrl: './usuarios-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsuariosPage {

  usuariosService=inject(UsuariosService)

  onDeleteCheck() {
    const userId = this.usuariosService.selectedUser()?.id;
    if (userId) {
      this.usuariosService.deleteUser(userId);
         setTimeout(() => {
        this.usuariosService.resetIsSuccess();
      }, 2000);
    }
  }
}
