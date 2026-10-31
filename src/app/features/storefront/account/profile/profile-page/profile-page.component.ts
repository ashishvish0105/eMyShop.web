import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerAccountService } from '../../../auth/customer-account.service';
import { CustomerAuthService } from '../../../auth/customer-auth.service';
import { emptyProfileForm } from '../../../storefront.utils';
import { StorefrontToastService } from '../../../toast.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  readonly auth = inject(CustomerAuthService);
  readonly account = inject(CustomerAccountService);
  private readonly toast = inject(StorefrontToastService);
  editingProfile = false;
  profileSaved = false;
  profileSaving = false;
  profileError = '';
  profileForm = emptyProfileForm();

  ngOnInit(): void {
    this.syncProfileForm();
  }

  memberSince(): string {
    const createdAt = this.account.profile()?.createdAt;
    if (!createdAt) return 'FoodieDash member';
    const year = new Date(createdAt).getFullYear();
    return Number.isFinite(year) ? `FoodieDash member since ${year}` : 'FoodieDash member';
  }

  startProfileEdit(): void {
    this.editingProfile = true;
    this.profileSaved = false;
    this.profileError = '';
    this.syncProfileForm();
  }

  saveProfile(): void {
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
        this.editingProfile = false;
        this.toast.show('Your profile has been updated.');
      },
      error: () => {
        this.profileSaving = false;
        this.profileError = 'We could not save your profile. Please try again.';
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
