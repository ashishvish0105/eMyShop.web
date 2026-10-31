import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerAccountService } from '../../../auth/customer-account.service';
import { CustomerAuthService } from '../../../auth/customer-auth.service';
import { MenuItem, MockCommerceService } from '../../../../mock-commerce.service';
import { STOREFRONT_POPULAR_CATEGORIES } from '../../../storefront.constants';
import { filterStorefrontProducts } from '../../../storefront.utils';
import { StorefrontToastService } from '../../../toast.service';
import { CategorySectionComponent } from '../../components/category-section/category-section.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { TrendingProductsComponent } from '../../components/trending-products/trending-products.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink, HeroSectionComponent, CategorySectionComponent, TrendingProductsComponent],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  readonly router = inject(Router);
  readonly commerce = inject(MockCommerceService);
  readonly auth = inject(CustomerAuthService);
  readonly account = inject(CustomerAccountService);
  private readonly toast = inject(StorefrontToastService);
  search = '';
  readonly popularCategories = STOREFRONT_POPULAR_CATEGORIES;

  get trendingProducts(): MenuItem[] {
    return filterStorefrontProducts(this.commerce.products, 'All', this.search).slice(0, 3);
  }

  findFood(): void {
    this.router.navigate(['/menu'], { queryParams: this.search ? { search: this.search } : {} });
  }

  setCategory(category: string): void {
    this.router.navigate(['/menu'], { queryParams: category === 'All' ? {} : { category } });
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
}
