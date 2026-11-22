import { Injectable, computed, signal } from '@angular/core';
import { NewPaymentMethod, PaymentMethod } from '../../../../interface/modules/my-account/payment-method.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 private readonly _methods = signal<PaymentMethod[]>([
    {
      id: 'pm_visa_4242',
      type: 'card',
      brand: 'Visa',
      holderName: 'Ashish Sharma',
      nickname: 'Personal Visa',
      last4: '4242',
      expiry: '08 / 28',
      description: 'International Commercial Bank • Visa Signature',
      cardType: 'Credit Card',
      isDefault: true,
      isVerified: true,
    },
    {
      id: 'pm_mastercard_8192',
      type: 'card',
      brand: 'Mastercard',
      holderName: 'Ashish Sharma',
      nickname: 'Corporate Mastercard',
      last4: '8192',
      expiry: '11 / 26',
      description: 'Mastercard World Elite • Corporate Card',
      cardType: 'Corporate Card',
      extra: 'USD, EUR, GBP',
      isDefault: false,
      isVerified: true,
    },
    {
      id: 'pm_upi_sbi',
      type: 'upi',
      holderName: 'Ashish Sharma',
      nickname: 'Primary UPI',
      upiId: 'ashish0111@oksbi',
      bankName: 'SBI Savings ••8841',
      gateway: 'NPCI / Google Pay Instant',
      refundRouting: 'Real-Time Instant Credit',
      isDefault: false,
      isVerified: true,
    },
    {
      id: 'pm_paypal',
      type: 'wallet',
      holderName: 'Ashish Sharma',
      nickname: 'PayPal Express',
      provider: 'PayPal',
      email: 'a***h.dev@example.com',
      preAuthLimit: 'Up to $500.00 / txn',
      lastUsed: '2 days ago (Order #EMS-982410)',
      protection: 'PayPal Buyer Protection Active',
      isDefault: false,
      isVerified: true,
    },
  ]);

  readonly methods = this._methods.asReadonly();
  readonly totalSaved = computed(() => this._methods().length);
  readonly defaultMethod = computed(
    () => this._methods().find((method) => method.isDefault) ?? null,
  );
  readonly cardCount = computed(
    () => this._methods().filter((method) => method.type === 'card').length,
  );
  readonly upiCount = computed(
    () => this._methods().filter((method) => method.type === 'upi').length,
  );
  readonly walletCount = computed(
    () => this._methods().filter((method) => method.type === 'wallet').length,
  );

  setDefault(id: string): void {
    this._methods.update((methods) =>
      methods.map((method) => ({ ...method, isDefault: method.id === id })),
    );
  }

  remove(id: string): void {
    this._methods.update((methods) => {
      const remaining = methods.filter((method) => method.id !== id);

      // Keep a valid default method when the current default is removed.
      if (remaining.length > 0 && !remaining.some((method) => method.isDefault)) {
        remaining[0] = { ...remaining[0], isDefault: true };
      }

      return remaining;
    });
  }

  add(payload: NewPaymentMethod): void {
    const id = `pm_${Date.now()}`;
    const shouldBeDefault = this._methods().length === 0;

    let method: PaymentMethod;

    switch (payload.type) {
      case 'card':
        method = {
          id,
          type: 'card',
          brand: 'Visa',
          holderName: payload.holderName,
          nickname: payload.nickname,
          last4: payload.last4 ?? '0000',
          expiry: payload.expiry ?? '-- / --',
          description: 'Newly added payment card',
          cardType: 'Credit / Debit Card',
          isDefault: shouldBeDefault,
          isVerified: false,
        };
        break;

      case 'upi':
        method = {
          id,
          type: 'upi',
          holderName: payload.holderName,
          nickname: payload.nickname,
          upiId: payload.upiId ?? '',
          bankName: 'Bank account linked through UPI',
          gateway: 'UPI',
          refundRouting: 'Bank refund routing',
          isDefault: shouldBeDefault,
          isVerified: false,
        };
        break;

      case 'wallet':
        method = {
          id,
          type: 'wallet',
          holderName: payload.holderName,
          nickname: payload.nickname,
          provider: payload.walletProvider || 'Digital Wallet',
          email: payload.walletEmail || '',
          preAuthLimit: 'Provider dependent',
          lastUsed: 'Not used yet',
          protection: 'Provider protection applies',
          isDefault: shouldBeDefault,
          isVerified: false,
        };
        break;
    }

    this._methods.update((methods) => [...methods, method]);
  }

  /**
   * Demo-only reset used by the empty-state preview.
   * Production UI should not expose this as a real customer action.
   */
  clearForPreview(): void {
    this._methods.set([]);
  }

  restoreDemoData(): void {
    // Reinitialize the demo list by refreshing the page or replacing this
    // method with a backend reload. Kept explicit to avoid fake server behavior.
  }
}
