
import { Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-store-payment-integrate',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './store-payment-integrate.component.html',
  styleUrl: './store-payment-integrate.component.scss'
})
export class StorePaymentIntegrateComponent {
 submitted = signal(false);

  licenseFileName = signal('');
  storefrontFileName = signal('');

  verificationForm = new FormGroup({
    legalBusinessName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    taxId: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{2}-?\d{7}$/)
    ]),

    licenseFile: new FormControl<File | null>(
      null,
      Validators.required
    ),

    storefrontFile: new FormControl<File | null>(
      null,
      Validators.required
    ),

    accountHolderName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    routingNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{9}$/)
    ]),

    accountNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4,17}$/)
    ])
  });

  // documentsComplete = computed(() =>
  //   !!this.verificationForm.controls.licenseFile.value &&
  //   !!this.verificationForm.controls.storefrontFile.value
  // );

  // bankComplete = computed(() => {
  //   const controls = this.verificationForm.controls;

  //   return controls.accountHolderName.valid &&
  //     controls.routingNumber.valid &&
  //     controls.accountNumber.valid;
  // });

  // completionCount = computed(() => {
  //   let count = 1;

  //   if (this.documentsComplete()) {
  //     count++;
  //   }

  //   if (this.bankComplete()) {
  //     count++;
  //   }

  //   return count;
  // });

  get documentsComplete(): boolean {
  return !!this.verificationForm.controls.licenseFile.value &&
         !!this.verificationForm.controls.storefrontFile.value;
}

get bankComplete(): boolean {
  const controls = this.verificationForm.controls;

  return controls.accountHolderName.valid &&
         controls.routingNumber.valid &&
         controls.accountNumber.valid;
}

get completionCount(): number {
  return 1 +
    (this.documentsComplete ? 1 : 0) +
    (this.bankComplete ? 1 : 0);
}

get statusText(): string {
  return `${this.completionCount} of 3 Complete`;
}

  get isSubmitted(): boolean {
    return this.submitted();
  }

  // get statusText(): string {
  //   return `${this.completionCount()} of 3 Complete`;
  // }

  onFileSelected(
    event: Event,
    controlName: UploadControl
  ): void {

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png'
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PDF, JPG, or PNG file.');
      input.value = '';
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5 MB.');
      input.value = '';
      return;
    }

    this.verificationForm.controls[controlName].setValue(file);

    this.verificationForm.controls[controlName].markAsTouched();

    if (controlName === 'licenseFile') {
      this.licenseFileName.set(file.name);
    } else {
      this.storefrontFileName.set(file.name);
    }

    this.submitted.set(false);
  }

  removeFile(controlName: UploadControl): void {

    this.verificationForm.controls[controlName].setValue(null);

    if (controlName === 'licenseFile') {
      this.licenseFileName.set('');
    } else {
      this.storefrontFileName.set('');
    }

    this.submitted.set(false);
  }

  submitVerification(): void {

    this.verificationForm.markAllAsTouched();

    if (this.verificationForm.invalid) {
      return;
    }

    this.submitted.set(true);

    // Integrate your verification API here.
    console.log(
      'Verification form:',
      this.verificationForm.getRawValue()
    );
  }

  getControl(controlName: string) {
    return this.verificationForm.get(controlName);
  }
}

type UploadControl = 'licenseFile' | 'storefrontFile';
