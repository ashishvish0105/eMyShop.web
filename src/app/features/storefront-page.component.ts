import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartItem, MenuItem, MockCommerceService } from './mock-commerce.service';

@Component({
  selector: 'app-storefront-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './storefront-page.component.html',
})
export class StorefrontPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly commerce = inject(MockCommerceService);
  page = 'home';
  search = '';
  category = 'All';
  notice = '';
  menuOpen = false;
  orderComplete = false;
  profileSaved = false;
  cancelOrderId = '';
  selectedOrder?: MockCommerceService['orders'][number];
  profilePreferences = { orderUpdates: true, offers: false };
  customerName = 'Jordan Lee';
  deliveryAddress = '24 Green Street, New York, NY 10003';
  readonly categories = ['All', 'Pizza', 'Burgers', 'Pasta', 'Healthy', 'Desserts', 'Drinks'];
  readonly popularCategories = [
    { name: 'Pizza', icon: 'local_pizza' },
    { name: 'Burgers', icon: 'lunch_dining' },
    { name: 'Pasta', icon: 'ramen_dining' },
    { name: 'Healthy', icon: 'eco' },
    { name: 'Desserts', icon: 'icecream' },
    { name: 'Drinks', icon: 'local_cafe' },
  ];

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.page = String(data['page'] ?? 'home');
      this.orderComplete = false;
      this.menuOpen = false;
    });
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category') ?? 'All';
      this.search = params.get('search') ?? '';
    });
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
    this.router.navigate(['/checkout']);
  }

  placeOrder(): void {
    if (!this.commerce.cart.length) {
      this.router.navigate(['/menu']);
      return;
    }
    const orderNumber = `#FD-${2050 + this.commerce.orders.length}`;
    this.commerce.orders.unshift({
      id: orderNumber,
      customer: this.customerName,
      email: 'jordan.lee@email.com',
      items: `${this.commerce.itemCount} items · ${this.commerce.cart.map((item) => item.product.name).join(', ')}`,
      date: 'Just now',
      total: this.commerce.subtotal,
      status: 'Pending',
    });
    this.commerce.cart = [];
    this.orderComplete = true;
  }

  cancelOrder(id: string): void {
    const order = this.commerce.orders.find((item) => item.id === id);
    if (order && (order.status === 'Pending' || order.status === 'Preparing')) {
      this.cancelOrderId = id;
    } else {
      this.showNotice('This order can no longer be cancelled.');
    }
  }

  confirmCancellation(): void {
    const order = this.commerce.orders.find((item) => item.id === this.cancelOrderId);
    if (order && (order.status === 'Pending' || order.status === 'Preparing')) {
      order.status = 'Cancelled';
      this.showNotice(`${order.id} was cancelled.`);
    }
    this.cancelOrderId = '';
  }

  viewOrder(id: string): void {
    this.selectedOrder = this.commerce.orders.find((order) => order.id === id);
  }

  copyOfferCode(): void {
    navigator.clipboard.writeText('WELCOME20')
      .then(() => this.showNotice('WELCOME20 copied. Apply it at checkout.'))
      .catch(() => this.showNotice('Clipboard unavailable. Use promo code WELCOME20 at checkout.'));
  }

  saveProfile(): void {
    this.profileSaved = true;
    this.showNotice('Your profile has been updated.');
  }

  quantity(item: CartItem): number {
    return item.quantity;
  }

  showNotice(message: string): void {
    this.notice = message;
    setTimeout(() => this.notice = '', 2600);
  }
}
