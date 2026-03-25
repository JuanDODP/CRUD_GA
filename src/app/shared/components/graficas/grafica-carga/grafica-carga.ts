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
  selector: 'app-grafica-carga',
  imports: [],
  templateUrl: './grafica-carga.html',
  styles: `:host { display: block; width: 100%; height: 100%; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaCarga implements OnDestroy {
  data = input.required<{ label: string; count: number }[]>();

  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart: Chart | null = null;
  private ready = signal(false);

  private readonly C = {
    warning: { bg: 'rgba(245,158,11,0.85)', bd: '#f59e0b' },
    grid:    'rgba(0,0,0,0.06)',
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
          type: 'bar',
          data: {
            labels: d.map(x => x.label),
            datasets: [{
              label: 'Asignaciones',
              data: d.map(x => x.count),
              backgroundColor: this.C.warning.bg,
              borderColor:     this.C.warning.bd,
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            }],
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => ` ${ctx.raw} asignación${Number(ctx.raw) !== 1 ? 'es' : ''}`,
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: { color: this.C.grid },
                ticks: { color: this.C.text, font: { size: 10 }, stepSize: 1 },
              },
              y: {
                grid: { display: false },
                ticks: { color: this.C.text, font: { size: 11 } },
              },
            },
          },
        });
      } else {
        this.chart.data.labels = d.map(x => x.label);
        this.chart.data.datasets[0].data = d.map(x => x.count);
        this.chart.update('active');
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
