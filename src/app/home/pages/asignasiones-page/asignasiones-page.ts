import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { AsignasionesList } from "../../../shared/components/asignasiones/asignasiones-list/asignasiones-list";
import { AddAsignacionModal } from "../../../shared/components/asignasiones/add-asignacion-modal/add-asignacion-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";
import { AsignacionesService } from '../services/asignaciones.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AreasService } from '../services/areas.service';
import { ProyectosService } from '../services/proyectos.service';

@Component({
  selector: 'app-asignasiones-page',
  imports: [Navbar, AsignasionesList, AddAsignacionModal, ModalDelete],
  templateUrl: './asignasiones-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AsignasionesPage {

  asignacionesService = inject(AsignacionesService);
  areasService = inject(AreasService);
  proyectosService = inject(ProyectosService);
  authService = inject(AuthService);

  ngOnInit():void{
    this.authService.getUsers()
  }
  onDeleteCheck() {
    const asignacion = this.asignacionesService.selectedAsignacion();
     if (asignacion) {
       this.asignacionesService.deleteAsignacion(asignacion.id);
       this.asignacionesService.clearSelectedAsignacion();
     }



  }
}
