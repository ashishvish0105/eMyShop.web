import {  Routes } from '@angular/router';
import { MainDashboardSectionComponent } from './main-dashboard-section/main-dashboard-section.component';
import { authGuardGuard } from '../../core/guards/auth-guard.guard';
const dashboardRouter:Routes=[
  {
    path: 'dashboard',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainDashboardSectionComponent,
    canActivate: [authGuardGuard],
    data: { authRole: 'seller' },
  }
];
export default dashboardRouter;
