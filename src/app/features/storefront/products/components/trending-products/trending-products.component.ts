import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../../../mock-commerce.service';

@Component({
  selector: 'app-storefront-trending-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trending-products.component.html',
})
export class TrendingProductsComponent {
  @Input() products: MenuItem[] = [];
  @Input() wishlistedIds: number[] = [];
  @Output() addProduct = new EventEmitter<MenuItem>();
  @Output() toggleWishlist = new EventEmitter<MenuItem>();

  isWishlisted(productId: number): boolean {
    return this.wishlistedIds.includes(productId);
  }
}
