import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export default class RegisterPage {

  fb=inject(FormBuilder)
hashError=signal(false)
isPosting=signal(false)
authService = inject(AuthService)
router = inject(Router)

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  onSubmit() {
    if (this.registerForm.invalid) {

      this.hashError.set(true);
      setTimeout(() => {
        this.hashError.set(false);
      }, 2000);
      return;

    }
    const { name='', email='', password='' } = this.registerForm.value;
    this.authService.register(name!, email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/areas']);
        return
      }
      this.hashError.set(true);
      setTimeout(() => {
        this.hashError.set(false);
      }, 2000);
    });

  }
}
