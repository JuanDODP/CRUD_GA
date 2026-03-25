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
  selector: 'app-grafica-areas',
  imports: [],
  templateUrl: './grafica-areas.html',
  styles: `:host { display: block; width: 100%; height: 100%; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaAreas implements OnDestroy {
  data = input.required<{ label: string; count: number }[]>();

  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart: Chart | null = null;
  private ready = signal(false);

  private readonly AREA_COLORS = [
    '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9',
    '#06b6d4', '#14b8a6', '#22c55e', '#84cc16',
  ];

  private readonly C = {
    grid: 'rgba(0,0,0,0.06)',
    text: 'rgba(0,0,0,0.45)',
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
              label: 'Proyectos',
              data: d.map(x => x.count),
              backgroundColor: d.map((_, i) => this.AREA_COLORS[i % this.AREA_COLORS.length] + 'cc'),
              borderColor:     d.map((_, i) => this.AREA_COLORS[i % this.AREA_COLORS.length]),
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => ` ${ctx.raw} proyecto${Number(ctx.raw) !== 1 ? 's' : ''}`,
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: this.C.text, font: { size: 10 }, maxRotation: 35 },
              },
              y: {
                beginAtZero: true,
                grid: { color: this.C.grid },
                ticks: { color: this.C.text, font: { size: 10 }, stepSize: 1 },
              },
            },
          },
        });
      } else {
        this.chart.data.labels = d.map(x => x.label);
        this.chart.data.datasets[0].data = d.map(x => x.count);
        this.chart.data.datasets[0].backgroundColor = d.map((_, i) => this.AREA_COLORS[i % this.AREA_COLORS.length] + 'cc');
        this.chart.data.datasets[0].borderColor = d.map((_, i) => this.AREA_COLORS[i % this.AREA_COLORS.length]);
        this.chart.update('active');
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
