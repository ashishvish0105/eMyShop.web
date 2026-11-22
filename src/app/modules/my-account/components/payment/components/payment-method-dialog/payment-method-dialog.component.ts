import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
} from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewPaymentMethod, PaymentMethodType } from '../../../../../../interface/modules/my-account/payment-method.model';

@Component({
  selector: 'app-payment-method-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-method-dialog.component.html',
  styleUrl: './payment-method-dialog.component.scss',
})
export class PaymentMethodDialogComponent {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly destroyRef = inject(DestroyRef);

  readonly saved = output<NewPaymentMethod>();
  readonly closed = output<void>();

  readonly form = this.fb.group({
    type: this.fb.control<PaymentMethodType>('card', Validators.required),
    holderName: this.fb.control('', [Validators.required, Validators.maxLength(80)]),
    nickname: this.fb.control('', [Validators.required, Validators.maxLength(40)]),
    last4: this.fb.control('', [Validators.pattern(/^\d{4}$/)]),
    expiry: this.fb.control('', [Validators.pattern(/^(0[1-9]|1[0-2])\s?\/\s?(\d{2})$/)]),
    upiId: this.fb.control('', [Validators.pattern(/^[\w.-]+@[\w.-]+$/)]),
    walletProvider: this.fb.control('PayPal'),
    walletEmail: this.fb.control('', [Validators.email]),
  });

  constructor() {
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((type) => this.configureValidators(type));

    this.configureValidators(this.form.controls.type.value);
  }

  private configureValidators(type: PaymentMethodType): void {
    const { last4, expiry, upiId, walletEmail } = this.form.controls;

    last4.setValidators(type === 'card'
      ? [Validators.required, Validators.pattern(/^\d{4}$/)]
      : []);
    expiry.setValidators(type === 'card'
      ? [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\s?\/\s?(\d{2})$/)]
      : []);
    upiId.setValidators(type === 'upi'
      ? [Validators.required, Validators.pattern(/^[\w.-]+@[\w.-]+$/)]
      : []);
    walletEmail.setValidators(type === 'wallet' ? [Validators.email] : []);

    last4.updateValueAndValidity({ emitEvent: false });
    expiry.updateValueAndValidity({ emitEvent: false });
    upiId.updateValueAndValidity({ emitEvent: false });
    walletEmail.updateValueAndValidity({ emitEvent: false });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const common = {
      type: value.type,
      holderName: value.holderName.trim(),
      nickname: value.nickname.trim(),
    };

    let payload: NewPaymentMethod;

    switch (value.type) {
      case 'card':
        payload = {
          ...common,
          type: 'card',
          last4: value.last4,
          expiry: value.expiry,
        };
        break;
      case 'upi':
        payload = {
          ...common,
          type: 'upi',
          upiId: value.upiId.trim(),
        };
        break;
      case 'wallet':
        payload = {
          ...common,
          type: 'wallet',
          walletProvider: value.walletProvider.trim() || 'Digital Wallet',
          walletEmail: value.walletEmail.trim(),
        };
        break;
    }

    this.saved.emit(payload);
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
