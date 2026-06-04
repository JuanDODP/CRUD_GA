import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
export interface Options {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}
@Component({
  selector: 'app-navbar-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarOptions {

  options: Options[] = [
    {
      label: 'AREAS',
      sublabel: 'Sublabel 1',
      route: '/areas',
      icon: 'icon1',
    },
    {
      label: 'PROYECTOS',
      sublabel: 'Sublabel 2',
      route: '/proyectos',
      icon: 'icon2',
    },
    {
      label: 'ASIGNACIONES',
      sublabel: 'Sublabel 3',
      route: '/asignaciones',
      icon: 'icon3',
    },
    {
      label: 'USUARIOS',
      sublabel: 'Sublabel 3',
      route: '/usuarios',
      icon: 'icon3',
    },
    {
      label: 'REPORTES',
      sublabel: 'Panel analítico',
      route: '/reportes',
      icon: 'chart',
    },
    {
      label: 'CALENDARIO',
      sublabel: 'Línea de tiempo',
      route: '/calendario',
      icon: 'calendar',
    },
    {
      label: 'TABLERO',
      sublabel: 'Vista Kanban',
      route: '/tablero',
      icon: 'kanban',
    },
    {
      label: 'ANALÍTICAS',
      sublabel: 'Gráficas del sistema',
      route: '/graficas',
      icon: 'chart-bar',
    },
    {
      label: 'MI PERFIL',
      sublabel: 'Gestiona tu cuenta',
      route: '/mi-perfil',
      icon: 'profile',
    },
    {
      label: 'PAGE TEST',
      sublabel: 'Gestiona tu cuenta',
      route: '/test',
      icon: 'profile',
    },
  ];
}
