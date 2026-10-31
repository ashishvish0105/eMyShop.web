import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerAuthService } from '../../auth/customer-auth.service';
import { MockCommerceService } from '../../../mock-commerce.service';

@Component({
  selector: 'app-storefront-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './storefront-header.component.html',
})
export class StorefrontHeaderComponent {
  readonly auth = inject(CustomerAuthService);
  readonly commerce = inject(MockCommerceService);
  readonly router = inject(Router);
  menuOpen = false;
  shopMenuOpen = false;
  profileMenuOpen = false;
  @ViewChild('shopToggle') private shopToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('shopMenu') private shopMenu?: ElementRef<HTMLElement>;
  @ViewChild('profileToggle') private profileToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('profileMenu') private profileMenu?: ElementRef<HTMLElement>;

  readonly popularCategories = [
    { name: 'Pizza', icon: 'local_pizza' },
    { name: 'Burgers', icon: 'lunch_dining' },
    { name: 'Pasta', icon: 'ramen_dining' },
    { name: 'Healthy', icon: 'eco' },
    { name: 'Desserts', icon: 'icecream' },
    { name: 'Drinks', icon: 'local_cafe' },
  ];
  readonly shopCategories = this.popularCategories.map(({ name, icon }) => ({
    name,
    icon,
    items: this.commerce.products.filter((product) => product.category === name),
  }));
  readonly accountLinks = [
    { label: 'My Profile', path: '/profile', icon: 'person' },
    { label: 'My Orders', path: '/orders', icon: 'receipt_long' },
    { label: 'Saved Addresses', path: '/addresses', icon: 'location_on' },
    { label: 'Wishlist', path: '/wishlist', icon: 'favorite' },
    { label: 'Notifications', path: '/notifications', icon: 'notifications' },
    { label: 'Account Settings', path: '/settings', icon: 'settings' },
  ];

  toggleShopMenu(): void {
    this.shopMenuOpen = !this.shopMenuOpen;
    this.profileMenuOpen = false;
  }

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
    this.shopMenuOpen = false;
  }

  toggleNavigation(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) this.shopMenuOpen = false;
  }

  closeShopMenu(): void {
    this.shopMenuOpen = false;
    this.menuOpen = false;
  }

  closeMenus(): void {
    this.shopMenuOpen = false;
    this.profileMenuOpen = false;
    this.menuOpen = false;
  }

  openLogin(): void {
    this.closeMenus();
    this.auth.openLogin(this.router.url);
  }

  logout(): void {
    this.closeMenus();
    this.auth.logout();
    if (['/profile', '/orders', '/addresses', '/wishlist', '/notifications', '/settings'].some((path) => this.router.url.startsWith(path))) {
      this.router.navigate(['/products']);
    }
  }

  @HostListener('document:click', ['$event'])
  closeMenusOnOutsideClick(event: MouseEvent): void {
    const target = event.target as Node;
    const insideShop = this.shopToggle?.nativeElement.contains(target) || this.shopMenu?.nativeElement.contains(target);
    const insideProfile = this.profileToggle?.nativeElement.contains(target) || this.profileMenu?.nativeElement.contains(target);
    if (this.shopMenuOpen && !insideShop) this.shopMenuOpen = false;
    if (this.profileMenuOpen && !insideProfile) this.profileMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  closeMenusOnEscape(): void {
    if (this.auth.loginModalOpen()) return;
    if (this.shopMenuOpen) {
      this.shopMenuOpen = false;
      this.shopToggle?.nativeElement.focus();
      return;
    }
    if (this.profileMenuOpen) {
      this.profileMenuOpen = false;
      this.profileToggle?.nativeElement.focus();
    }
  }
}
