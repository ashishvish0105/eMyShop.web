import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem, MenuItem } from '../../../mock-commerce.service';
import { ProductGridComponent } from '../product-grid/product-grid.component';

@Component({
  selector: 'app-storefront-catalog-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductGridComponent],
  templateUrl: './catalog-view.component.html',
})
export class CatalogViewComponent {
  @Input() mode: 'menu' | 'offers' = 'menu';
  @Input() categories: readonly string[] = [];
  @Input() category = 'All';
  @Input() search = '';
  @Input() products: MenuItem[] = [];
  @Input() wishlistedIds: number[] = [];
  @Input() cart: CartItem[] = [];
  @Input() itemCount = 0;
  @Input() subtotal = 0;
  @Output() categoryChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() copyOffer = new EventEmitter<void>();
  @Output() addProduct = new EventEmitter<MenuItem>();
  @Output() toggleWishlist = new EventEmitter<MenuItem>();
  @Output() quantityChange = new EventEmitter<{ productId: number; delta: number }>();
  @Output() checkout = new EventEmitter<void>();
  @Output() resetFilters = new EventEmitter<void>();
  @Input() categoryCount!: (category: string) => number;
}
