import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Area } from '../../../../home/interface/asignaciones.interface';
import { Usuario } from '../../../../auth/interface/user.interface';

@Component({
  selector: 'app-add-asignacion-modal',
  imports: [],
  templateUrl: './add-asignacion-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAsignacionModal {
  areas = input.required<Area[]>();
  usuarios = input.required<Usuario[]>();

}
