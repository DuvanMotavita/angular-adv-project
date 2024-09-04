import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/pages.component'),
    canActivate: [authGuard],
    children: [
      {
        path: 'main',
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
        path: 'account-settings',
        loadComponent: () =>
          import('./pages/account-settings/account-settings.component'),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component'),
        data: { title: 'User Profile' },
      },
      ///Maintaining
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/maintaining/users/users.component'),
        data: { title: 'Users of the app' },
      },
      {
        path: '',
        redirectTo: '/dashboard/main',
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
    path: '',
    redirectTo: '/dashboard/main',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./nopagefound/nopagefound.component'),
  },
];
