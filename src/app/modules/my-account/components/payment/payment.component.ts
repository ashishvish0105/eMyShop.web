import { Component, computed, inject, signal } from '@angular/core';
import { NewPaymentMethod, PaymentFilter, PaymentMethod } from '../../../../interface/modules/my-account/payment-method.model';
import { PaymentMethodCardComponent } from './components/payment-method-card/payment-method-card.component';
import { PaymentMethodDialogComponent } from './components/payment-method-dialog/payment-method-dialog.component';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [PaymentMethodCardComponent, PaymentMethodDialogComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
readonly paymentService = inject(PaymentService);

  readonly methods = this.paymentService.methods;
  readonly totalSaved = this.paymentService.totalSaved;
  readonly cardCount = this.paymentService.cardCount;
  readonly upiCount = this.paymentService.upiCount;
  readonly walletCount = this.paymentService.walletCount;
  readonly defaultMethod = this.paymentService.defaultMethod;

  readonly activeFilter = signal<PaymentFilter>('all');
  readonly isEmptyPreview = signal(false);
  readonly isAddDialogOpen = signal(false);
  readonly isSecurityInfoOpen = signal(false);
  readonly pendingRemoval = signal<PaymentMethod | null>(null);
  readonly notice = signal<string | null>(null);

  readonly filteredMethods = computed(() => {
    const filter = this.activeFilter();
    const methods = this.methods();

    if (filter === 'all') return methods;
    return methods.filter((method) => method.type === filter);
  });

  readonly defaultMethodLabel = computed(() => {
    const method = this.defaultMethod();
    if (!method) return 'Not configured';

    switch (method.type) {
      case 'card':
        return `${method.brand} •••• ${method.last4}`;
      case 'upi':
        return method.upiId;
      case 'wallet':
        return method.provider;
    }
  });

  readonly categorySummary = computed(
    () => `${this.cardCount()} Cards, ${this.upiCount()} UPI, ${this.walletCount()} Wallet`,
  );

  setFilter(filter: PaymentFilter): void {
    this.activeFilter.set(filter);
  }

  openAddDialog(): void {
    this.isAddDialogOpen.set(true);
  }

  closeAddDialog(): void {
    this.isAddDialogOpen.set(false);
  }

  addPaymentMethod(payload: NewPaymentMethod): void {
    this.paymentService.add(payload);
    this.isAddDialogOpen.set(false);
    this.isEmptyPreview.set(false);
    this.activeFilter.set('all');
    this.showNotice('Payment method added to this demo view.');
  }

  setDefault(id: string): void {
    this.paymentService.setDefault(id);
    this.showNotice('Default payment method updated.');
  }

  askToRemove(id: string): void {
    const method = this.methods().find((item) => item.id === id) ?? null;
    this.pendingRemoval.set(method);
  }

  cancelRemoval(): void {
    this.pendingRemoval.set(null);
  }

  confirmRemoval(): void {
    const method = this.pendingRemoval();
    if (!method) return;

    if (method.isDefault) {
      this.showNotice('Set another payment method as default before removing this one.');
      this.pendingRemoval.set(null);
      return;
    }

    this.paymentService.remove(method.id);
    this.pendingRemoval.set(null);
    this.showNotice('Payment method removed from this demo view.');
  }

  editMethod(id: string): void {
    this.showNotice(`Editing ${id} is a placeholder. Connect this action to your edit form/API.`);
  }

  toggleEmptyPreview(): void {
    this.isEmptyPreview.update((value) => !value);
    this.activeFilter.set('all');
    this.notice.set(null);
  }

  showNotice(message: string): void {
    this.notice.set(message);
  }

  closeNotice(): void {
    this.notice.set(null);
  }

  trackById(_index: number, method: PaymentMethod): string {
    return method.id;
  }

}
