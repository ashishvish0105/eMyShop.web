import { Routes } from '@angular/router';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { MainContactUsSectionComponent } from './modules/contact-us/main-contact-us-section/main-contact-us-section.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { DashboardRouterOutlatComponent } from './shared/layout/dashboardLayout/dashboard-router-outlat/dashboard-router-outlat.component';
import { MainSectionComponent } from './shared/layout/webPageLayout/main-section/main-section.component';
import { ProductFormComponent } from './features/admin/product-management/components/product-form/product-form.component';
import { ProductMainSectionComponent } from './features/admin/product-management/components/product-main-section/product-main-section.component';
import { ProductOutletComponent } from './features/admin/product-management/product-outlet/product-outlet.component';
import { ProductViewComponent } from './features/admin/product-management/components/product-view/product-view.component';
import { LayoutOneComponent } from './features/storefront/home/layout-one/layout-one.component';
import { ProductPreviewComponent } from './features/admin/product-management/components/product-preview/product-preview.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.router').then((x) => x.authRoutes),
  },
  {
    path: 'seller-Account',
    component: DashboardRouterOutlatComponent,
    canActivate: [authGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch:"full"
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductOutletComponent,
        children:[
          {
            path:"",
            component:ProductMainSectionComponent
          },
          {
            path:"add-product",
            component:ProductFormComponent
          },
          {
            path:"edit/:id",
            component:ProductFormComponent
          },
          {
            path:"product-view",
            component:ProductViewComponent
          },
          {
            path:"product-preview",
            component:ProductPreviewComponent
          }
        ]
      },
    ],
  },
    {
    path: 'products',
    component: MainSectionComponent,
    children: [{
        path: '',
        component: LayoutOneComponent,
    }]
  },
  {
    path: 'home',
    component: MainSectionComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: LayoutOneComponent,
        // component: ProdDesignOneComponent,
        // children: [
        //   {
        //     path: 'prodcutDetail?itemId={itemId}',
        //     component: ProdDetailDesignOneComponent,
        //   },
        //   {
        //     path: 'prodcutDetail/:itemId',
        //     component: ProdDetailDesignOneComponent,
        //   },
        // ],
      },
      // {
      //   path: 'user',
      //   loadChildren: () =>
      //     import('../../modules/user/user.routes').then((r) => r.userRoutes),
      // children: [
      //   {
      //     path: '',
      //     component: UserListComponent,
      //   },
      //   {
      //     path: 'user/:userId',
      //     component: UserInfoComponent,
      //   },
      //   {
      //     path: 'profile',
      //     loadChildren: () =>
      //       import('../../modules/profile/profile.router').then(
      //         (r) => r.router
      //       ),
      //   },
      // ],
      // },
      {
        path: 'contactUs',
        component: MainContactUsSectionComponent,
      },
      // {
      //   path: 'newsFeed',
      //   loadChildren: () =>
      //     import('../../modules/newsFeed/newsFeed.routes').then(
      //       (r) => r.newsRoutes,
      //     ),
      // },
      // {
      //   path: 'blog',
      //   component: BlogMainSectionComponent,
      // },
      // {
      //   path: 'payment',
      //   loadChildren: () =>
      //     import('../../modules/payment/payment.routes').then(
      //       (r) => r.paymentRoutes,
      //     ),
      // },
      // {
      //   path: 'documentHub',
      //   // component: ServicesMainSectionComponent,
      //   loadChildren: () =>
      //     import('../../modules/pdfConverter/pdfConverter.routes').then(
      //       (r) => r.route,
      //     ),
      // children:[
      //   {
      //     path:"token",
      //     component:TokenGenereteComponent
      //   }
      // ]
      // children: [
      //   {
      //     path: '',
      //     component: ServiceComponent,
      //   },
      //   {
      //     path: 'token',
      //     component: TokenGenereteComponent,
      //   },
      // ],
      // },
      // {
      //   path: 'imageManager',
      //   // component: ServicesMainSectionComponent,
      //   loadChildren: () =>
      //     import('../../modules/imageManager/imageManager.route').then(
      //       (r) => r.route,
      //     ),
      // },
      // {
      //   path: 'eShop',
      //   // component: ServicesMainSectionComponent,
      //   loadChildren: () =>
      //     import('../../modules/services/services.route').then((r) => r.route),
      // },
      // {
      //   path: 'user',
      //   component: MainUserSectionComponent,
      // },
      // {
      //   path: 'dashboard',
      //   component: MainDashboardSectionComponent,
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('../../modules/profile/profile.router').then((r) => r.router),
      // },
    ],
  },
  {
    path: 'document',
    component: MainSectionComponent,
  },
  // {
  //   path: '',
  //   redirectTo: 'product',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '',
  //   // canActivate:[loginGuardGuardGuard],
  //   loadChildren: () =>
  //     import('./shared/layout/layout.route').then((r) => r.layoutRoute),
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./auth/auth.router').then((x) => x.authRoutes),
  // },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.router').then((x) => x.authRoutes),
    // component: MainAuthSectionComponent,
    // children: [
    //   {
    //     path: '',
    //     component: LoginComponent,
    //     canActivate: [loginGuardGuardGuard],
    //   },
    //   {
    //     path: 'forgetPasssword',
    //     component: ForgetPasswordComponent,
    //   },
    //   {
    //     path: 'resetPassword',
    //     component: ResetPasswordComponent,
    //   },
    //   {
    //     path: 'registration',
    //     component: RegistrationComponent,
    //   },
    // ],
  },
  // {
  //   path: 'dashboard',s
  //   loadChildren: () =>
  //     import('./shared/layout/layout.route').then((r) => r.dashboardRouter),
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./modules/dashboard/dashboardRoute.routes').then((r) => r.default),
  // },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
