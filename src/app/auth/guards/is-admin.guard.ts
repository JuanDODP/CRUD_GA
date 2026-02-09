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

  // 1. IMPORTANTE: Si estamos en el servidor (SSR), permitimos el paso inicial.
  // El cliente (browser) validará el token real un milisegundo después.
  if (isPlatformServer(platformId)) return true;

  // 2. Convertimos el Signal de authStatus a un Observable
  return toObservable(authService.authStatus).pipe(
    // Esperamos a que el estado sea distinto de 'checking'
    filter(status => status !== 'checking'),
    take(1), // Tomamos el primer valor real (authenticated o unauthenticated)
    map(status => {
      if (status === 'authenticated') {
        return true;
      }

      // Si definitivamente no tiene permiso, lo mandamos al login
      router.navigateByUrl('/auth/login');
      return false;
    })
  );
};
