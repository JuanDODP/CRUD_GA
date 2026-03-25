import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Navbar } from '../../../shared/components/home/navbar/navbar';
import { TableroColumna } from '../../../shared/components/tablero/tablero-columna/tablero-columna';
import { ProyectosService } from '../services/proyectos.service';
import { AsignacionesService } from '../services/asignaciones.service';
import { AreasService } from '../services/areas.service';
import { Proyecto } from '../../interface/proyectos.interface';

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  imagen?: string;
}

export interface TableroItem {
  proyecto: Proyecto;
  team: TeamMember[];
  daysLabel: string;
  daysColorClass: string;
  barColorClass: string;
}

@Component({
  selector: 'app-tablero-page',
  imports: [Navbar, TableroColumna],
  templateUrl: './tablero-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TableroPage {
  readonly proyectosService    = inject(ProyectosService);
  readonly asignacionesService = inject(AsignacionesService);
  readonly areasService        = inject(AreasService);

  readonly hoy = new Date();

  searchQuery    = signal('');
  selectedAreaId = signal<number | null>(null);
  expandedCard   = signal<number | null>(null);

  // ── Filtered base ─────────────────────────────────────────────────
  readonly proyectosFiltrados = computed(() => {
    const query  = this.searchQuery().toLowerCase().trim();
    const areaId = this.selectedAreaId();
    return this.proyectosService.proyectos().filter(p => {
      const matchesQuery = !query ||
        p.nombreProyecto.toLowerCase().includes(query) ||
        p.area.nombre.toLowerCase().includes(query);
      const matchesArea = !areaId || p.area.id === areaId;
      return matchesQuery && matchesArea;
    });
  });

  // ── Kanban columns (raw) ───────────────────────────────────────────
  readonly colPorIniciar = computed(() =>
    this.proyectosFiltrados()
      .filter(p => new Date(p.fechaInicio) > this.hoy)
      .sort((a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime())
  );

  readonly colActivos = computed(() =>
    this.proyectosFiltrados()
      .filter(p => {
        const start    = new Date(p.fechaInicio);
        const end      = new Date(p.fechaFin);
        const daysLeft = this.diasRestantes(p.fechaFin);
        return start <= this.hoy && end >= this.hoy && daysLeft > 30;
      })
      .sort((a, b) => new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime())
  );

  readonly colPorVencer = computed(() =>
    this.proyectosFiltrados()
      .filter(p => {
        const start    = new Date(p.fechaInicio);
        const end      = new Date(p.fechaFin);
        const daysLeft = this.diasRestantes(p.fechaFin);
        return start <= this.hoy && end >= this.hoy && daysLeft >= 0 && daysLeft <= 30;
      })
      .sort((a, b) => new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime())
  );

  readonly colVencidos = computed(() =>
    this.proyectosFiltrados()
      .filter(p => new Date(p.fechaFin) < this.hoy)
      .sort((a, b) => new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime())
  );

  // ── TableroItem computed arrays ────────────────────────────────────
  private toItems(
    proyectos: Proyecto[],
    daysLabelFn: (p: Proyecto) => string,
    daysColorFn: (p: Proyecto) => string,
    barColor: string,
  ): TableroItem[] {
    return proyectos.map(p => ({
      proyecto: p,
      team: this.getTeam(p.id).map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        imagen: u.imagen,
      })),
      daysLabel: daysLabelFn(p),
      daysColorClass: daysColorFn(p),
      barColorClass: barColor,
    }));
  }

  readonly itemsPorIniciar = computed(() =>
    this.toItems(
      this.colPorIniciar(),
      p => `Inicia en ${this.diasParaInicio(p.fechaInicio)}d`,
      _  => 'text-info',
      'bg-info',
    )
  );

  readonly itemsActivos = computed(() =>
    this.toItems(
      this.colActivos(),
      p => `${this.diasRestantes(p.fechaFin)}d restantes`,
      _  => 'text-success',
      'bg-success',
    )
  );

  readonly itemsPorVencer = computed(() =>
    this.toItems(
      this.colPorVencer(),
      p => `${this.diasRestantes(p.fechaFin)}d`,
      _  => 'text-warning',
      'bg-warning',
    )
  );

  readonly itemsVencidos = computed(() =>
    this.toItems(
      this.colVencidos(),
      p => `Hace ${this.diasRestantes(p.fechaFin) * -1}d`,
      _  => 'text-error',
      'bg-error',
    )
  );

  // ── Global stats ──────────────────────────────────────────────────
  readonly totalVisible = computed(() => this.proyectosFiltrados().length);

  // ── Helpers ───────────────────────────────────────────────────────
  getTeam(proyectoId: number) {
    return this.asignacionesService.asignaciones()
      .filter(a => a.proyecto.id === proyectoId)
      .map(a => a.usuario);
  }

  diasRestantes(fechaFin: string | Date): number {
    return Math.ceil((new Date(fechaFin).getTime() - this.hoy.getTime()) / (1000 * 60 * 60 * 24));
  }

  diasParaInicio(fechaInicio: string | Date): number {
    return Math.ceil((new Date(fechaInicio).getTime() - this.hoy.getTime()) / (1000 * 60 * 60 * 24));
  }

  setSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  setArea(id: number | null): void {
    this.selectedAreaId.set(id);
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.selectedAreaId.set(null);
  }

  toggleCard(id: number): void {
    this.expandedCard.set(this.expandedCard() === id ? null : id);
  }

  hasActiveFilters = computed(() =>
    this.searchQuery().trim() !== '' || this.selectedAreaId() !== null
  );
}
