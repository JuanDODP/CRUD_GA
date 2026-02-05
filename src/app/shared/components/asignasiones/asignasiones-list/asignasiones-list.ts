import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Asignacione } from '../../../../home/interface/asignaciones.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-asignasiones-list',
  imports: [DatePipe],
  templateUrl: './asignasiones-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsignasionesList {
  asignaciones = input.required<Asignacione[]>();
}
