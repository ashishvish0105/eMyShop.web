import { Router, Routes } from "@angular/router";
import { UserInformationComponent } from "./components/user-information/user-information.component";
import { PaymentMainSectionComponent } from "./payment-main-section/payment-main-section.component";

export const paymentRoutes: Routes = [
  {
    path: '',
    component: PaymentMainSectionComponent,
    // canActivate: [authGuardGuard],
    children: [
      { path: 'userInformation', component: UserInformationComponent },
    ],
  }
];
