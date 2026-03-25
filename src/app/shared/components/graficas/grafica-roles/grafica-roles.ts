import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  effect,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafica-roles',
  imports: [],
  templateUrl: './grafica-roles.html',
  styles: `:host { display: block; width: 100%; height: 100%; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaRoles implements OnDestroy {
  data = input.required<{ admin: number; superUser: number; user: number }>();

  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart: Chart | null = null;
  private ready = signal(false);

  private readonly C = {
    error:   { bg: 'rgba(239,68,68,0.85)',  bd: '#ef4444' },
    warning: { bg: 'rgba(245,158,11,0.85)', bd: '#f59e0b' },
    info:    { bg: 'rgba(59,130,246,0.85)', bd: '#3b82f6' },
    text:    'rgba(0,0,0,0.45)',
  };

  constructor() {
    afterNextRender(() => this.ready.set(true));

    effect(() => {
      if (!this.ready()) return;
      const d = this.data();

      if (!this.chart) {
        const el = this.canvas()?.nativeElement;
        if (!el) return;
        this.chart = new Chart(el, {
          type: 'pie',
          data: {
            labels: ['Administrador', 'Super Usuario', 'Usuario'],
            datasets: [{
              data: [d.admin, d.superUser, d.user],
              backgroundColor: [this.C.error.bg, this.C.warning.bg, this.C.info.bg],
              borderColor:     [this.C.error.bd, this.C.warning.bd, this.C.info.bd],
              borderWidth: 2,
              hoverOffset: 10,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: this.C.text,
                  font: { size: 11 },
                  padding: 14,
                  usePointStyle: true,
                  pointStyleWidth: 8,
                },
              },
              tooltip: {
                callbacks: {
                  label: ctx => ` ${ctx.label}: ${ctx.raw} usuario${Number(ctx.raw) !== 1 ? 's' : ''}`,
                },
              },
            },
          },
        });
      } else {
        this.chart.data.datasets[0].data = [d.admin, d.superUser, d.user];
        this.chart.update('active');
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
