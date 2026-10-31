import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerAccountService } from './storefront/auth/customer-account.service';
import { CustomerAddress, CustomerOrder, CustomerPreferences } from './storefront/auth/customer-account.models';
import { CustomerAuthService } from './storefront/auth/customer-auth.service';
import { StorefrontLoginModalComponent } from './storefront/auth/storefront-login-modal.component';
import { CartItem, MenuItem, MockCommerceService } from './mock-commerce.service';
import { StorefrontToastService } from './storefront/toast.service';

@Component({
  selector: 'app-storefront-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, StorefrontLoginModalComponent],
  templateUrl: './storefront-page.component.html',
  styleUrl: './storefront-page.component.scss',
  host: { class: 'foodiedash-storefront' },
})
export class StorefrontPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly commerce = inject(MockCommerceService);
  readonly auth = inject(CustomerAuthService);
  readonly account = inject(CustomerAccountService);
  private readonly toast = inject(StorefrontToastService);
  page = 'profile';
  search = '';
  category = 'All';
  menuOpen = false;
  shopMenuOpen = false;
  profileMenuOpen = false;
  editingProfile = false;
  profileSaved = false;
  profileSaving = false;
  profileError = '';
  cancelOrderId = '';
  selectedOrder?: CustomerOrder;
  deleteAccountOpen = false;
  addressEditorOpen = false;
  addressError = '';
  orderComplete = false;
  profileForm = this.emptyProfileForm();
  addressForm = this.emptyAddressForm();
  @ViewChild('shopToggle') private shopToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('shopMenu') private shopMenu?: ElementRef<HTMLElement>;
  @ViewChild('profileToggle') private profileToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('profileMenu') private profileMenu?: ElementRef<HTMLElement>;
  readonly categories = ['All', 'Pizza', 'Burgers', 'Pasta', 'Healthy', 'Desserts', 'Drinks'];
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
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.page = String(data['page'] ?? 'home');
      this.orderComplete = false;
      this.syncProfileForm();
    });
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category') ?? 'All';
      this.search = params.get('search') ?? '';
      if (params.get('login') === '1' && !this.auth.isLoggedIn()) {
        this.auth.openLogin(params.get('returnUrl'));
      }
    });
    if (this.auth.isLoggedIn()) {
      this.account.loadAccount().subscribe(() => this.syncProfileForm());
    }
  }

  get notice(): string {
    return this.toast.message();
  }

  openLogin(returnUrl?: string): void {
    this.closeMenus();
    this.auth.openLogin(returnUrl ?? this.router.url);
  }

  onAuthenticated(): void {
    this.account.loadAccount().subscribe(() => this.syncProfileForm());
    const returnUrl = this.auth.consumeReturnUrl();
    this.router.navigateByUrl(returnUrl && returnUrl.startsWith('/') ? returnUrl : this.router.url.split('?')[0]);
    this.showNotice('Welcome to FoodieDash.');
  }

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

  get filteredProducts(): MenuItem[] {
    const search = this.search.toLowerCase().trim();
    return this.commerce.products.filter((product) =>
      product.status !== 'Unavailable' &&
      (this.category === 'All' || product.category === this.category) &&
      (!search || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search)),
    );
  }

  categoryCount(category: string): number {
    return category === 'All'
      ? this.commerce.products.length
      : this.commerce.products.filter((product) => product.category === category).length;
  }

  addToCart(product: MenuItem): void {
    this.commerce.addToCart(product);
    this.showNotice(`${product.name} added to your order.`);
  }

  toggleWishlist(product: MenuItem): void {
    if (!this.auth.isLoggedIn()) {
      this.openLogin(this.router.url);
      return;
    }
    const saved = this.account.toggleWishlist(product.id);
    this.showNotice(saved ? `${product.name} saved to your wishlist.` : `${product.name} removed from your wishlist.`);
  }

  setCategory(category: string): void {
    this.category = category;
    this.page = 'menu';
    this.router.navigate(['/menu'], { queryParams: category === 'All' ? {} : { category } });
  }

  checkout(): void {
    if (!this.commerce.cart.length) {
      this.showNotice('Add a dish to your order before checking out.');
      return;
    }
    if (!this.auth.isLoggedIn()) {
      this.openLogin('/checkout');
      return;
    }
    this.router.navigate(['/checkout']);
  }

  placeOrder(): void {
    if (!this.commerce.cart.length) {
      this.router.navigate(['/menu']);
      return;
    }
    if (!this.auth.isLoggedIn()) {
      this.openLogin('/checkout');
      return;
    }
    const orderNumber = `#FD-${2050 + this.account.orders().length}`;
    const items = this.commerce.cart.map((item) => item.product.name).join(', ');
    this.account.addOrder({
      id: orderNumber,
      date: 'Just now',
      items,
      itemCount: this.commerce.itemCount,
      total: this.commerce.subtotal,
      paymentStatus: 'Paid',
      deliveryStatus: 'Pending',
    });
    this.commerce.cart = [];
    this.orderComplete = true;
  }

  cancelOrder(id: string): void {
    const order = this.account.orders().find((item) => item.id === id);
    if (order && (order.deliveryStatus === 'Pending' || order.deliveryStatus === 'Preparing')) {
      this.cancelOrderId = id;
    } else {
      this.showNotice('This order can no longer be cancelled.');
    }
  }

  confirmCancellation(): void {
    this.account.updateOrderStatus(this.cancelOrderId, 'Cancelled');
    this.showNotice(`${this.cancelOrderId} was cancelled.`);
    this.cancelOrderId = '';
  }

  viewOrder(id: string): void {
    this.selectedOrder = this.account.orders().find((order) => order.id === id);
  }

  reorder(id: string): void {
    const order = this.account.orders().find((item) => item.id === id);
    if (!order) return;
    const names = order.items.split(',').map((name) => name.trim().toLowerCase());
    this.commerce.products
      .filter((product) => names.some((name) => name.includes(product.name.toLowerCase()) || product.name.toLowerCase().includes(name)))
      .forEach((product) => this.commerce.addToCart(product));
    this.showNotice('Items from this order were added to your cart.');
    this.router.navigate(['/cart']);
  }

  copyOfferCode(): void {
    navigator.clipboard.writeText('WELCOME20')
      .then(() => this.showNotice('WELCOME20 copied. Apply it at checkout.'))
      .catch(() => this.showNotice('Clipboard unavailable. Use promo code WELCOME20 at checkout.'));
  }

  startProfileEdit(): void {
    this.editingProfile = true;
    this.profileSaved = false;
    this.profileError = '';
    this.syncProfileForm();
  }

  saveProfile(): void {
    const profile = this.account.profile();
    if (!profile) return;
    if (!this.profileForm.fullName.trim()) {
      this.profileError = 'Enter your full name.';
      return;
    }
    if (!this.profileForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profileForm.email)) {
      this.profileError = 'Enter a valid email address.';
      return;
    }
    this.profileSaving = true;
    this.profileError = '';
    this.account.saveProfile({
      ...profile,
      fullName: this.profileForm.fullName.trim(),
      email: this.profileForm.email.trim(),
      preferences: { ...this.profileForm.preferences },
    }).subscribe({
      next: () => {
        this.profileSaving = false;
        this.profileSaved = true;
        this.editingProfile = false;
        this.showNotice('Your profile has been updated.');
      },
      error: () => {
        this.profileSaving = false;
        this.profileError = 'We could not save your profile. Please try again.';
      },
    });
  }

  saveSettings(): void {
    this.saveProfile();
  }

  openAddressEditor(address?: CustomerAddress): void {
    this.addressError = '';
    this.addressEditorOpen = true;
    this.addressForm = address ? { ...address } : this.emptyAddressForm();
  }

  saveAddress(): void {
    const form = this.addressForm;
    if (!form.label.trim() || !form.fullName.trim() || !form.street.trim() || !form.city.trim() || !form.state.trim() || !form.postalCode.trim()) {
      this.addressError = 'Fill in the name, phone, street, city, state, and postal code.';
      return;
    }
    const phoneError = this.auth.validateMobile(this.auth.currentUser()?.countryCode || '+1', form.phone);
    if (phoneError) {
      this.addressError = phoneError;
      return;
    }
    this.account.saveAddress(form).subscribe({
      next: () => {
        this.addressEditorOpen = false;
        this.showNotice('Delivery address saved.');
      },
      error: () => this.addressError = 'Unable to save this address right now.',
    });
  }

  removeAddress(id: string): void {
    this.account.deleteAddress(id).subscribe({
      next: () => this.showNotice('Address removed.'),
    });
  }

  confirmDeleteAccount(): void {
    this.account.deleteAccount().subscribe({
      next: () => {
        this.deleteAccountOpen = false;
        this.router.navigate(['/products']);
        this.showNotice('Your FoodieDash account was deleted.');
      },
    });
  }

  memberSince(): string {
    const createdAt = this.account.profile()?.createdAt;
    if (!createdAt) return 'FoodieDash member';
    const year = new Date(createdAt).getFullYear();
    return Number.isFinite(year) ? `FoodieDash member since ${year}` : 'FoodieDash member';
  }

  quantity(item: CartItem): number {
    return item.quantity;
  }

  showNotice(message: string): void {
    this.toast.show(message);
  }

  private syncProfileForm(): void {
    const profile = this.account.profile();
    this.profileForm = profile
      ? { fullName: profile.fullName, email: profile.email, preferences: { ...profile.preferences } }
      : this.emptyProfileForm();
  }

  private emptyProfileForm(): { fullName: string; email: string; preferences: CustomerPreferences } {
    return { fullName: '', email: '', preferences: { orderUpdates: true, offers: false, smsAlerts: true, shareActivity: false } };
  }

  private emptyAddressForm(): CustomerAddress {
    const user = this.auth.currentUser();
    return {
      id: '',
      label: 'Home',
      fullName: user?.fullName || '',
      phone: user?.mobileNumber || '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      instructions: '',
      isDefault: this.account.addresses().length === 0,
    };
  }
}
