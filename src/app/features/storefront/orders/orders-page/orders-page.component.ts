import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerAccountService } from '../../auth/customer-account.service';
import { CustomerOrder } from '../../auth/customer-account.models';
import { MockCommerceService } from '../../../mock-commerce.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { OrderDetailDialogComponent } from '../../components/order-detail-dialog/order-detail-dialog.component';
import { StorefrontToastService } from '../../toast.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmDialogComponent, OrderDetailDialogComponent],
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent {
  readonly account = inject(CustomerAccountService);
  private readonly commerce = inject(MockCommerceService);
  private readonly router = inject(Router);
  private readonly toast = inject(StorefrontToastService);
  cancelOrderId = '';
  selectedOrder?: CustomerOrder;

  viewOrder(id: string): void {
    this.selectedOrder = this.account.orders().find((order) => order.id === id);
  }

  cancelOrder(id: string): void {
    const order = this.account.orders().find((item) => item.id === id);
    if (order && (order.deliveryStatus === 'Pending' || order.deliveryStatus === 'Preparing')) {
      this.cancelOrderId = id;
    } else {
      this.toast.show('This order can no longer be cancelled.');
    }
  }

  confirmCancellation(): void {
    this.account.updateOrderStatus(this.cancelOrderId, 'Cancelled');
    this.toast.show(`${this.cancelOrderId} was cancelled.`);
    this.cancelOrderId = '';
  }

  reorder(id: string): void {
    const order = this.account.orders().find((item) => item.id === id);
    if (!order) return;
    const names = order.items.split(',').map((name) => name.trim().toLowerCase());
    this.commerce.products
      .filter((product) => names.some((name) => name.includes(product.name.toLowerCase()) || product.name.toLowerCase().includes(name)))
      .forEach((product) => this.commerce.addToCart(product));
    this.toast.show('Items from this order were added to your cart.');
    this.router.navigate(['/cart']);
  }
}
