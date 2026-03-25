import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface AreaConProyectos {
  area: { id: number; nombre: string; description: string; imagen?: string };
  count: number;
}

export interface RolDistribucion {
  label: string;
  count: number;
  pct: number;
  color: string;
  text: string;
}

@Component({
  selector: 'app-reportes-proyectos',
  imports: [],
  templateUrl: './reportes-proyectos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesProyectos {
  proyectosPorArea  = input.required<AreaConProyectos[]>();
  maxPorArea        = input.required<number>();
  areaMasActiva     = input<AreaConProyectos | null>(null);
  activosCount      = input.required<number>();
  porIniciarCount   = input.required<number>();
  proxAVencerCount  = input.required<number>();
  vencidosCount     = input.required<number>();
  totalProyectos    = input.required<number>();
  totalUsuarios     = input.required<number>();
  pctActivos        = input.required<number>();
  distribucionRoles = input.required<RolDistribucion[]>();

  barWidth(count: number, max: number): string {
    if (max === 0) return '0%';
    return `${Math.max(Math.round((count / max) * 100), 2)}%`;
  }
}
