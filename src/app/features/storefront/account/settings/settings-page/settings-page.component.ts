import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAccountService } from '../../../auth/customer-account.service';
import { CustomerAuthService } from '../../../auth/customer-auth.service';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { emptyProfileForm } from '../../../storefront.utils';
import { StorefrontToastService } from '../../../toast.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule, ConfirmDialogComponent],
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent implements OnInit {
  readonly auth = inject(CustomerAuthService);
  readonly account = inject(CustomerAccountService);
  private readonly router = inject(Router);
  private readonly toast = inject(StorefrontToastService);
  profileSaved = false;
  profileSaving = false;
  profileError = '';
  deleteAccountOpen = false;
  profileForm = emptyProfileForm();

  ngOnInit(): void {
    this.syncProfileForm();
  }

  saveSettings(): void {
    const profile = this.account.profile();
    if (!profile) return;
    if (!this.profileForm.fullName.trim()) {
      this.profileError = 'Enter your full name.';
      return;
    }
    if (!this.profileForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profileForm.email)) {
      this.profileError = 'Enter a valid email address.';
      return;
    }
    this.profileSaving = true;
    this.profileError = '';
    this.account.saveProfile({
      ...profile,
      fullName: this.profileForm.fullName.trim(),
      email: this.profileForm.email.trim(),
      preferences: { ...this.profileForm.preferences },
    }).subscribe({
      next: () => {
        this.profileSaving = false;
        this.profileSaved = true;
        this.toast.show('Your profile has been updated.');
      },
      error: () => {
        this.profileSaving = false;
        this.profileError = 'We could not save your profile. Please try again.';
      },
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/products']);
  }

  confirmDeleteAccount(): void {
    this.account.deleteAccount().subscribe({
      next: () => {
        this.deleteAccountOpen = false;
        this.router.navigate(['/products']);
        this.toast.show('Your FoodieDash account was deleted.');
      },
    });
  }

  private syncProfileForm(): void {
    const profile = this.account.profile();
    this.profileForm = profile
      ? { fullName: profile.fullName, email: profile.email, preferences: { ...profile.preferences } }
      : emptyProfileForm();
  }
}
