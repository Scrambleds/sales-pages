import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/login/auth.component').then(m => m.AuthComponent)
  }
];