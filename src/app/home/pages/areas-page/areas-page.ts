import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { ArasList } from "../../../shared/components/areas/aras-list/aras-list";
import { AreaModal } from "../../../shared/components/areas/area-modal/area-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";

@Component({
  selector: 'app-areas-page',
  imports: [Navbar, ArasList, AreaModal, ModalDelete],
  templateUrl: './areas-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AreasPage { }
