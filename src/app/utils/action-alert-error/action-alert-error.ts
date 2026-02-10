import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'action-alert-error',
  imports: [],
  templateUrl: './action-alert-error.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionAlertError {
message = input<string>('Esta accion no se puede completar');

}
