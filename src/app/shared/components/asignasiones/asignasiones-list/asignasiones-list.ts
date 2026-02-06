import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Asignacione } from '../../../../home/interface/asignaciones.interface';
import { DatePipe } from '@angular/common';
import { AsignacionesService } from '../../../../home/pages/services/asignaciones.service';

@Component({
  selector: 'app-asignasiones-list',
  imports: [DatePipe],
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

}
