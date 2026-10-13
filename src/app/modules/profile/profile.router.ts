import { Routes } from '@angular/router';
import { ProfileMainSectionComponent } from './profile-main-section/profile-main-section.component';
import { ProfileAddEditComponent } from './components/profile-add-edit/profile-add-edit.component';

export const router: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileMainSectionComponent,
  },
  {
    path: 'edit',
    component: ProfileAddEditComponent,
  },
];
