import { Component, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { ArasList } from "../../../shared/components/areas/aras-list/aras-list";
import { AreaModal } from "../../../shared/components/areas/area-modal/area-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-areas-page',
  imports: [Navbar, ArasList, AreaModal, ModalDelete],
  templateUrl: './areas-page.html',
})
export default class AreasPage {
  areasService = inject(AreasService)
  onDeleteCheck() {

    this
      .areasService.deleteArea(this.areasService.selectedArea()!.id);
    // this.areasService.deleteArea(this.areasService.selectedArea()!.id)111;
    setTimeout(() => {
      this.areasService.resetIsSuccess();
    }, 2000);
  }
}
