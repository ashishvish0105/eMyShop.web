import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { CtaComponent } from './components/cta/cta.component';
import { TrustComponent } from './components/trust/trust.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [RegistrationModalComponent, FooterComponent, CtaComponent, TrustComponent, DashboardComponent, BenefitsComponent, HowItWorksComponent, HeroComponent, HeaderComponent],
  templateUrl: './create-store.component.html',
  styleUrl: './create-store.component.scss'
})
export class CreateStoreComponent {
  showRegister = signal(false);

  // openRegistration(): void {
  //   this.showRegistration = true;
  // }
}
