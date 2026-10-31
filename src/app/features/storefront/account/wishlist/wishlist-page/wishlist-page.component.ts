import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerAccountService } from '../../../auth/customer-account.service';
import { CustomerAuthService } from '../../../auth/customer-auth.service';
import { MenuItem, MockCommerceService } from '../../../../mock-commerce.service';
import { ProductGridComponent } from '../../../components/product-grid/product-grid.component';
import { StorefrontToastService } from '../../../toast.service';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [RouterLink, ProductGridComponent],
  templateUrl: './wishlist-page.component.html',
})
export class WishlistPageComponent {
  readonly account = inject(CustomerAccountService);
  readonly commerce = inject(MockCommerceService);
  private readonly auth = inject(CustomerAuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(StorefrontToastService);

  addToCart(product: MenuItem): void {
    this.commerce.addToCart(product);
    this.toast.show(`${product.name} added to your order.`);
  }

  toggleWishlist(product: MenuItem): void {
    if (!this.auth.isLoggedIn()) {
      this.auth.openLogin(this.router.url);
      return;
    }
    this.account.toggleWishlist(product.id);
    this.toast.show(`${product.name} removed from your wishlist.`);
  }
}
