import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product: any;

  addToCart() {
    console.log('Added to cart:', this.product.name);
  }

  addToWishlist() {
    console.log('Added to wishlist:', this.product.name);
  }

  quickView() {
    console.log('Quick view:', this.product.name);
  }

  compare() {
    console.log('Compare:', this.product.name);
  }

}
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  categories: string[];
}
