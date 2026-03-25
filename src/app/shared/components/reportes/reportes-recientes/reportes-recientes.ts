import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface AsignacionReciente {
  id: number;
  fechaAsignacion: string;
  usuario: { id: number; name: string; imagen?: string };
  proyecto: {
    id: number;
    nombreProyecto: string;
    imagen?: string;
    fechaInicio: Date;
    fechaFin: Date;
    area: { nombre: string };
  };
}

@Component({
  selector: 'app-reportes-recientes',
  imports: [],
  templateUrl: './reportes-recientes.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportesRecientes {
  asignaciones = input.required<AsignacionReciente[]>();

  readonly hoy = new Date();

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0, 2);
  }

  formatDate(date: string | Date): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }

  estadoProyecto(p: AsignacionReciente['proyecto']): { label: string; badgeClass: string } {
    const fin    = new Date(p.fechaFin);
    const inicio = new Date(p.fechaInicio);
    if (fin   < this.hoy)  return { label: 'Vencido',     badgeClass: 'badge-error'   };
    if (inicio > this.hoy) return { label: 'Por iniciar', badgeClass: 'badge-info'    };
    return                        { label: 'Activo',      badgeClass: 'badge-success' };
  }
}
