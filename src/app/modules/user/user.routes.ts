import { Router, Routes } from '@angular/router';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { ProfileDetailComponent } from './component/profile-detail/profile-detail.component';
import { MainSectionUserComponent } from './main-section-user/main-section-user.component';

export const userRoutes: Routes = [
  {
    path: '',
    component: MainSectionUserComponent,
    children: [
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
