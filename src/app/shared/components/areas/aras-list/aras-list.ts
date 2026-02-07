import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Area, AreasReponse } from '../../../../home/interface/area.interface';
import { AreasService } from '../../../../home/pages/services/areas.service';
import { AlertSucess } from "../../../../utils/alert-sucess/alert-sucess";

@Component({
  selector: 'app-aras-list',
  imports: [AlertSucess],
  templateUrl: './aras-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArasList {
  public isOpen = false; // Esta es la que el botón pondrá en 'true'

  closeModal() {
    this.isOpen = false;
  }
  openModal(si_no: number) {

  }
  ejecutarEliminacion(id: number) {
    // Aquí llamas a tu servicio:
    // this.areasService.remove(id).subscribe(...)
  }
  // LLAMAR AL SERVICIO
  authService = inject(AreasService)
  areasService = inject(AreasService)

  clear() {
    this.areasService.clearSelectedArea();
  }
  // mandar a llamar las areas para mapeas
  areas = input.required<Area[]>();
  getAreas(area: any) {

    this.authService.setAreaForEdit(area)

  }
  isSuccess = this.areasService.isSuccess;

}
