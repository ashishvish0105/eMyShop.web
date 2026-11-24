import { Component, EventEmitter, output, Output,inject } from '@angular/core';
import{Router} from '@angular/router'
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
   private router=inject(Router)

  getStarted(): void {
    this.router.navigate(['/store/create'])
    // this.registerClick.emit();
  }

  openRegistration(): void {
  this.router.navigate(['/store/create'])
  // this.isRegistrationModalOpen = true;
}
}
