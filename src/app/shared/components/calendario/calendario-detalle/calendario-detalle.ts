import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

interface ProyectoSimple {
  id: number;
  nombreProyecto: string;
  fechaInicio: Date | string;
  fechaFin: Date | string;
  area: { nombre: string };
}

interface AsignacionSimple {
  id: number;
  usuario: { id: number; name: string; email: string; imagen?: string };
}

@Component({
  selector: 'app-calendario-detalle',
  templateUrl: './calendario-detalle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioDetalle {
  proyecto     = input.required<ProyectoSimple>();
  asignaciones = input.required<AsignacionSimple[]>();
  status       = input.required<'activo' | 'vencido' | 'por-iniciar'>();

  cerrar = output<void>();

  readonly hoy = new Date();

  getStatusBadge(status: 'activo' | 'vencido' | 'por-iniciar'): string {
    return status === 'activo' ? 'badge-success' : status === 'vencido' ? 'badge-error' : 'badge-info';
  }

  getStatusLabel(status: 'activo' | 'vencido' | 'por-iniciar'): string {
    return status === 'activo' ? 'Activo' : status === 'vencido' ? 'Vencido' : 'Por iniciar';
  }

  formatDate(date: string | Date): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  diasRestantes(fechaFin: string | Date): number {
    return Math.ceil((new Date(fechaFin).getTime() - this.hoy.getTime()) / (1000 * 60 * 60 * 24));
  }

  diasParaInicio(fechaInicio: string | Date): number {
    return Math.ceil((new Date(fechaInicio).getTime() - this.hoy.getTime()) / (1000 * 60 * 60 * 24));
  }

  duracion(fechaInicio: string | Date, fechaFin: string | Date): number {
    return Math.ceil((new Date(fechaFin).getTime() - new Date(fechaInicio).getTime()) / (1000 * 60 * 60 * 24));
  }

  getProgressPct(fechaInicio: string | Date, fechaFin: string | Date): number {
    const total = this.duracion(fechaInicio, fechaFin);
    if (total <= 0) return 100;
    const remaining = this.diasRestantes(fechaFin);
    return Math.max(0, Math.min(100, Math.round(100 - (remaining * 100 / total))));
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0, 2);
  }
}
