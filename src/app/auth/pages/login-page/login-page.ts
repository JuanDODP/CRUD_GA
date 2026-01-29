import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-page',
  imports: [RouterLink],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {

   email = '';
  password = '';

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    console.log({
      email: this.email,
      password: this.password
    });
  }
 }
