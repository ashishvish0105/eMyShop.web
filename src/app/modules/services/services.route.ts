import { ConvertDetailPageComponent } from './components/convert-detail-page/convert-detail-page.component';
import { ServiceComponent } from './components/service/service.component';
import { ShowServicesItemComponent } from './components/show-services-item/show-services-item.component';
import { TokenGenereteComponent } from './components/token-generete/token-generete.component';
import { ServicesMainSectionComponent } from './services-main-section/services-main-section.component';
import { Routes } from '@angular/router';
import { authGuardChildGuard, authGuardGuard } from '../../core/guards/auth-guard.guard';

export const route: Routes = [
  {
    path: '',
    component: ServicesMainSectionComponent,
    canActivate: [authGuardGuard],
    canActivateChild: [authGuardChildGuard],
    data: { authRole: 'seller' },
    children: [
      {
        path: '',
        redirectTo: 'ServiceList',
        pathMatch: 'full',
      },
      {
        path:'ServiceList',
        component:ShowServicesItemComponent
      },
      {
        path: 'service',
        component: ServiceComponent,
      },
      {
        path: 'convertPage',
        component: ConvertDetailPageComponent,
      },
      {
        path: 'token',
        component: TokenGenereteComponent,
      },
    ],
  },
];
