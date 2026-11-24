import {
  Component,
  input,
  output,
  effect,
  inject
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-registration-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.scss'
})
export class RegistrationModalComponent {
  private fb = inject(FormBuilder);

  isSubmitted = false;
  registeredShopName = '';

  categories = [
    'Grocery & Specialty Food',
    'Bakery & Cafe',
    'Boutique & Home Goods',
    'Pharmacy & Wellness',
    'Hardware & Local Services'
  ];

  registrationForm = this.fb.group({
    shopName: ['', Validators.required],
    ownerName: ['', Validators.required],
    category: ['Grocery & Specialty Food', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^[0-9+\-\s()]{7,20}$/)
    ]],
    address: ['', Validators.required],
    homeDelivery: [true],
    storePickup: [true]
  });

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.registeredShopName =
      this.registrationForm.controls.shopName.value?.trim() ?? '';

    // TODO: Call your backend registration API.

    this.isSubmitted = true;
  }

  resetForm(): void {
    this.registrationForm.reset({
      shopName: '',
      ownerName: '',
      category: 'Grocery & Specialty Food',
      email: '',
      phone: '',
      address: '',
      homeDelivery: true,
      storePickup: true
    });

    this.isSubmitted = false;
  }
}
