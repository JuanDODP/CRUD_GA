import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const IsAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos el estado actual (usando tu método existente)
  const isAuthenticated = await firstValueFrom(authService.checkStatus());

  console.log('ACCESO PRIVADO:', { isAuthenticated });

  if (!isAuthenticated) {
    // Si NO está autenticado, lo mandamos al login
    router.navigateByUrl('/auth/login');
    return false;
  }

  // Si está autenticado, permitimos el paso
  return true;
};
