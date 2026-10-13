import {  Routes } from '@angular/router';
import { MainDashboardSectionComponent } from './main-dashboard-section/main-dashboard-section.component';
const dashboardRouter:Routes=[
  {
    path: 'dashboard',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainDashboardSectionComponent,
  }
];
export default dashboardRouter;
