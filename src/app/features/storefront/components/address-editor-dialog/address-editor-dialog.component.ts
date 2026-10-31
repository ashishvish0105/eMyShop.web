import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerAddress } from '../../auth/customer-account.models';

@Component({
  selector: 'app-storefront-address-editor-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './address-editor-dialog.component.html',
})
export class AddressEditorDialogComponent {
  @Input({ required: true }) addressForm!: CustomerAddress;
  @Input() addressError = '';
  @Output() cancelled = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
}
