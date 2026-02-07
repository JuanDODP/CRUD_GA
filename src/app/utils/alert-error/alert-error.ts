import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  imports: [],
  templateUrl: './alert-error.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertError {

  message: string = 'Por favor, complete todos los campos correctamente.';
}
