import { Routes } from '@angular/router';
import { AdminPagesComponent } from './features/admin/admin-pages.component';
import { StorefrontPageComponent } from './features/storefront-page.component';
import { MainContactUsSectionComponent } from './modules/contact-us/main-contact-us-section/main-contact-us-section.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { DashboardRouterOutlatComponent } from './shared/layout/dashboardLayout/dashboard-router-outlat/dashboard-router-outlat.component';
import { MainSectionComponent } from './shared/layout/webPageLayout/main-section/main-section.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.router').then((module) => module.authRoutes),
  },
  {
    path: 'seller-Account',
    component: DashboardRouterOutlatComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminPagesComponent, data: { page: 'dashboard' } },
      { path: 'orders', component: AdminPagesComponent, data: { page: 'orders' } },
      { path: 'products', component: AdminPagesComponent, data: { page: 'products' } },
      { path: 'customers', component: AdminPagesComponent, data: { page: 'customers' } },
      { path: 'inventory', component: AdminPagesComponent, data: { page: 'inventory' } },
      {
        path: 'pricing-calculator',
        loadComponent: () =>
          import('./features/admin/pricing-calculator/pricing-calculator.component').then(
            (component) => component.PricingCalculatorComponent,
          ),
      },
      { path: 'reports', component: AdminPagesComponent, data: { page: 'reports' } },
      { path: 'settings', component: AdminPagesComponent, data: { page: 'settings' } },
    ],
  },
  { path: 'products', component: StorefrontPageComponent, data: { page: 'home' } },
  { path: 'menu', component: StorefrontPageComponent, data: { page: 'menu' } },
  { path: 'offers', component: StorefrontPageComponent, data: { page: 'offers' } },
  { path: 'cart', component: StorefrontPageComponent, data: { page: 'cart' } },
  { path: 'checkout', component: StorefrontPageComponent, data: { page: 'checkout' } },
  { path: 'orders', component: StorefrontPageComponent, data: { page: 'orders' } },
  { path: 'profile', component: StorefrontPageComponent, data: { page: 'profile' } },
  { path: 'help', component: StorefrontPageComponent, data: { page: 'help' } },
  {
    path: 'home',
    component: MainSectionComponent,
    children: [
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'products', redirectTo: '/products' },
      { path: 'contactUs', component: MainContactUsSectionComponent },
    ],
  },
  { path: 'document', component: MainSectionComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.router').then((module) => module.authRoutes),
  },
  { path: '**', component: PageNotFoundComponent },
];
