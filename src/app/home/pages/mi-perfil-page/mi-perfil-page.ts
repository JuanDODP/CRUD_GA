import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '../../../shared/components/home/navbar/navbar';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuariosService } from '../services/usuarios.service';
import { AsignacionesService } from '../services/asignaciones.service';
import { AlertSucess } from '../../../utils/alert-sucess/alert-sucess';
import { ActionAlertError } from '../../../utils/action-alert-error/action-alert-error';
import { PerfilHero } from '../../../shared/components/mi-perfil/perfil-hero/perfil-hero';
import { PerfilTabs } from '../../../shared/components/mi-perfil/perfil-tabs/perfil-tabs';

export type ActiveTab = 'info' | 'seguridad' | 'asignaciones';

@Component({
  selector: 'app-mi-perfil-page',
  imports: [Navbar, ReactiveFormsModule, AlertSucess, ActionAlertError, PerfilHero, PerfilTabs],
  templateUrl: './mi-perfil-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MiPerfilPage implements OnInit {
  private fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  readonly usuariosService = inject(UsuariosService);
  readonly asignacionesService = inject(AsignacionesService);

  // ── UI State ──────────────────────────────────────────────────────────────
  activeTab = signal<ActiveTab>('info');
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  imagePreview = signal<string | null>(null);
  hasFormError = signal(false);
  passwordMismatch = signal(false);

  // ── Computed ──────────────────────────────────────────────────────────────

  /** Usuario completo (con imagen y salary) desde UsuariosService */
  currentUser = computed(() => {
    const authUser = this.authService.user();
    if (!authUser) return null;
    return this.usuariosService.usuarios().find(u => u.id === authUser.id) ?? null;
  });

  /** Asignaciones filtradas por el usuario autenticado */
  misAsignaciones = computed(() => {
    const authUser = this.authService.user();
    if (!authUser) return [];
    return this.asignacionesService.asignaciones().filter(
      a => a.usuario.id === authUser.id
    );
  });

  /** Iniciales del avatar (máx. 2 caracteres) */
  initials = computed(() => {
    const name = this.currentUser()?.name ?? this.authService.user()?.name ?? '';
    return name
      .split(' ')
      .map(n => n[0] ?? '')
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  // ── Forms ─────────────────────────────────────────────────────────────────
  infoForm = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(3)]],
    email:   ['', [Validators.required, Validators.email]],
    imagen:  [null as File | null],
    salary:  [0, [Validators.min(0)]],
  });

  passwordForm = this.fb.group({
    newPassword:     ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor() {
    // Sincronizar formulario cuando cambia el usuario cargado
    effect(() => {
      const user = this.currentUser();
      if (user) {
        this.infoForm.patchValue({
          name:   user.name,
          email:  user.email,
          salary: Number(user.salary) || 0,
          imagen: null,
        });
        this.imagePreview.set(user.imagen ?? null);
      }
    });
  }

  ngOnInit(): void {
    if (this.usuariosService.usuarios().length === 0) this.usuariosService.getUsers();
    if (this.asignacionesService.asignaciones().length === 0) this.asignacionesService.getAsignaciones();
  }

  // ── Acciones UI ───────────────────────────────────────────────────────────
  setTab(tab: ActiveTab): void {
    this.activeTab.set(tab);
  }

  togglePassword(): void         { this.showPassword.update(v => !v); }
  toggleConfirmPassword(): void  { this.showConfirmPassword.update(v => !v); }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.infoForm.patchValue({ imagen: file });
    const reader = new FileReader();
    reader.onload = () => this.imagePreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onSubmitInfo(): void {
    if (this.infoForm.invalid) {
      this.hasFormError.set(true);
      setTimeout(() => this.hasFormError.set(false), 3000);
      return;
    }
    const id = this.authService.user()?.id;
    if (!id) return;
    const { name, email, imagen, salary } = this.infoForm.value;
    this.usuariosService.updateUsuario(id, name!, email!, '', imagen ?? null, salary ?? 0);
    setTimeout(() => this.usuariosService.resetIsSuccess(), 3000);
  }

  onSubmitPassword(): void {
    const { newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword !== confirmPassword) {
      this.passwordMismatch.set(true);
      setTimeout(() => this.passwordMismatch.set(false), 3000);
      return;
    }
    if (this.passwordForm.invalid) {
      this.hasFormError.set(true);
      setTimeout(() => this.hasFormError.set(false), 3000);
      return;
    }
    const id = this.authService.user()?.id;
    if (!id) return;
    const user = this.currentUser();
    this.usuariosService.updateUsuario(
      id, user?.name ?? '', user?.email ?? '', newPassword!, null, user?.salary ?? 0
    );
    this.passwordForm.reset();
    setTimeout(() => this.usuariosService.resetIsSuccess(), 3000);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  formatDate(dateString: string | Date): string {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  }
}
