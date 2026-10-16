import { Routes } from '@angular/router';
import { authGuardGuard } from '../../../core/guards/auth-guard.guard';

export const dashboardRoute: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [authGuardGuard],
    data: { authRole: 'seller' },
    loadComponent: () =>
      import('./dashboard.component').then(  c => c.DashboardComponent),
  },
  {
    path: 'products',
    canActivate: [authGuardGuard],
    data: { authRole: 'seller' },
    loadComponent: () =>
      import('../product-management/product-outlet/product-outlet.component').then(
        (component) => component.ProductOutletComponent,
      ),
  }
];
