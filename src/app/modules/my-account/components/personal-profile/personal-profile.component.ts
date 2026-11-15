
import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { SnackbarService } from '../../../../shared/services/snackbar.service';

type NotificationKey =
  | 'email'
  | 'sms'
  | 'whatsapp'
  | 'orderUpdates'
  | 'promotions';

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  gender: string;
  dateOfBirth: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  membershipEnabled: boolean;
  membershipLevel: string;
  loyaltyPoints: number;
  nextTierPoints: number;
  nextTier: string;
  nextReward: string;
  customerId: string;
  memberSince: string;
  lastLogin: string;
  accountStatus: string;
  twoFactorEnabled: boolean;
}

@Component({
  selector: 'app-personal-profile',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './personal-profile.component.html',
  styleUrl: './personal-profile.component.scss'
})
export class PersonalProfileComponent implements OnInit {

  private fb = inject(FormBuilder);
  private snackbarService = inject(SnackbarService);

  isEditing = false;

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  showDeleteConfirmation = false;

  profileForm!: FormGroup;
  preferencesForm!: FormGroup;
  notificationForm!: FormGroup;
  passwordForm!: FormGroup;

  profile: CustomerProfile = {
    firstName: 'Ashish',
    lastName: 'Vishwakarma',
    username: 'ashish',
    email: 'ashish@example.com',
    mobile: '+91 98765 43210',
    gender: '',
    dateOfBirth: '',
    emailVerified: false,
    mobileVerified: false,
    membershipEnabled: false,
    membershipLevel: 'Standard',
    loyaltyPoints: 0,
    nextTierPoints: 500,
    nextTier: 'Silver',
    nextReward: 'Rewards and benefits will appear here when available.',
    customerId: 'EMY-000001',
    memberSince: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    accountStatus: 'Active',
    twoFactorEnabled: false
  };

  preferences = {
    language: 'English',
    currency: 'INR',
    timezone: 'Asia/Kolkata'
  };

  stats = {
    activeOrders: 0,
    wishlistItems: 0,
    cartItems: 0
  };

  notifications: Record<NotificationKey, boolean> = {
    email: true,
    sms: true,
    whatsapp: false,
    orderUpdates: true,
    promotions: false
  };

  readonly notificationOptions: Array<{
    key: NotificationKey;
    icon: string;
    title: string;
    description: string;
  }> = [
    {
      key: 'email',
      icon: 'fa-solid fa-envelope',
      title: 'Email Notifications',
      description: 'Receive order confirmations, invoices and important account information by email.'
    },
    {
      key: 'sms',
      icon: 'fa-solid fa-comment-sms',
      title: 'SMS Notifications',
      description: 'Get important payment, shipment and delivery updates through SMS.'
    },
    {
      key: 'whatsapp',
      icon: 'fa-brands fa-whatsapp',
      title: 'WhatsApp Notifications',
      description: 'Receive order updates and support messages through WhatsApp.'
    },
    {
      key: 'orderUpdates',
      icon: 'fa-solid fa-truck-fast',
      title: 'Order & Delivery Updates',
      description: 'Stay informed when an order is confirmed, packed, shipped or delivered.'
    },
    {
      key: 'promotions',
      icon: 'fa-solid fa-bullhorn',
      title: 'Promotional Notifications',
      description: 'Discover exclusive offers, seasonal discounts and new arrivals.'
    }
  ];

  ngOnInit(): void {
    this.initializeForms();
  }

  get fullName(): string {
    return `${this.profile.firstName} ${this.profile.lastName}`.trim();
  }

  get initials(): string {
    return (
      this.profile.firstName.charAt(0) +
      this.profile.lastName.charAt(0)
    ).toUpperCase();
  }

  get loyaltyProgress(): number {
    if (this.profile.nextTierPoints <= 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.round(
        (this.profile.loyaltyPoints / this.profile.nextTierPoints) * 100
      )
    );
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      firstName: [
        this.profile.firstName,
        [Validators.required, Validators.maxLength(50)]
      ],
      lastName: [
        this.profile.lastName,
        [Validators.required, Validators.maxLength(50)]
      ],
      email: [
        this.profile.email,
        [Validators.required, Validators.email]
      ],
      mobile: [
        this.profile.mobile,
        [
          Validators.required,
          Validators.pattern(/^\+?[0-9\s-]{10,18}$/)
        ]
      ],
      gender: [this.profile.gender],
      dateOfBirth: [this.profile.dateOfBirth]
    });

    this.preferencesForm = this.fb.group({
      language: [
        this.preferences.language,
        Validators.required
      ],
      currency: [
        this.preferences.currency,
        Validators.required
      ],
      timezone: [
        { value: this.preferences.timezone, disabled: true }
      ]
    });

    this.notificationForm = this.fb.group({
      email: [this.notifications.email],
      sms: [this.notifications.sms],
      whatsapp: [this.notifications.whatsapp],
      orderUpdates: [this.notifications.orderUpdates],
      promotions: [this.notifications.promotions]
    });

    this.passwordForm = this.fb.group({
      current: ['', Validators.required],
      new: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
          )
        ]
      ],
      confirm: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });

    this.setProfileEditing(false);
  }

  passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {
    const password = form.get('new')?.value;
    const confirm = form.get('confirm')?.value;

    if (!confirm) {
      return null;
    }

    return password === confirm
      ? null
      : { passwordMismatch: true };
  }

  setProfileEditing(editing: boolean): void {
    this.isEditing = editing;

    if (editing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  editProfile(): void {
    this.setProfileEditing(true);
  }

  cancelEdit(): void {
    this.profileForm.reset({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      email: this.profile.email,
      mobile: this.profile.mobile,
      gender: this.profile.gender,
      dateOfBirth: this.profile.dateOfBirth
    });

    this.setProfileEditing(false);
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.showToast('Please complete all required profile fields.');
      return;
    }

    const formData = this.profileForm.getRawValue();

    this.profile = {
      ...this.profile,
      ...formData
    };

    // TODO: Send updated profile to your .NET API.

    this.setProfileEditing(false);
    this.showToast('Profile updated successfully.');
  }

  savePreferences(): void {
    if (
      this.preferencesForm.invalid ||
      this.notificationForm.invalid
    ) {
      this.preferencesForm.markAllAsTouched();
      this.notificationForm.markAllAsTouched();
      return;
    }

    this.preferences = {
      ...this.preferences,
      ...this.preferencesForm.getRawValue()
    };

    this.notifications = {
      ...this.notifications,
      ...this.notificationForm.getRawValue()
    };

    // TODO: Persist preferences and notifications through your API.

    this.showToast('Your preferences have been saved.');
  }

  get passwordStrength(): 'Not entered' | 'Weak' | 'Medium' | 'Strong' {
    const password = this.passwordForm?.get('new')?.value || '';

    if (!password) {
      return 'Not entered';
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score === 5) return 'Strong';
    if (score >= 3) return 'Medium';

    return 'Weak';
  }

  get passwordStrengthPercent(): number {
    switch (this.passwordStrength) {
      case 'Strong':
        return 100;
      case 'Medium':
        return 60;
      case 'Weak':
        return 30;
      default:
        return 0;
    }
  }

  get passwordStrengthClass(): string {
    switch (this.passwordStrength) {
      case 'Strong':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'Weak':
        return 'bg-danger';
      default:
        return '';
    }
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();

      if (this.passwordForm.hasError('passwordMismatch')) {
        this.showToast('New password and confirmation do not match.');
      } else {
        this.showToast('Please enter valid password details.');
      }

      return;
    }

    const passwordData = this.passwordForm.getRawValue();

    // TODO: Send current and new passwords securely to your .NET API.
    // Never log or store passwords in client-side storage.

    console.log('Password update form is valid.');

    this.passwordForm.reset();

    this.showCurrentPassword = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;

    this.showToast('Password update request is ready to submit.');
  }

  toggleTwoFactor(): void {
    this.profile.twoFactorEnabled =
      !this.profile.twoFactorEnabled;

    // TODO: Connect to your authentication/2FA API.

    this.showToast(
      this.profile.twoFactorEnabled
        ? '2FA enabled in this demo.'
        : '2FA disabled in this demo.'
    );
  }

  async copyCustomerId(): Promise<void> {
    try {
      await navigator.clipboard.writeText(
        this.profile.customerId
      );

      this.showToast('Customer ID copied.');
    } catch {
      this.showToast(
        `Customer ID: ${this.profile.customerId}`
      );
    }
  }

  requestAccountDeletion(): void {
    this.showDeleteConfirmation = false;

    // TODO: Submit deletion request after server-side re-authentication.

    this.showToast(
      'Account deletion request has not been submitted to a server yet.'
    );
  }

  deleteAccount(): void {
    this.requestAccountDeletion();
  }

  signOut(): void {
    // TODO: Connect your authentication sign-out method.

    this.showToast(
      'Connect this button to your authentication sign-out method.'
    );
  }

  private showToast(message: string): void {
    this.snackbarService.success(message);
  }
}
