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
        data: { title: 'Dashboard' },
      },
      {
        path: 'grafica1',
        loadComponent: () => import('./pages/grafica1/grafica1.component'),
        data: { title: 'Graphics' },
      },
      {
        path: 'progress',
        loadComponent: () => import('./pages/progress/progress.component'),
        data: { title: 'Progress Bar' },
      },
      {
        path: 'account-settings',
        loadComponent: () =>
          import('./pages/account-settings/account-settings.component'),
        data: { title: 'Account Settings' },
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
        data: { title: 'Users Maintaining' },
      },
      {
        path: 'hospitals',
        loadComponent: () =>
          import('./pages/maintaining/hospitals/hospitals.component'),
        data: { title: 'Hospitals Maintaining' },
      },
      {
        path: 'medics',
        loadComponent: () =>
          import('./pages/maintaining/medics/medics.component'),
        data: { title: 'Medics Maintaining' },
      },
      {
        path: 'medic/:id',
        loadComponent: () =>
          import('./pages/maintaining/medics/medic.component'),
        data: { title: 'Medic' },
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
