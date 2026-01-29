import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: ()=> import('./home/pages/home-page/home-page')
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page')
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-page/register-page')
      },
      {
        path: '**',
        redirectTo: 'register'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
