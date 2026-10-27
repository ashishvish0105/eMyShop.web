import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, Output, QueryList, ViewChildren, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerAuthService } from './customer-auth.service';

type AuthStep = 'phone' | 'otp' | 'success';

@Component({
  selector: 'app-storefront-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './storefront-login-modal.component.html',
})
export class StorefrontLoginModalComponent implements OnDestroy {
  readonly auth = inject(CustomerAuthService);
  @Output() authenticated = new EventEmitter<void>();
  @ViewChildren('otpBox') private otpBoxes?: QueryList<ElementRef<HTMLInputElement>>;

  step: AuthStep = 'phone';
  countryCode = '+1';
  mobileNumber = '';
  phoneError = '';
  otpError = '';
  otpDigits: string[] = Array.from({ length: this.auth.otpLength }, () => '');
  submitting = false;
  resendIn = 0;
  private resendTimer?: ReturnType<typeof setInterval>;

  readonly countryCodes = ['+1', '+91', '+44', '+61'];

  ngOnDestroy(): void {
    this.clearTimer();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.step !== 'success') this.close();
  }

  close(): void {
    if (this.submitting) return;
    this.auth.closeLogin();
    this.reset();
  }

  backToPhone(): void {
    this.step = 'phone';
    this.otpError = '';
    this.otpDigits = Array.from({ length: this.auth.otpLength }, () => '');
  }

  submitPhone(): void {
    this.phoneError = this.auth.validateMobile(this.countryCode, this.mobileNumber);
    if (this.phoneError) return;
    this.submitting = true;
    this.auth.sendOtp(this.countryCode, this.mobileNumber).subscribe({
      next: () => {
        this.submitting = false;
        this.step = 'otp';
        this.startResendCountdown();
        setTimeout(() => this.focusOtp(0));
      },
      error: (error: Error) => {
        this.submitting = false;
        if (this.step === 'otp') this.otpError = error.message;
        else this.phoneError = error.message;
      },
    });
  }

  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const digit = (input.value || '').replace(/\D/g, '').slice(-1);
    this.otpDigits[index] = digit;
    input.value = digit;
    if (digit && index < this.otpDigits.length - 1) this.focusOtp(index + 1);
    if (this.otpDigits.join('').length === this.auth.otpLength) this.submitOtp();
  }

  onOtpKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      this.otpDigits[index - 1] = '';
      this.focusOtp(index - 1);
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const digits = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, this.auth.otpLength).split('');
    this.otpDigits = Array.from({ length: this.auth.otpLength }, (_, index) => digits[index] || '');
    this.otpBoxes?.forEach((box, index) => {
      box.nativeElement.value = this.otpDigits[index];
    });
    this.focusOtp(Math.min(digits.length, this.auth.otpLength - 1));
    if (digits.length === this.auth.otpLength) this.submitOtp();
  }

  resendOtp(): void {
    if (this.resendIn > 0 || this.submitting) return;
    this.submitPhone();
  }

  submitOtp(): void {
    const otp = this.otpDigits.join('');
    if (otp.length !== this.auth.otpLength || this.submitting) return;
    this.submitting = true;
    this.otpError = '';
    this.auth.verifyOtp(this.countryCode, this.mobileNumber, otp).subscribe({
      next: () => {
        this.submitting = false;
        this.step = 'success';
        setTimeout(() => {
          this.authenticated.emit();
          this.auth.closeLogin();
          this.reset();
        }, 1100);
      },
      error: (error: Error) => {
        this.submitting = false;
        this.otpError = error.message;
        this.otpDigits = Array.from({ length: this.auth.otpLength }, () => '');
        this.otpBoxes?.forEach((box) => (box.nativeElement.value = ''));
        this.focusOtp(0);
      },
    });
  }

  private startResendCountdown(): void {
    this.clearTimer();
    this.resendIn = this.auth.resendSeconds;
    this.resendTimer = setInterval(() => {
      this.resendIn -= 1;
      if (this.resendIn <= 0) this.clearTimer();
    }, 1000);
  }

  private focusOtp(index: number): void {
    this.otpBoxes?.get(index)?.nativeElement.focus();
  }

  private clearTimer(): void {
    if (this.resendTimer) {
      clearInterval(this.resendTimer);
      this.resendTimer = undefined;
    }
  }

  private reset(): void {
    this.step = 'phone';
    this.phoneError = '';
    this.otpError = '';
    this.submitting = false;
    this.otpDigits = Array.from({ length: this.auth.otpLength }, () => '');
    this.clearTimer();
  }
}
