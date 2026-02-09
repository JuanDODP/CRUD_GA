import { Routes } from '@angular/router';
import { IsAdminGuard } from './auth/guards/is-admin.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

// export const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'areas' // Ahora que tenemos guards, podemos apuntar a areas por defecto
//   },
//   {
//     path: 'auth',
//     canMatch: [NotAuthenticatedGuard], // Si ya estoy logueado, no puedo entrar a nada de auth
//     children: [
//       {
//         path: 'login',
//         loadComponent: () => import('./auth/pages/login-page/login-page'),
//       },
//       {
//         path: 'register',
//         loadComponent: () => import('./auth/pages/register-page/register-page'),
//       }
//     ]
//   },
//   {
//     path: '', // Agrupador de rutas protegidas
//     canMatch: [IsAdminGuard], // <-- Aquí aplicas el nuevo Guard
//     children: [
//       //  {
//       //    path: 'home',
//       //    loadComponent: () => import('./home/pages/home-page/home-page')
//       //  },
//       {
//         path: 'areas',
//         loadComponent: () => import('./home/pages/areas-page/areas-page')
//       },
//       {
//         path: 'proyectos',
//         loadComponent: () => import('./home/pages/proyectos-page/proyectos-page')
//       },
//       {
//         path: 'asignaciones',
//         loadComponent: () => import('./home/pages/asignasiones-page/asignasiones-page')
//       },
//     ]
//   },
//   {
//     path: '**',
//     redirectTo: 'areas'
//   }
// ];

// export const routes: Routes = [
//   {
//     path: 'auth',
//     canMatch: [NotAuthenticatedGuard],
//     children: [
//       { path: 'login', loadComponent: () => import('./auth/pages/login-page/login-page') },
//       { path: 'register', loadComponent: () => import('./auth/pages/register-page/register-page') }
//     ]
//   },
//   {
//     path: 'home', // Es mejor usar un prefijo para mantener el estado de navegación
//     canMatch: [IsAdminGuard],
//     children: [
//       { path: 'areas', loadComponent: () => import('./home/pages/areas-page/areas-page') },
//       { path: 'proyectos', loadComponent: () => import('./home/pages/proyectos-page/proyectos-page') },
//       { path: 'asignaciones', loadComponent: () => import('./home/pages/asignasiones-page/asignasiones-page') },
//       { path: '', redirectTo: 'areas', pathMatch: 'full' }
//     ]
//   },
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'home/areas' // Redirige a la ruta protegida por defecto
//   },
//   {
//     path: '**',
//     redirectTo: 'home/areas'
//   }
// ];
export const routes: Routes = [
  {
    path: 'auth',
    canMatch: [NotAuthenticatedGuard],
    children: [
      { path: 'login', loadComponent: () => import('./auth/pages/login-page/login-page') },
      { path: 'register', loadComponent: () => import('./auth/pages/register-page/register-page') }
    ]
  },
  // {
  //   path: '',
  //   canActivate: [IsAdminGuard], // Cambia canMatch por canActivate para rutas fijas
  //   children: [
  //     { path: 'areas', loadComponent: () => import('./home/pages/areas-page/areas-page') },
  //     { path: 'proyectos', loadComponent: () => import('./home/pages/proyectos-page/proyectos-page') },
  //     { path: 'asignaciones', loadComponent: () => import('./home/pages/asignasiones-page/asignasiones-page') },
  //     { path: '', redirectTo: 'areas', pathMatch: 'full' } // Redirección interna
  //   ]
  // },
  {
    path: '',
    canActivate: [IsAdminGuard],
    children: [
      { path: 'areas', loadComponent: () => import('./home/pages/areas-page/areas-page') },
      { path: 'proyectos', loadComponent: () => import('./home/pages/proyectos-page/proyectos-page') },
      { path: 'asignaciones', loadComponent: () => import('./home/pages/asignasiones-page/asignasiones-page') },
      { path: '', redirectTo: 'areas', pathMatch: 'full' } // Solo redirige si entras a localhost:4200/ exactamente
    ]
  },
  { path: '**', redirectTo: 'areas' }
];
