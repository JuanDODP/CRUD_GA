import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
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
    // authService = Inject(AuthService);
    logout(){
      this.authService.logout();
    }
  // 1. Usa la función inject() correctamente
   authService = inject(AuthService);

  // 2. Crea la referencia al signal
  public user = this.authService.user;

  imprimir() {
    // 3. Para ver el valor de un Signal en consola, DEBES llamarlo: user()
    console.log("EL USUARIO ES:", this.user());
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
