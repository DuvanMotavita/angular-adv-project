import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/pages.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),
      },
      {
        path: 'grafica1',
        loadComponent: () => import('./pages/grafica1/grafica1.component'),
      },
      {
        path: 'progress',
        loadComponent: () => import('./pages/progress/progress.component'),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component'),
  },

  {
    path: '**',
    loadComponent: () => import('./pages/nopagefound/nopagefound.component'),
  },
];
