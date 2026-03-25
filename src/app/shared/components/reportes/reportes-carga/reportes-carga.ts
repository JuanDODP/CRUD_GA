import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface CargaItem {
  usuario: { id: number; name: string; imagen?: string };
  count: number;
}

export interface ProxVencimiento {
  id: number;
  nombreProyecto: string;
  fechaFin: Date | string;
  imagen?: string;
  area: { nombre: string };
}

@Component({
  selector: 'app-reportes-carga',
  imports: [],
  templateUrl: './reportes-carga.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesCarga {
  cargaPorUsuario = input.required<CargaItem[]>();
  maxCarga        = input.required<number>();
  tasaCobertura   = input.required<number>();
  usuariosConAsig = input.required<number>();
  totalUsuarios   = input.required<number>();
  proxAVencer     = input.required<ProxVencimiento[]>();
  vencidosCount   = input.required<number>();

  readonly hoy = new Date();

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0, 2);
  }

  barWidth(count: number, max: number): string {
    if (max === 0) return '0%';
    return `${Math.max(Math.round((count / max) * 100), 2)}%`;
  }

  diasRestantes(fechaFin: string | Date): number {
    const fin  = new Date(fechaFin);
    const diff = fin.getTime() - this.hoy.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
