import { Component, EventEmitter, output, Output } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  egisterClick = output<void>();
  @Output() registerClick = new EventEmitter<void>();
  isRegistrationModalOpen:boolean=false;
  getStarted(): void {
    this.registerClick.emit();
  }

  openRegistration(): void {
  this.isRegistrationModalOpen = true;
}
}
