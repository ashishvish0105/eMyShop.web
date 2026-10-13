import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { UserInformationComponent } from "../components/user-information/user-information.component";

@Component({
  selector: 'app-payment-main-section',
  standalone: true,
  imports: [ UserInformationComponent],
  templateUrl: './payment-main-section.component.html',
  styleUrl: './payment-main-section.component.scss'
})
export class PaymentMainSectionComponent {

}
