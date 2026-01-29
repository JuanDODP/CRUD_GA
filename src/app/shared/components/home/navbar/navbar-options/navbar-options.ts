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
  ];
}
