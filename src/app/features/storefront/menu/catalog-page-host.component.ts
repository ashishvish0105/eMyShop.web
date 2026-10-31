import { Component, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAccountService } from '../auth/customer-account.service';
import { CustomerAuthService } from '../auth/customer-auth.service';
import { MenuItem, MockCommerceService } from '../../mock-commerce.service';
import { CatalogViewComponent } from '../components/catalog-view/catalog-view.component';
import { STOREFRONT_CATEGORIES } from '../storefront.constants';
import { filterStorefrontProducts, storefrontCategoryCount } from '../storefront.utils';
import { StorefrontToastService } from '../toast.service';

@Component({
  selector: 'app-storefront-catalog-page',
  standalone: true,
  imports: [CatalogViewComponent],
  template: `
    <app-storefront-catalog-view
      [mode]="mode"
      [categories]="categories"
      [category]="category"
      [search]="search"
      [products]="filteredProducts"
      [wishlistedIds]="account.wishlistIds()"
      [cart]="commerce.cart"
      [itemCount]="commerce.itemCount"
      [subtotal]="commerce.subtotal"
      [categoryCount]="categoryCount"
      (categoryChange)="category = $event"
      (searchChange)="search = $event"
      (copyOffer)="copyOfferCode()"
      (addProduct)="addToCart($event)"
      (toggleWishlist)="toggleWishlist($event)"
      (quantityChange)="commerce.updateQuantity($event.productId, $event.delta)"
      (checkout)="checkout()"
      (resetFilters)="category = 'All'; search = ''">
    </app-storefront-catalog-view>
  `,
})
export class CatalogPageHostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly commerce = inject(MockCommerceService);
  readonly auth = inject(CustomerAuthService);
  readonly account = inject(CustomerAccountService);
  private readonly toast = inject(StorefrontToastService);
  @Input() mode: 'menu' | 'offers' = 'menu';
  category = 'All';
  search = '';
  readonly categories = STOREFRONT_CATEGORIES;
  readonly categoryCount = (category: string) => storefrontCategoryCount(this.commerce.products, category);

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.category = params.get('category') ?? 'All';
      this.search = params.get('search') ?? '';
    });
  }

  get filteredProducts(): MenuItem[] {
    return filterStorefrontProducts(this.commerce.products, this.category, this.search);
  }

  addToCart(product: MenuItem): void {
    this.commerce.addToCart(product);
    this.toast.show(`${product.name} added to your order.`);
  }

  toggleWishlist(product: MenuItem): void {
    if (!this.auth.isLoggedIn()) {
      this.auth.openLogin(this.router.url);
      return;
    }
    const saved = this.account.toggleWishlist(product.id);
    this.toast.show(saved ? `${product.name} saved to your wishlist.` : `${product.name} removed from your wishlist.`);
  }

  copyOfferCode(): void {
    navigator.clipboard.writeText('WELCOME20')
      .then(() => this.toast.show('WELCOME20 copied. Apply it at checkout.'))
      .catch(() => this.toast.show('Clipboard unavailable. Use promo code WELCOME20 at checkout.'));
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
