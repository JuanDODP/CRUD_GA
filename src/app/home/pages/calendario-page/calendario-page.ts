import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Navbar } from '../../../shared/components/home/navbar/navbar';
import { ProyectosService } from '../services/proyectos.service';
import { AreasService } from '../services/areas.service';
import { AsignacionesService } from '../services/asignaciones.service';
import { Proyecto } from '../../interface/proyectos.interface';
import { CalendarioGantt, ProjectStatus, ProyectoBar, TimelineRow, MonthSegment } from '../../../shared/components/calendario/calendario-gantt/calendario-gantt';
import { CalendarioDetalle } from '../../../shared/components/calendario/calendario-detalle/calendario-detalle';

@Component({
  selector: 'app-calendario-page',
  imports: [Navbar, CalendarioGantt, CalendarioDetalle],
  templateUrl: './calendario-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalendarioPage {
  readonly proyectosService    = inject(ProyectosService);
  readonly areasService        = inject(AreasService);
  readonly asignacionesService = inject(AsignacionesService);

  readonly hoy = new Date();
  selectedProyecto = signal<Proyecto | null>(null);

  // ── Timeline window: −3 months to +9 months ──────────────────────
  readonly timelineStart = computed(() => {
    const d = new Date(this.hoy);
    d.setMonth(d.getMonth() - 3);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  readonly timelineEnd = computed(() => {
    const d = new Date(this.timelineStart());
    d.setMonth(d.getMonth() + 12);
    return d;
  });

  readonly timelineDays = computed(() => {
    const diff = this.timelineEnd().getTime() - this.timelineStart().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  });

  // ── Month header segments ─────────────────────────────────────────
  readonly months = computed((): MonthSegment[] => {
    const result: MonthSegment[] = [];
    const start = this.timelineStart();
    const end   = this.timelineEnd();
    const total = this.timelineDays();
    const cur   = new Date(start);
    const now   = this.hoy;

    while (cur < end) {
      const monthStart = new Date(cur);
      const nextMonth  = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
      const clampedEnd = nextMonth < end ? nextMonth : end;

      const leftDays  = (monthStart.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      const widthDays = (clampedEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24);

      result.push({
        label: cur.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' }).toUpperCase(),
        left:  (leftDays / total) * 100,
        width: (widthDays / total) * 100,
        isCurrentMonth: cur.getMonth() === now.getMonth() && cur.getFullYear() === now.getFullYear(),
      });
      cur.setMonth(cur.getMonth() + 1);
    }
    return result;
  });

  // ── Today line position (%) ───────────────────────────────────────
  readonly todayLeft = computed(() => {
    const diff = this.hoy.getTime() - this.timelineStart().getTime();
    return (diff / (1000 * 60 * 60 * 24) / this.timelineDays()) * 100;
  });

  // ── Timeline rows per area ────────────────────────────────────────
  readonly rows = computed((): TimelineRow[] => {
    const start = this.timelineStart();
    const end   = this.timelineEnd();
    const total = this.timelineDays();
    const hoy   = this.hoy;

    return this.areasService.areas()
      .map(area => {
        const proyectos: ProyectoBar[] = this.proyectosService.proyectos()
          .filter(p => p.area.id === area.id)
          .filter(p => new Date(p.fechaInicio) < end && new Date(p.fechaFin) > start)
          .map(p => {
            const pStart       = new Date(p.fechaInicio);
            const pEnd         = new Date(p.fechaFin);
            const clampedStart = pStart < start ? start : pStart;
            const clampedEnd   = pEnd > end ? end : pEnd;
            const leftDays     = (clampedStart.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
            const widthDays    = Math.max(1, (clampedEnd.getTime() - clampedStart.getTime()) / (1000 * 60 * 60 * 24));

            let status: ProjectStatus;
            if (pEnd < hoy)        status = 'vencido';
            else if (pStart > hoy) status = 'por-iniciar';
            else                   status = 'activo';

            return {
              proyecto:   p,
              left:       (leftDays / total) * 100,
              width:      Math.max((widthDays / total) * 100, 0.4),
              outOfLeft:  pStart < start,
              outOfRight: pEnd > end,
              status,
            };
          });

        return { area, proyectos };
      })
      .filter(row => row.proyectos.length > 0);
  });

  // ── Detail: assignments for selected project ──────────────────────
  readonly selectedAsignaciones = computed(() => {
    const p = this.selectedProyecto();
    if (!p) return [];
    return this.asignacionesService.asignaciones().filter(a => a.proyecto.id === p.id);
  });

  readonly selectedStatus = computed((): ProjectStatus | null => {
    const p = this.selectedProyecto();
    if (!p) return null;
    const pEnd   = new Date(p.fechaFin);
    const pStart = new Date(p.fechaInicio);
    if (pEnd < this.hoy)   return 'vencido';
    if (pStart > this.hoy) return 'por-iniciar';
    return 'activo';
  });

  // ── KPI stats ─────────────────────────────────────────────────────
  readonly stats = computed(() => {
    const proyectos = this.proyectosService.proyectos();
    const hoy = this.hoy;
    return {
      total:      proyectos.length,
      activos:    proyectos.filter(p => new Date(p.fechaFin) >= hoy && new Date(p.fechaInicio) <= hoy).length,
      vencidos:   proyectos.filter(p => new Date(p.fechaFin) < hoy).length,
      porIniciar: proyectos.filter(p => new Date(p.fechaInicio) > hoy).length,
    };
  });

  selectProyecto(p: Proyecto): void {
    this.selectedProyecto.set(this.selectedProyecto()?.id === p.id ? null : p);
  }

  closeDetail(): void {
    this.selectedProyecto.set(null);
  }
}
