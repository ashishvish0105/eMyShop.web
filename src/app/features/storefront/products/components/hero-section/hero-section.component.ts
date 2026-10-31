import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-storefront-hero-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() searchSubmit = new EventEmitter<void>();
}
