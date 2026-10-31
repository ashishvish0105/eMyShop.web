import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../mock-commerce.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-storefront-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent {
  @Input() products: MenuItem[] = [];
  @Input() wishlistedIds: number[] = [];
  @Input() showWishlist = true;
  @Input() showRating = true;
  @Input() showMeta = true;
  @Input() bestSellerFirst = false;
  @Input() eagerFirstImage = false;
  @Input() addLabel = 'Add to cart';
  @Input() wishlistActionLabel = '';
  @Output() addProduct = new EventEmitter<MenuItem>();
  @Output() toggleWishlist = new EventEmitter<MenuItem>();

  isWishlisted(productId: number): boolean {
    return this.wishlistedIds.includes(productId);
  }
}
