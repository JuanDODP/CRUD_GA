import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Navbar } from '../../../shared/components/home/navbar/navbar';
import { AreasService } from '../services/areas.service';
import { ProyectosService } from '../services/proyectos.service';
import { AsignacionesService } from '../services/asignaciones.service';
import { UsuariosService } from '../services/usuarios.service';
import { Rol } from '../../interface/usuarios.interface';
import { ReportesKpis } from '../../../shared/components/reportes/reportes-kpis/reportes-kpis';
import { ReportesProyectos } from '../../../shared/components/reportes/reportes-proyectos/reportes-proyectos';
import { ReportesCarga } from '../../../shared/components/reportes/reportes-carga/reportes-carga';
import { ReportesRecientes } from '../../../shared/components/reportes/reportes-recientes/reportes-recientes';

@Component({
  selector: 'app-reportes-page',
  imports: [Navbar, ReportesKpis, ReportesProyectos, ReportesCarga, ReportesRecientes],
  templateUrl: './reportes-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReportesPage {
  readonly areasService        = inject(AreasService);
  readonly proyectosService    = inject(ProyectosService);
  readonly asignacionesService = inject(AsignacionesService);
  readonly usuariosService     = inject(UsuariosService);

  isRefreshing = signal(false);

  // ── Fecha de referencia ───────────────────────────────────────
  readonly hoy = new Date();

  // ══════════════════════════════════════════════════════════════
  // KPIs GLOBALES
  // ══════════════════════════════════════════════════════════════
  totalAreas        = computed(() => this.areasService.areas().length);
  totalProyectos    = computed(() => this.proyectosService.proyectos().length);
  totalAsignaciones = computed(() => this.asignacionesService.asignaciones().length);
  totalUsuarios     = computed(() => this.usuariosService.usuarios().length);

  // ══════════════════════════════════════════════════════════════
  // PROYECTOS — Estado y distribución
  // ══════════════════════════════════════════════════════════════
  proyectosActivos = computed(() =>
    this.proyectosService.proyectos().filter(p => {
      const fin    = new Date(p.fechaFin);
      const inicio = new Date(p.fechaInicio);
      return fin >= this.hoy && inicio <= this.hoy;
    })
  );

  proyectosVencidos = computed(() =>
    this.proyectosService.proyectos().filter(p => new Date(p.fechaFin) < this.hoy)
  );

  proyectosPorIniciar = computed(() =>
    this.proyectosService.proyectos().filter(p => new Date(p.fechaInicio) > this.hoy)
  );

  /** Proyectos cuyo fin es en los próximos 30 días */
  proyectosProxAVencer = computed(() => {
    const limite = new Date(this.hoy);
    limite.setDate(limite.getDate() + 30);
    return this.proyectosService.proyectos()
      .filter(p => {
        const fin = new Date(p.fechaFin);
        return fin >= this.hoy && fin <= limite;
      })
      .sort((a, b) => new Date(a.fechaFin).getTime() - new Date(b.fechaFin).getTime());
  });

  pctActivos = computed(() => {
    const total = this.totalProyectos();
    if (total === 0) return 0;
    return Math.round((this.proyectosActivos().length / total) * 100);
  });

  // ══════════════════════════════════════════════════════════════
  // DISTRIBUCIÓN: Proyectos por Área
  // ══════════════════════════════════════════════════════════════
  proyectosPorArea = computed(() =>
    this.areasService.areas()
      .map(area => {
        const lista = this.proyectosService.proyectos().filter(p => p.area.id === area.id);
        return { area, lista, count: lista.length };
      })
      .sort((a, b) => b.count - a.count)
  );

  maxProyectosPorArea = computed(() =>
    Math.max(...this.proyectosPorArea().map(d => d.count), 1)
  );

  areaMasActiva = computed(() => this.proyectosPorArea()[0] ?? null);

  // ══════════════════════════════════════════════════════════════
  // CARGA LABORAL por usuario (top 6)
  // ══════════════════════════════════════════════════════════════
  cargaPorUsuario = computed(() =>
    this.usuariosService.usuarios()
      .map(usuario => ({
        usuario,
        count: this.asignacionesService.asignaciones().filter(a => a.usuario.id === usuario.id).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
  );

  maxCargaUsuario = computed(() =>
    Math.max(...this.cargaPorUsuario().map(c => c.count), 1)
  );

  usuariosConAsignacion = computed(() => {
    const asignados = new Set(
      this.asignacionesService.asignaciones().map(a => a.usuario.id)
    );
    return asignados.size;
  });

  tasaCobertura = computed(() => {
    const total = this.totalUsuarios();
    if (total === 0) return 0;
    return Math.round((this.usuariosConAsignacion() / total) * 100);
  });

  promedioAsignaciones = computed(() => {
    const total = this.totalUsuarios();
    if (total === 0) return '0.0';
    return (this.totalAsignaciones() / total).toFixed(1);
  });

  // ══════════════════════════════════════════════════════════════
  // DISTRIBUCIÓN DE ROLES
  // ══════════════════════════════════════════════════════════════
  distribucionRoles = computed(() => {
    const usuarios = this.usuariosService.usuarios();
    const total = usuarios.length || 1;
    const admin     = usuarios.filter(u => String(u.rol) === Rol.Admin).length;
    const superUser = usuarios.filter(u => String(u.rol) === Rol.SuperUser).length;
    const user      = usuarios.filter(u => String(u.rol) === Rol.User).length;
    return [
      { label: 'Administrador', count: admin,     pct: Math.round((admin / total) * 100),     color: 'bg-error',   text: 'text-error'   },
      { label: 'Super Usuario', count: superUser, pct: Math.round((superUser / total) * 100), color: 'bg-warning', text: 'text-warning' },
      { label: 'Usuario',       count: user,      pct: Math.round((user / total) * 100),      color: 'bg-info',    text: 'text-info'    },
    ];
  });

  // ══════════════════════════════════════════════════════════════
  // ASIGNACIONES RECIENTES (últimas 8, ordenadas por fecha desc)
  // ══════════════════════════════════════════════════════════════
  asignacionesRecientes = computed(() =>
    [...this.asignacionesService.asignaciones()]
      .sort((a, b) =>
        new Date(b.fechaAsignacion).getTime() - new Date(a.fechaAsignacion).getTime()
      )
      .slice(0, 8)
  );

  // ══════════════════════════════════════════════════════════════
  // ACCIONES
  // ══════════════════════════════════════════════════════════════
  refresh(): void {
    this.isRefreshing.set(true);
    this.areasService.getAreas();
    this.proyectosService.getProyectos();
    this.asignacionesService.getAsignaciones();
    this.usuariosService.getUsers();
    setTimeout(() => this.isRefreshing.set(false), 800);
  }

  // ══════════════════════════════════════════════════════════════
  // HELPERS (kept for header date display)
  // ══════════════════════════════════════════════════════════════
  formatDate(date: string | Date): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  }
}
