import { Component, output } from '@angular/core';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {

isRegistrationModalOpen = false;

openRegistration(): void {
  this.isRegistrationModalOpen = true;
}

closeRegistration(): void {
  this.isRegistrationModalOpen = false;
}
}
