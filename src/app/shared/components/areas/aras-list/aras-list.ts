import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Area, AreasReponse } from '../../../../home/interface/area.interface';

@Component({
  selector: 'app-aras-list',
  imports: [],
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
  // mandar a llamar las areas para mapeas
  areas = input.required<Area[]>();
}
