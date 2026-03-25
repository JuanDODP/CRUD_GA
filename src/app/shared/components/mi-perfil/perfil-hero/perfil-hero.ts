import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ActiveTab } from '../../../../home/pages/mi-perfil-page/mi-perfil-page';
import { Rol } from '../../../../home/interface/usuarios.interface';

@Component({
  selector: 'app-perfil-hero',
  imports: [],
  templateUrl: './perfil-hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilHero {
  nombre            = input.required<string>();
  email             = input.required<string>();
  rol               = input.required<string>();
  imagen            = input<string | null>(null);
  imagePreview      = input<string | null>(null);
  initials          = input.required<string>();
  asignacionesCount = input.required<number>();
  salary            = input<number | string | undefined>(undefined);
  activeTab         = input.required<ActiveTab>();

  getRolBadgeClass(rol: string): string {
    const map: Record<string, string> = {
      [Rol.Admin]:     'badge-error',
      [Rol.SuperUser]: 'badge-warning',
      [Rol.User]:      'badge-info',
    };
    return map[rol] ?? 'badge-neutral';
  }

  getRolLabel(rol: string): string {
    const labels: Record<string, string> = {
      [Rol.Admin]:     'Administrador',
      [Rol.SuperUser]: 'Super Usuario',
      [Rol.User]:      'Usuario',
    };
    return labels[rol] ?? rol;
  }

  formatSalary(salary?: number | string): string {
    if (!salary || salary === 0) return '—';
    return `$${Number(salary).toLocaleString('es-CO')}`;
  }

  get avatarSrc(): string | null {
    if (this.activeTab() === 'info' && this.imagePreview()) return this.imagePreview();
    return this.imagen() ?? null;
  }
}
