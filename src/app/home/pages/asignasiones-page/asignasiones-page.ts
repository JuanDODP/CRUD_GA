import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { AsignasionesList } from "../../../shared/components/asignasiones/asignasiones-list/asignasiones-list";
import { AddAsignacionModal } from "../../../shared/components/asignasiones/add-asignacion-modal/add-asignacion-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";
import { AsignacionesService } from '../services/asignaciones.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-asignasiones-page',
  imports: [Navbar, AsignasionesList, AddAsignacionModal, ModalDelete],
  templateUrl: './asignasiones-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AsignasionesPage {

  asignacionesService = inject(AsignacionesService);
  areasService = inject(AreasService);
  authService = inject(AuthService);

  ngOnInit():void{
    console.log('Se ejecuta cadaa que se monta ')
    this.authService.getUsers()
  }
}
