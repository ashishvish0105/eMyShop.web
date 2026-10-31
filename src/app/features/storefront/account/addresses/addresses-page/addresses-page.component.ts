import { Component, inject } from '@angular/core';
import { CustomerAccountService } from '../../../auth/customer-account.service';
import { CustomerAddress } from '../../../auth/customer-account.models';
import { CustomerAuthService } from '../../../auth/customer-auth.service';
import { AddressEditorDialogComponent } from '../../../components/address-editor-dialog/address-editor-dialog.component';
import { emptyAddressForm } from '../../../storefront.utils';
import { StorefrontToastService } from '../../../toast.service';

@Component({
  selector: 'app-addresses-page',
  standalone: true,
  imports: [AddressEditorDialogComponent],
  templateUrl: './addresses-page.component.html',
})
export class AddressesPageComponent {
  readonly account = inject(CustomerAccountService);
  private readonly auth = inject(CustomerAuthService);
  private readonly toast = inject(StorefrontToastService);
  addressEditorOpen = false;
  addressError = '';
  addressForm = emptyAddressForm(this.auth, 0);

  openAddressEditor(address?: CustomerAddress): void {
    this.addressError = '';
    this.addressEditorOpen = true;
    this.addressForm = address ? { ...address } : emptyAddressForm(this.auth, this.account.addresses().length);
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

  removeAddress(id: string): void {
    this.account.deleteAddress(id).subscribe({
      next: () => this.toast.show('Address removed.'),
    });
  }
}
