import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-personal-profile',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './personal-profile.component.html',
  styleUrl: './personal-profile.component.scss'
})

export class PersonalProfileComponent {
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
    timezone: 'Asia/Kolkata (IST)'
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
    description:
      'Receive order confirmations, invoices and important account information by email.'
  },
  {
    key: 'sms',
    icon: 'fa-solid fa-comment-sms',
    title: 'SMS Notifications',
    description:
      'Get important payment, shipment and delivery updates through SMS.'
  },
  {
    key: 'whatsapp',
    icon: 'fa-brands fa-whatsapp',
    title: 'WhatsApp Notifications',
    description:
      'Receive order updates and support messages through WhatsApp.'
  },
  {
    key: 'orderUpdates',
    icon: 'fa-solid fa-truck-fast',
    title: 'Order & Delivery Updates',
    description:
      'Stay informed when an order is confirmed, packed, shipped or delivered.'
  },
  {
    key: 'promotions',
    icon: 'fa-solid fa-bullhorn',
    title: 'Promotional Notifications',
    description:
      'Discover exclusive offers, seasonal discounts and new arrivals.'
  }
];

  passwords = {
    current: '',
    new: '',
    confirm: ''
  };

  isEditing = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  showDeleteConfirmation = false;
  toastMessage = '';

  private originalProfile: CustomerProfile | null = null;

  get fullName(): string {
    return `${this.profile.firstName} ${this.profile.lastName}`.trim();
  }

  get initials(): string {
    const firstInitial = this.profile.firstName.charAt(0);
    const lastInitial = this.profile.lastName.charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
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

  get passwordStrength(): 'Not entered' | 'Weak' | 'Medium' | 'Strong' {
    const value = this.passwords.new;

    if (!value) {
      return 'Not entered';
    }

    const checks = [
      value.length >= 8,
      /[A-Z]/.test(value),
      /[a-z]/.test(value),
      /\d/.test(value),
      /[^A-Za-z0-9]/.test(value)
    ].filter(Boolean).length;

    if (checks === 5) {
      return 'Strong';
    }

    if (checks >= 3) {
      return 'Medium';
    }

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

  enableEdit(): void {
    this.originalProfile = { ...this.profile };
    this.isEditing = true;
  }

  cancelEdit(): void {
    if (this.originalProfile) {
      this.profile = { ...this.originalProfile };
    }

    this.originalProfile = null;
    this.isEditing = false;
  }

  saveProfile(): void {
    const hasRequiredFields =
      this.profile.firstName.trim().length > 0 &&
      this.profile.lastName.trim().length > 0 &&
      this.isValidEmail(this.profile.email) &&
      this.profile.mobile.trim().length > 0;

    if (!hasRequiredFields) {
      this.showToast(
        'Please complete all required fields with valid information.'
      );
      return;
    }

    // TODO: Send the updated profile to your .NET API.
    this.originalProfile = null;
    this.isEditing = false;
    this.showToast('Profile updated successfully.');
  }

  savePreferences(): void {
    // TODO: Persist preferences and notification settings through your API.
    this.showToast('Your preferences have been saved.');
  }

  copyCustomerId(): void {
    const customerId = this.profile.customerId;

    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard?.writeText
    ) {
      navigator.clipboard
        .writeText(customerId)
        .then(() => this.showToast('Customer ID copied.'))
        .catch(() =>
          this.showToast(`Customer ID: ${customerId}`)
        );

      return;
    }

    this.showToast(`Customer ID: ${customerId}`);
  }

  toggleTwoFactor(): void {
    this.profile.twoFactorEnabled = !this.profile.twoFactorEnabled;

    // TODO: Connect this action to your authentication/2FA API.
    this.showToast(
      this.profile.twoFactorEnabled
        ? '2FA enabled in this demo.'
        : '2FA disabled in this demo.'
    );
  }

  updatePassword(form: NgForm): void {
    if (form.invalid) {
      this.showToast('Please complete all password fields.');
      return;
    }

    if (this.passwords.new !== this.passwords.confirm) {
      this.showToast('New password and confirmation do not match.');
      return;
    }

    if (!this.isStrongPassword(this.passwords.new)) {
      this.showToast(
        'Use 8+ characters with uppercase, lowercase, number and symbol.'
      );
      return;
    }

    // TODO: Send current and new passwords securely to your .NET API.
    this.passwords = {
      current: '',
      new: '',
      confirm: ''
    };

    form.resetForm();
    this.showToast('Password update request is ready to submit.');
  }

  requestAccountDeletion(): void {
    this.showDeleteConfirmation = false;

    // TODO: Submit a deletion request to your API after re-authentication.
    this.showToast(
      'Account deletion request has not been submitted to a server yet.'
    );
  }

  signOut(): void {
    // TODO: Call your authentication service to sign the customer out.
    this.showToast('Connect this button to your authentication sign-out method.');
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  private isStrongPassword(value: string): boolean {
    return (
      value.length >= 8 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /\d/.test(value) &&
      /[^A-Za-z0-9]/.test(value)
    );
  }

  private showToast(message: string): void {
    this.toastMessage = message;
  }
}



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
