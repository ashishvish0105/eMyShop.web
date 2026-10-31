import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerOrder } from '../../auth/customer-account.models';

@Component({
  selector: 'app-storefront-order-detail-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail-dialog.component.html',
})
export class OrderDetailDialogComponent {
  @Input({ required: true }) order!: CustomerOrder;
  @Input() deliveryAddress = 'No address saved';
  @Output() closed = new EventEmitter<void>();
  @Output() cancelOrder = new EventEmitter<string>();

  get canCancel(): boolean {
    return this.order.deliveryStatus === 'Pending' || this.order.deliveryStatus === 'Preparing';
  }
}
