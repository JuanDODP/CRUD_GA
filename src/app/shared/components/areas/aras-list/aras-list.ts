import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ModalDelete } from "../../../../utils/modal-delete/modal-delete";

@Component({
  selector: 'app-aras-list',
  imports: [ModalDelete],
  templateUrl: './aras-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArasList {
  public isOpen = false; // Esta es la que el botón pondrá en 'true'

  closeModal() {
    this.isOpen = false;
  }
  ejecutarEliminacion(id: number) {
  console.log('Eliminando el área con ID:', id);
  // Aquí llamas a tu servicio:
  // this.areasService.remove(id).subscribe(...)
}
}
