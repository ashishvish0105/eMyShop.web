import { Router, Routes } from "@angular/router";
import { UserInformationComponent } from "./components/user-information/user-information.component";
import { PaymentMainSectionComponent } from "./payment-main-section/payment-main-section.component";
import { authGuardChildGuard, authGuardGuard } from "../../core/guards/auth-guard.guard";

export const paymentRoutes: Routes = [
  {
    path: '',
    component: PaymentMainSectionComponent,
    canActivate: [authGuardGuard],
    canActivateChild: [authGuardChildGuard],
    data: { authRole: 'customer' },
    children: [
      { path: 'userInformation', component: UserInformationComponent },
    ],
  }
];
