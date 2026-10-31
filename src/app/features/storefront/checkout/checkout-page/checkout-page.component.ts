import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerAccountService } from '../../auth/customer-account.service';
import { CustomerAuthService } from '../../auth/customer-auth.service';
import { MockCommerceService } from '../../../mock-commerce.service';
import { AddressEditorDialogComponent } from '../../components/address-editor-dialog/address-editor-dialog.component';
import { emptyAddressForm } from '../../storefront.utils';
import { StorefrontToastService } from '../../toast.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AddressEditorDialogComponent],
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent {
  readonly commerce = inject(MockCommerceService);
  readonly auth = inject(CustomerAuthService);
  readonly account = inject(CustomerAccountService);
  private readonly router = inject(Router);
  private readonly toast = inject(StorefrontToastService);
  orderComplete = false;
  addressEditorOpen = false;
  addressError = '';
  addressForm = emptyAddressForm(this.auth, this.account.addresses().length);

  openAddressEditor(): void {
    this.addressError = '';
    this.addressEditorOpen = true;
    this.addressForm = emptyAddressForm(this.auth, this.account.addresses().length);
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
        this.toast.show('Delivery address saved.');
      },
      error: () => this.addressError = 'Unable to save this address right now.',
    });
  }

  placeOrder(): void {
    if (!this.commerce.cart.length) {
      this.router.navigate(['/menu']);
      return;
    }
    if (!this.auth.isLoggedIn()) {
      this.auth.openLogin('/checkout');
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
}
