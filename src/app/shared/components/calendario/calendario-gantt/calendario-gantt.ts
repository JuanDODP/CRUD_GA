import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  input,
  output,
  viewChild,
} from '@angular/core';

export type ProjectStatus = 'activo' | 'vencido' | 'por-iniciar';

export interface ProyectoBar {
  proyecto: {
    id: number;
    nombreProyecto: string;
    fechaInicio: Date | string;
    fechaFin: Date | string;
    area: { id: number; nombre: string };
  };
  left: number;
  width: number;
  outOfLeft: boolean;
  outOfRight: boolean;
  status: ProjectStatus;
}

export interface TimelineRow {
  area: { id: number; nombre: string };
  proyectos: ProyectoBar[];
}

export interface MonthSegment {
  label: string;
  left: number;
  width: number;
  isCurrentMonth: boolean;
}

@Component({
  selector: 'app-calendario-gantt',
  templateUrl: './calendario-gantt.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioGantt {
  rows       = input.required<TimelineRow[]>();
  months     = input.required<MonthSegment[]>();
  todayLeft  = input.required<number>();
  selectedId = input<number | null>(null);

  selectProyecto = output<any>();

  private timelineScrollEl = viewChild<ElementRef>('timelineScroll');

  constructor() {
    afterNextRender(() => {
      const el = this.timelineScrollEl()?.nativeElement as HTMLElement | undefined;
      if (el) {
        const scrollTarget = (this.todayLeft() / 100) * el.scrollWidth - el.clientWidth * 0.35;
        el.scrollLeft = Math.max(0, scrollTarget);
      }
    });
  }

  getStatusBg(status: ProjectStatus): string {
    return status === 'activo' ? 'bg-success' : status === 'vencido' ? 'bg-error' : 'bg-info';
  }

  getStatusLabel(status: ProjectStatus): string {
    return status === 'activo' ? 'Activo' : status === 'vencido' ? 'Vencido' : 'Por iniciar';
  }
}
