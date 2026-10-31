import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../mock-commerce.service';

@Component({
  selector: 'app-storefront-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: MenuItem;
  @Input() wishlisted = false;
  @Input() showWishlist = true;
  @Input() showRating = true;
  @Input() showMeta = true;
  @Input() bestSeller = false;
  @Input() eagerImage = false;
  @Input() addLabel = 'Add to cart';
  @Input() wishlistActionLabel = '';
  @Output() add = new EventEmitter<MenuItem>();
  @Output() wishlistToggle = new EventEmitter<MenuItem>();
}
