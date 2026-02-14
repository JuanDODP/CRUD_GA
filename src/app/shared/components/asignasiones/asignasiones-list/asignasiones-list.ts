import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Asignacione } from '../../../../home/interface/asignaciones.interface';
import { DatePipe } from '@angular/common';
import { AsignacionesService } from '../../../../home/pages/services/asignaciones.service';
import { AlertSucess } from "../../../../utils/alert-sucess/alert-sucess";

@Component({
  selector: 'app-asignasiones-list',
  imports: [DatePipe, AlertSucess],
  templateUrl: './asignasiones-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsignasionesList {
  asignaciones = input.required<Asignacione[]>();
  asignacionesService = inject(AsignacionesService);
  clear(){
    this.asignacionesService.clearSelectedAsignacion();
  }
  getAsignacion(asignacion:any) {
    this.asignacionesService.setAsignacionForEdit(asignacion)
  }
  isSuccess = this.asignacionesService.isSuccess;

  // descargart pdf
  dowloadPDF(item:any) {
    this.asignacionesService.exportToPDF(item.id);
  }
}
