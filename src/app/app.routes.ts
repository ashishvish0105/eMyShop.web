import { Routes } from '@angular/router';
import { MainAuthComponent } from './Auth/main-auth/main-auth.component';

export const routes: Routes = [
  { path: '', component: MainAuthComponent, title: 'login page' },
];
