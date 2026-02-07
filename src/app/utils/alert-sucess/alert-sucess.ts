import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-alert-sucess',
  imports: [],
  templateUrl: './alert-sucess.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertSucess {
message: string = 'Operación realizada con éxito!';

 }
