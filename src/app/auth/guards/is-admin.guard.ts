// import { inject } from '@angular/core';
// import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { firstValueFrom } from 'rxjs';

// export const IsAdminGuard: CanMatchFn = async (
//   route: Route,
//   segments: UrlSegment[]
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // Verificamos el estado actual (usando tu método existente)
//   const isAuthenticated = await firstValueFrom(authService.checkStatus());


//   if (!isAuthenticated) {
//     // Si NO está autenticado, lo mandamos al login
//     router.navigateByUrl('/auth/login');
//     return false;
//   }

//   // Si está autenticado, permitimos el paso
//   return true;
// };
import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const IsAdminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // SSR: permitir siempre en servidor, el cliente validará después
  if (isPlatformServer(platformId)) return true;

  const status = authService.authStatus();

  // Estado ya resuelto → retornar SÍNCRONAMENTE sin pasar por effect()
  // Esto evita el deadlock donde toObservable espera un tick()
  // que nunca llega porque la propia navegación mantiene el zone ocupado
  if (status === 'authenticated') return true;

  if (status === 'not-authenticated') {
    router.navigateByUrl('/auth/login');
    return false;
  }

  // Solo 'checking': app arrancando con token en localStorage
  // Aquí sí esperamos de forma async a que checkStatus() resuelva
  return toObservable(authService.authStatus).pipe(
    filter(s => s !== 'checking'),
    take(1),
    map(s => {
      if (s === 'authenticated') return true;
      router.navigateByUrl('/auth/login');
      return false;
    })
  );
};
