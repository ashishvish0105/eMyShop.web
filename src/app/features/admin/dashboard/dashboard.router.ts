import { Routes } from '@angular/router';

export const dashboardRoute: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard.component').then(  c => c.DashboardComponent),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('../../admin/product-management/').then(  c => c.ProductComponent),
  }
];
