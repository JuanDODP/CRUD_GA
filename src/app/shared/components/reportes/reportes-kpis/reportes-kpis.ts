import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-reportes-kpis',
  imports: [],
  templateUrl: './reportes-kpis.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesKpis {
  totalAreas        = input.required<number>();
  totalProyectos    = input.required<number>();
  totalAsignaciones = input.required<number>();
  totalUsuarios     = input.required<number>();
  activosCount      = input.required<number>();
  vencidosCount     = input.required<number>();
  promedioAsig      = input.required<string>();
  tasaCobertura     = input.required<number>();
}
