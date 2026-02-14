import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Navbar } from "../../../shared/components/home/navbar/navbar";
import { AsignasionesList } from "../../../shared/components/asignasiones/asignasiones-list/asignasiones-list";
import { AddAsignacionModal } from "../../../shared/components/asignasiones/add-asignacion-modal/add-asignacion-modal";
import { ModalDelete } from "../../../utils/modal-delete/modal-delete";
import { AsignacionesService } from '../services/asignaciones.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AreasService } from '../services/areas.service';
import { ProyectosService } from '../services/proyectos.service';
import { ModalDownloadPdf } from "../../../utils/modal-download-pdf/modal-download-pdf";

@Component({
  selector: 'app-asignasiones-page',
  imports: [Navbar, AsignasionesList, AddAsignacionModal, ModalDelete, ModalDownloadPdf],
  templateUrl: './asignasiones-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AsignasionesPage {

  asignacionesService = inject(AsignacionesService);
  areasService = inject(AreasService);
  proyectosService = inject(ProyectosService);
  authService = inject(AuthService);
   downloadPdf(){
     const asignacion = this.asignacionesService.selectedAsignacion();
     console.log("SEPARAR ")
     console.log('SE ESTA EJECUTANDO LA FUNCION DE DESCARGAR PDF', asignacion);
     console.log("SEPARAR ")
    if (asignacion) {
      this.asignacionesService.exportToPDF(asignacion.id);
    }
  }
  ngOnInit():void{
    this.authService.getUsers()
  }
  onDeleteCheck() {
    const asignacion = this.asignacionesService.selectedAsignacion();
     if (asignacion) {
       this.asignacionesService.deleteAsignacion(asignacion.id);
       this.asignacionesService.clearSelectedAsignacion();
        setTimeout(() => {
         this.asignacionesService.resetIsSuccess();
       }, 2000);
     }


    }

}
