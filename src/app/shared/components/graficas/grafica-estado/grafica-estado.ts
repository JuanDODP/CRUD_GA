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
  selector: 'app-grafica-estado',
  imports: [],
  templateUrl: './grafica-estado.html',
  styles: `:host { display: block; width: 100%; height: 100%; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaEstado implements OnDestroy {
  data = input.required<{ activos: number; porIniciar: number; vencidos: number }>();

  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart: Chart | null = null;
  private ready = signal(false);

  private readonly C = {
    success: { bg: 'rgba(34,197,94,0.85)',  bd: '#22c55e' },
    info:    { bg: 'rgba(59,130,246,0.85)', bd: '#3b82f6' },
    error:   { bg: 'rgba(239,68,68,0.85)',  bd: '#ef4444' },
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
          type: 'doughnut',
          data: {
            labels: ['Activos', 'Por iniciar', 'Vencidos'],
            datasets: [{
              data: [d.activos, d.porIniciar, d.vencidos],
              backgroundColor: [this.C.success.bg, this.C.info.bg, this.C.error.bg],
              borderColor:     [this.C.success.bd, this.C.info.bd, this.C.error.bd],
              borderWidth: 2,
              hoverOffset: 10,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
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
                  label: ctx => ` ${ctx.label}: ${ctx.raw} proyectos`,
                },
              },
            },
          },
        });
      } else {
        this.chart.data.datasets[0].data = [d.activos, d.porIniciar, d.vencidos];
        this.chart.update('active');
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
