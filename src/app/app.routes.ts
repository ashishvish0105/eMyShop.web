import { Routes } from '@angular/router';
import { ProductPageComponent } from './features/storefront/product-page/product-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AdminLayoutComponent } from './shared/layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './shared/layout/user-layout/user-layout.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ProductOutletComponent } from './features/admin/product-management/product-outlet/product-outlet.component';
import { MyAccountComponent } from './modules/my-account/my-account.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.router').then((x) => x.authRoutes),
  },
  {
    path: 'seller-Account',
    component: AdminLayoutComponent,
    // canActivateChild: [authGuardChildGuard],
    // data: { authRole: 'admin' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // https://codepen.io/leonam-silva-de-souza/pen/zxrKyOv
        // canActivate: [authGuardGuard],
        // data: { authRole: 'seller' },
        // loadComponent: () =>
        //   import('./features/admin/dashboard/dashboard.component').then(  c => c.DashboardComponent),
      },
      {
        path: 'products',
        component: ProductOutletComponent,
        // canActivate: [authGuardGuard],
        // data: { authRole: 'seller' },
        // loadComponent: () =>
        //   import('./features/admin/product-management/product-outlet/product-outlet.component').then(
        //     (component) => component.ProductOutletComponent,
        //   ),
      }
    ]
  },
  {
    path: '',
    component: UserLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'Product',
          pathMatch: 'full',
        },
      {
        path: 'Product',
        component:ProductPageComponent,
        data: { staticInfo: 'Some Config Data' } // Static route data
      },
      {
          path:'account',
          component:MyAccountComponent,
          loadChildren:()=>import('./modules/my-account/my-account.router').then(x=>x.myAccountRouter)
          // children for small nested routes.
          // loadChildren for feature modules such as my-account, admin, reports, and settings.
          // loadComponent for lazy-loading individual standalone components.
        }
    ]
  },
  {
    path:'store',
    loadChildren:()=>import('./modules/create-store/create-store.routes').then(x=>x.createStoreRoutes)
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
