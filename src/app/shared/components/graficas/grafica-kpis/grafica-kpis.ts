import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-grafica-kpis',
  imports: [],
  templateUrl: './grafica-kpis.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaKpis {
  kpis = input.required<{
    total: number;
    asignaciones: number;
    usuarios: number;
    cobertura: number;
    activos: number;
    promAsig: string;
  }>();
}
