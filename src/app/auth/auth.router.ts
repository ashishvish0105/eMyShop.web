import { Route, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MainAuthSectionComponent } from './main-auth-section/main-auth-section.component';

// export const authRoutes: Routes = [
//   {
//     path: '',
//     component: MainAuthSectionComponent,
//     children: [
//       {
//         path: '',
//         redirectTo: 'login',
//         pathMatch: 'full',
//       },
//       {
//         canActivate:[authGuardGuard],
//         path: 'login',
//         component: LoginComponent,
//       },
//       {
//         path: 'forgetPasssword',
//         component: ForgetPasswordComponent,
//       },
//       {
//         path: 'resetPassword',
//         component: ResetPasswordComponent,
//       },
//       {
//         path: 'registration',
//         component: RegistrationComponent,
//       },
//     ],
//   },
//   {
//     path: 'seller',
//     children: [
//       {
//         path: '',
//         redirectTo: '/login?account=seller',
//         pathMatch: 'full',
//       },
//       {
//         path: 'login',
//         redirectTo: '/login?account=seller',
//         pathMatch: 'full',
//       },
//     ],
//   },
// ] as Route[];


export const authRoutes: Routes = [
  {
    path: '',
    component: MainAuthSectionComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgetPasssword',
        component: ForgetPasswordComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      { path: 'register', redirectTo: 'registration', pathMatch: 'full' },
      { path: 'forgot-password', redirectTo: 'forgetPasssword', pathMatch: 'full' },
      { path: 'reset-password', redirectTo: 'resetPassword', pathMatch: 'full' },
    ],
  },
  {
    path: 'seller',
    children: [
      {
        path: '',
        redirectTo: '/login?account=seller',
        pathMatch: 'full',
      },
      {
        path: 'login',
        redirectTo: '/login?account=seller',
        pathMatch: 'full',
      },
    ],
  },
] as Routes;
