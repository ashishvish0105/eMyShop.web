import { Routes } from '@angular/router';
import { MainAuthComponent } from './Auth/main-auth/main-auth.component';
import { LoginComponent } from './Auth/components/login/login.component';
import { ForgotPasswordComponent } from './Auth/components/forgot-password/forgot-password.component';
import { Registration } from './Auth/components/registration/registration';
import { ResetPassword } from './Auth/components/reset-password/reset-password';
import { OTPVerificationComponent } from './Auth/components/otpverification/otpverification.component';
import { MainRestaurant } from './stores/restorent/main-restaurant/main-restaurant';
import { MainLayout } from './shared/layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'login page',
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: 'forgot password page',
      },
      {
        path: 'registration',
        component: Registration,
        title: 'registration page',
      },
      {
        path: 'reset-password',
        component: ResetPassword,
        title: 'reset password page',
      },
      {
        path: 'OTP-verification',
        component: OTPVerificationComponent,
        title: 'OTP verification page',
      },
    ],
  },
  {
    path:'store',
    component: MainLayout,
    title: 'restorent page',
    children: [
      {
        path: '',
        redirectTo: 'restorent',
        pathMatch: 'full',
      },
      {
        path: 'restorent',
        component: MainRestaurant,
        title: 'main restaurant page',
      },
    ],
  }
];
