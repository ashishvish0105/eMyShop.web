import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerAuthService } from '../../auth/customer-auth.service';
import { CartItem, MockCommerceService } from '../../../mock-commerce.service';
import { StorefrontToastService } from '../../toast.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent {
  readonly commerce = inject(MockCommerceService);
  private readonly auth = inject(CustomerAuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(StorefrontToastService);

  quantity(item: CartItem): number {
    return item.quantity;
  }

  checkout(): void {
    if (!this.commerce.cart.length) {
      this.toast.show('Add a dish to your order before checking out.');
      return;
    }
    if (!this.auth.isLoggedIn()) {
      this.auth.openLogin('/checkout');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
