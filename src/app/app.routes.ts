import { Routes } from '@angular/router';
import { IsAdminGuard } from './auth/guards/is-admin.guard';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home' // Ahora que tenemos guards, podemos apuntar a home por defecto
  },
  {
    path: 'auth',
    canMatch: [NotAuthenticatedGuard], // Si ya estoy logueado, no puedo entrar a nada de auth
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page'),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-page/register-page'),
      }
    ]
  },
  {
    path: '', // Agrupador de rutas protegidas
    canMatch: [IsAdminGuard], // <-- Aquí aplicas el nuevo Guard
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/pages/home-page/home-page')
      },
      {
        path: 'areas',
        loadComponent: () => import('./home/pages/areas-page/areas-page')
      },
      {
        path: 'proyectos',
        loadComponent: () => import('./home/pages/proyectos-page/proyectos-page')
      },
      {
        path: 'asignaciones',
        loadComponent: () => import('./home/pages/asignasiones-page/asignasiones-page')
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
