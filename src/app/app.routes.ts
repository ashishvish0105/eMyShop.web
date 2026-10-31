import { Routes } from '@angular/router';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { MainContactUsSectionComponent } from './modules/contact-us/main-contact-us-section/main-contact-us-section.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ProductFormComponent } from './features/admin/product-management/components/product-form/product-form.component';
import { ProductMainSectionComponent } from './features/admin/product-management/components/product-main-section/product-main-section.component';
import { ProductOutletComponent } from './features/admin/product-management/product-outlet/product-outlet.component';
import { ProductViewComponent } from './features/admin/product-management/components/product-view/product-view.component';
import { LayoutOneComponent } from './features/storefront/home/layout-one/layout-one.component';
import { ProductPreviewComponent } from './features/admin/product-management/components/product-preview/product-preview.component';
import { authGuardChildGuard, authGuardGuard } from './core/guards/auth-guard.guard';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './shared/layout/user-layout/user-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.router').then((x) => x.authRoutes),
  },
  {
    path: 'seller-Account',
    component: AdminLayoutComponent,
    canActivateChild: [authGuardChildGuard],
    data: { authRole: 'admin' },
  },
  {
    path: '',
    component: UserLayoutComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
