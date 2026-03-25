import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Navbar } from '../../../shared/components/home/navbar/navbar';
import { GraficaKpis } from '../../../shared/components/graficas/grafica-kpis/grafica-kpis';
import { GraficaEstado } from '../../../shared/components/graficas/grafica-estado/grafica-estado';
import { GraficaAreas } from '../../../shared/components/graficas/grafica-areas/grafica-areas';
import { GraficaCarga } from '../../../shared/components/graficas/grafica-carga/grafica-carga';
import { GraficaRoles } from '../../../shared/components/graficas/grafica-roles/grafica-roles';
import { GraficaTendencia } from '../../../shared/components/graficas/grafica-tendencia/grafica-tendencia';
import { ProyectosService } from '../services/proyectos.service';
import { AsignacionesService } from '../services/asignaciones.service';
import { AreasService } from '../services/areas.service';
import { UsuariosService } from '../services/usuarios.service';
import { Rol } from '../../interface/usuarios.interface';

@Component({
  selector: 'app-graficas-page',
  imports: [Navbar, GraficaKpis, GraficaEstado, GraficaAreas, GraficaCarga, GraficaRoles, GraficaTendencia],
  templateUrl: './graficas-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GraficasPage {
  readonly proyectosService    = inject(ProyectosService);
  readonly asignacionesService = inject(AsignacionesService);
  readonly areasService        = inject(AreasService);
  readonly usuariosService     = inject(UsuariosService);

  readonly hoy = new Date();
  isRefreshing = signal(false);

  // ── Chart data ────────────────────────────────────────────────────
  readonly dataEstado = computed(() => {
    const h = this.hoy;
    const ps = this.proyectosService.proyectos();
    return {
      activos:    ps.filter(p => new Date(p.fechaInicio) <= h && new Date(p.fechaFin) >= h).length,
      porIniciar: ps.filter(p => new Date(p.fechaInicio) > h).length,
      vencidos:   ps.filter(p => new Date(p.fechaFin) < h).length,
    };
  });

  readonly dataAreas = computed(() =>
    this.areasService.areas()
      .map(area => ({
        label: area.nombre,
        count: this.proyectosService.proyectos().filter(p => p.area.id === area.id).length,
      }))
      .sort((a, b) => b.count - a.count)
  );

  readonly dataCarga = computed(() =>
    this.usuariosService.usuarios()
      .map(u => ({
        label: u.name.split(' ')[0],
        count: this.asignacionesService.asignaciones().filter(a => a.usuario.id === u.id).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
  );

  readonly dataRoles = computed(() => {
    const us = this.usuariosService.usuarios();
    return {
      admin:     us.filter(u => String(u.rol) === Rol.Admin).length,
      superUser: us.filter(u => String(u.rol) === Rol.SuperUser).length,
      user:      us.filter(u => String(u.rol) === Rol.User).length,
    };
  });

  readonly dataTendencia = computed(() => {
    const result: { label: string; count: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(this.hoy);
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      d.setMonth(d.getMonth() - i);
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      result.push({
        label: d.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' }).toUpperCase(),
        count: this.proyectosService.proyectos().filter(p =>
          new Date(p.fechaInicio) < next && new Date(p.fechaFin) >= d
        ).length,
      });
    }
    return result;
  });

  // ── KPIs ──────────────────────────────────────────────────────────
  readonly kpis = computed(() => {
    const ps = this.proyectosService.proyectos();
    const as = this.asignacionesService.asignaciones();
    const us = this.usuariosService.usuarios();
    const h  = this.hoy;
    return {
      total:        ps.length,
      asignaciones: as.length,
      usuarios:     us.length,
      cobertura:    us.length
        ? Math.round(new Set(as.map(a => a.usuario.id)).size / us.length * 100)
        : 0,
      activos:      ps.filter(p => new Date(p.fechaInicio) <= h && new Date(p.fechaFin) >= h).length,
      promAsig:     us.length ? (as.length / us.length).toFixed(1) : '0.0',
    };
  });

  refresh(): void {
    this.isRefreshing.set(true);
    this.areasService.getAreas();
    this.proyectosService.getProyectos();
    this.asignacionesService.getAsignaciones();
    this.usuariosService.getUsers();
    setTimeout(() => this.isRefreshing.set(false), 800);
  }
}
