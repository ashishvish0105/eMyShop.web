import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-storefront-category-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-section.component.html',
})
export class CategorySectionComponent {
  @Input() categories: Array<{ name: string; icon: string }> = [];
  @Output() categorySelect = new EventEmitter<string>();
}
