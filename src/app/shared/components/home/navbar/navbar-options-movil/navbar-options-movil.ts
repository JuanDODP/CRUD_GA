import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Options } from '../navbar-options/navbar-options';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-options-movil',
  imports: [RouterLink],
  templateUrl: './navbar-options-movil.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarOptionsMovil {
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
  ];

}
