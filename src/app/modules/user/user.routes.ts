import { Routes } from '@angular/router';
import { authGuardChildGuard, authGuardGuard } from '../../core/guards/auth-guard.guard';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { ProfileDetailComponent } from './component/profile-detail/profile-detail.component';
import { MainSectionUserComponent } from './main-section-user/main-section-user.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: MainSectionUserComponent,
    canActivate: [authGuardGuard],
    canActivateChild: [authGuardChildGuard],
    data: { authRole: 'customer' },
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileDetailComponent,
      },
      {
        path: 'edit',
        component: UserInfoComponent,
      },
    ],
  },
];
