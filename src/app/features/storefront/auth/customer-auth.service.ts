import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { environment } from '../../../../environments/environment';
import { IOtpAuthPayload, ISendOtpModel, IVerifyOtpModel } from '../../../interface/login/IOtpAuth.Model';
import { CustomerProfile, CustomerSession } from './customer-account.models';

const SESSION_KEY = 'foodiedash.customer.session';
const OTP_LENGTH = 6;
const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_SECONDS = 30;

interface MockChallenge {
  countryCode: string;
  mobileNumber: string;
  otp: string;
  expiresAt: number;
  attempts: number;
}

@Injectable({ providedIn: 'root' })
export class CustomerAuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authApi = inject(AuthService);
  private readonly session = signal<CustomerSession | null>(null);
  private readonly loginOpen = signal(false);
  private readonly intendedUrl = signal<string | null>(null);
  private mockChallenge: MockChallenge | null = null;
  /** Shown only while environment.storefrontAuthMock is true. */
  readonly mockOtpHint = signal<string | null>(null);

  readonly currentUser = computed(() => this.session()?.profile ?? null);
  readonly isLoggedIn = computed(() => this.session() !== null);
  readonly isMockAuth = computed(() => this.session()?.mock === true || environment.storefrontAuthMock);
  readonly loginModalOpen = this.loginOpen.asReadonly();
  readonly returnUrl = this.intendedUrl.asReadonly();
  readonly initials = computed(() => this.toInitials(this.session()?.profile));
  readonly displayName = computed(() => {
    const profile = this.session()?.profile;
    if (!profile) return '';
    return profile.fullName.trim() || this.formatPhone(profile);
  });

  constructor() {
    this.restoreSession();
  }

  get otpLength(): number {
    return OTP_LENGTH;
  }

  get resendSeconds(): number {
    return RESEND_SECONDS;
  }

  getApiAccessToken(): string | null {
    const current = this.session();
    if (!current || current.mock || !current.accessToken) return null;
    if (Date.parse(current.expiresAt) <= Date.now()) {
      this.clearSession();
      return null;
    }
    return current.accessToken;
  }

  openLogin(returnUrl?: string | null): void {
    if (returnUrl) this.intendedUrl.set(returnUrl);
    this.loginOpen.set(true);
  }

  closeLogin(): void {
    this.loginOpen.set(false);
    this.mockOtpHint.set(null);
  }

  consumeReturnUrl(): string | null {
    const url = this.intendedUrl();
    this.intendedUrl.set(null);
    return url;
  }

  sendOtp(countryCode: string, mobileNumber: string): Observable<{ expiresInSeconds: number }> {
    const payload: ISendOtpModel = { countryCode, mobileNumber: this.digitsOnly(mobileNumber) };
    if (environment.storefrontAuthMock) {
      return of(this.createMockChallenge(payload));
    }

    return this.authApi.sendOtp(payload).pipe(
      map((response) => ({
        expiresInSeconds: response.payload?.expiresInSeconds || RESEND_SECONDS,
      })),
      catchError((error: unknown) => throwError(() => this.toAuthError(error, 'Unable to send a verification code.'))),
    );
  }

  verifyOtp(countryCode: string, mobileNumber: string, otp: string): Observable<CustomerProfile> {
    const payload: IVerifyOtpModel = {
      countryCode,
      mobileNumber: this.digitsOnly(mobileNumber),
      otp: this.digitsOnly(otp),
    };

    if (environment.storefrontAuthMock) {
      return this.verifyMockOtp(payload);
    }

    return this.authApi.verifyOtp(payload).pipe(
      map((response) => {
        const data = response.payload;
        if (!data?.accessToken || !data.user) {
          throw new Error(response.message || 'Verification failed. Please try again.');
        }
        return this.persistApiSession(data);
      }),
      catchError((error: unknown) => throwError(() => this.toAuthError(error, 'Invalid or expired verification code.'))),
    );
  }

  logout(): void {
    const token = this.getApiAccessToken();
    if (token) {
      this.authApi.logoutSession().pipe(catchError(() => of(null))).subscribe();
    }
    this.clearSession();
    this.closeLogin();
  }

  patchProfile(partial: Partial<CustomerProfile>): void {
    const current = this.session();
    if (!current) return;
    const next: CustomerSession = {
      ...current,
      profile: { ...current.profile, ...partial },
    };
    this.session.set(next);
    this.writeSession(next);
  }

  replaceProfile(profile: CustomerProfile): void {
    const current = this.session();
    if (!current) return;
    const next = { ...current, profile };
    this.session.set(next);
    this.writeSession(next);
  }

  formatPhone(profile: Pick<CustomerProfile, 'countryCode' | 'mobileNumber'>): string {
    return `${profile.countryCode} ${profile.mobileNumber}`;
  }

  maskPhone(countryCode: string, mobileNumber: string): string {
    const digits = this.digitsOnly(mobileNumber);
    const visible = digits.slice(-4);
    const masked = digits.slice(0, -4).replace(/\d/g, '•');
    return `${countryCode} ${masked}${visible}`;
  }

  validateMobile(countryCode: string, mobileNumber: string): string | null {
    const digits = this.digitsOnly(mobileNumber);
    if (!digits) return 'Enter your mobile number.';
    if (!/^\+\d{1,3}$/.test(countryCode)) return 'Choose a valid country code.';
    if (digits.length !== 10) return 'Enter a 10-digit mobile number.';
    if (!/^[1-9]\d{9}$/.test(digits)) return 'Enter a valid mobile number.';
    return null;
  }

  private createMockChallenge(payload: ISendOtpModel): { expiresInSeconds: number } {
    const otp = this.randomOtp();
    this.mockChallenge = {
      ...payload,
      otp,
      expiresAt: Date.now() + OTP_TTL_MS,
      attempts: 0,
    };
    this.mockOtpHint.set(otp);
    return { expiresInSeconds: RESEND_SECONDS };
  }

  private verifyMockOtp(payload: IVerifyOtpModel): Observable<CustomerProfile> {
    const challenge = this.mockChallenge;
    if (!challenge || challenge.mobileNumber !== payload.mobileNumber || challenge.countryCode !== payload.countryCode) {
      return throwError(() => new Error('Request a new verification code and try again.'));
    }
    if (Date.now() > challenge.expiresAt) {
      return throwError(() => new Error('This verification code has expired. Please request a new one.'));
    }
    challenge.attempts += 1;
    if (challenge.attempts > 5) {
      return throwError(() => new Error('Too many attempts. Request a new verification code.'));
    }
    if (payload.otp !== challenge.otp) {
      return throwError(() => new Error('Invalid verification code. Please try again.'));
    }

    const profile = this.buildProfile(payload.countryCode, payload.mobileNumber);
    const session: CustomerSession = {
      userId: profile.userId,
      accessToken: null,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      mock: true,
      profile,
    };
    this.session.set(session);
    this.writeSession(session);
    this.mockChallenge = null;
    this.mockOtpHint.set(null);
    return of(profile);
  }

  private persistApiSession(payload: IOtpAuthPayload): CustomerProfile {
    const user = payload.user;
    const profile: CustomerProfile = {
      userId: user.userId,
      fullName: user.fullName || '',
      email: user.email || '',
      countryCode: user.countryCode,
      mobileNumber: user.mobileNumber,
      phoneVerified: user.phoneVerified ?? true,
      emailVerified: user.emailVerified ?? false,
      defaultAddressId: null,
      createdAt: user.createdAt || new Date().toISOString(),
      membershipTier: user.membershipTier,
      preferences: {
        orderUpdates: true,
        offers: false,
        smsAlerts: true,
        shareActivity: false,
      },
    };
    const session: CustomerSession = {
      userId: profile.userId,
      accessToken: payload.accessToken,
      expiresAt: payload.expiresAt,
      mock: false,
      profile,
    };
    this.session.set(session);
    this.writeSession(session);
    return profile;
  }

  private buildProfile(countryCode: string, mobileNumber: string): CustomerProfile {
    return {
      userId: `cust-${countryCode}-${mobileNumber}`,
      fullName: '',
      email: '',
      countryCode,
      mobileNumber,
      phoneVerified: true,
      emailVerified: false,
      defaultAddressId: null,
      createdAt: new Date().toISOString(),
      preferences: {
        orderUpdates: true,
        offers: false,
        smsAlerts: true,
        shareActivity: false,
      },
    };
  }

  private restoreSession(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CustomerSession;
      if (!parsed?.userId || !parsed.profile || Date.parse(parsed.expiresAt) <= Date.now()) {
        sessionStorage.removeItem(SESSION_KEY);
        return;
      }
      if (parsed.mock && !environment.storefrontAuthMock) {
        sessionStorage.removeItem(SESSION_KEY);
        return;
      }
      this.session.set(parsed);
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }

  private writeSession(session: CustomerSession): void {
    if (!isPlatformBrowser(this.platformId)) return;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  private clearSession(): void {
    this.session.set(null);
    this.mockChallenge = null;
    this.mockOtpHint.set(null);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }

  private randomOtp(): string {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return String(values[0] % 1_000_000).padStart(OTP_LENGTH, '0');
  }

  private digitsOnly(value: string): string {
    return (value || '').replace(/\D/g, '');
  }

  private toInitials(profile?: CustomerProfile | null): string {
    if (!profile) return '';
    const parts = profile.fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    if (parts.length === 1 && parts[0].length >= 2) return parts[0].slice(0, 2).toUpperCase();
    if (parts.length === 1) return `${parts[0][0]}${profile.mobileNumber.slice(-1)}`.toUpperCase();
    return profile.mobileNumber.slice(-2);
  }

  private toAuthError(error: unknown, fallback: string): Error {
    if (error instanceof HttpErrorResponse) {
      const body = error.error as { message?: string } | string | null;
      if (typeof body === 'string' && body.trim()) return new Error(body);
      if (body && typeof body === 'object' && body.message) return new Error(body.message);
      if (error.status === 401) return new Error('Invalid verification code. Please try again.');
      if (error.status === 410) return new Error('This verification code has expired. Please request a new one.');
    }
    if (error instanceof Error && error.message) return error;
    return new Error(fallback);
  }
}
