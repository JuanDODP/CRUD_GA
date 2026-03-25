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
  selector: 'app-grafica-tendencia',
  imports: [],
  templateUrl: './grafica-tendencia.html',
  styles: `:host { display: block; width: 100%; height: 100%; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraficaTendencia implements OnDestroy {
  data = input.required<{ label: string; count: number }[]>();

  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart: Chart | null = null;
  private ready = signal(false);

  private readonly C = {
    primary: { bg: 'rgba(139,92,246,0.85)', bd: '#8b5cf6' },
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
        const ctx = el.getContext('2d');
        if (!ctx) return;
        const gradient = ctx.createLinearGradient(0, 0, 0, 180);
        gradient.addColorStop(0, 'rgba(139,92,246,0.25)');
        gradient.addColorStop(1, 'rgba(139,92,246,0.00)');
        this.chart = new Chart(el, {
          type: 'line',
          data: {
            labels: d.map(x => x.label),
            datasets: [{
              label: 'Proyectos activos',
              data: d.map(x => x.count),
              fill: true,
              backgroundColor: gradient,
              borderColor: this.C.primary.bd,
              borderWidth: 2.5,
              pointBackgroundColor: this.C.primary.bd,
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 7,
              tension: 0.4,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => ` ${ctx.raw} proyectos activos en el mes`,
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: this.C.text, font: { size: 10 } },
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
        this.chart.update('active');
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
