import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { NavbarOptions } from "./navbar-options/navbar-options";
import { NavbarOptionsMovil } from "./navbar-options-movil/navbar-options-movil";
import { AuthService } from '../../../../auth/services/auth.service';
interface Options {
  label: string;
  sublabel: string;
  route: string;
  icon: string;
}
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NavbarOptions, NavbarOptionsMovil],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  public authService = inject(AuthService);

  // Al crear estas referencias locales a los signals del servicio,
  // facilitas que el motor de OnPush detecte el cambio de estado.
  public authStatus = this.authService.authStatus;
  public user = this.authService.user;
  router = inject(Router)
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0] ?? '').join('').toUpperCase().slice(0, 2);
  }

  options: Options[] = [
    {
      label: 'Item 1',
      sublabel: 'Sublabel 1',
      route: '/item1',
      icon: 'icon1',
    },
    {
      label: 'Item 2',
      sublabel: 'Sublabel 2',
      route: '/item2',
      icon: 'icon2',
    },
    {
      label: 'Item 3',
      sublabel: 'Sublabel 3',
      route: '/item3',
      icon: 'icon3',
    },
  ];
}
