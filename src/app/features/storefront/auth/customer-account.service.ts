import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MenuItem } from '../../mock-commerce.service';
import {
  CustomerAccountState,
  CustomerAddress,
  CustomerNotification,
  CustomerOrder,
  CustomerPreferences,
  CustomerProfile,
} from './customer-account.models';
import { CustomerAuthService } from './customer-auth.service';

const ACCOUNT_KEY = 'foodiedash.customer.accounts';

@Injectable({ providedIn: 'root' })
export class CustomerAccountService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(CustomerAuthService);
  private readonly store = signal<CustomerAccountState | null>(null);

  readonly profile = computed(() => this.store()?.profile ?? this.auth.currentUser());
  readonly addresses = computed(() => this.store()?.addresses ?? []);
  readonly orders = computed(() => this.store()?.orders ?? []);
  readonly notifications = computed(() => this.store()?.notifications ?? []);
  readonly wishlistIds = computed(() => this.store()?.wishlistIds ?? []);
  readonly unreadCount = computed(() => this.notifications().filter((item) => !item.read).length);
  readonly defaultAddress = computed(() => this.addresses().find((item) => item.isDefault) ?? this.addresses()[0] ?? null);

  loadAccount(): Observable<CustomerAccountState | null> {
    const user = this.auth.currentUser();
    if (!user) {
      this.store.set(null);
      return of(null);
    }
    if (environment.storefrontAuthMock || this.auth.isMockAuth()) {
      const state = this.readMockAccount(user);
      this.store.set(state);
      return of(state);
    }
    return this.http.get<{ payload: CustomerAccountState }>(`${environment.BaseUrl}Customer/Me`).pipe(
      map((response) => response.payload),
      tap((state) => {
        this.store.set(state);
        this.auth.replaceProfile(state.profile);
      }),
      catchError((error) => throwError(() => error)),
    );
  }

  saveProfile(profile: CustomerProfile): Observable<CustomerProfile> {
    if (environment.storefrontAuthMock || this.auth.isMockAuth()) {
      const next = this.patchStore({ profile });
      this.auth.replaceProfile(profile);
      return of(next.profile);
    }
    return this.http.put<{ payload: CustomerProfile }>(`${environment.BaseUrl}Customer/Me`, profile).pipe(
      map((response) => response.payload),
      tap((saved) => {
        this.patchStore({ profile: saved });
        this.auth.replaceProfile(saved);
      }),
    );
  }

  savePreferences(preferences: CustomerPreferences): Observable<CustomerPreferences> {
    const profile = this.profile();
    if (!profile) return throwError(() => new Error('Sign in to update preferences.'));
    return this.saveProfile({ ...profile, preferences }).pipe(map((saved) => saved.preferences));
  }

  saveAddress(address: Omit<CustomerAddress, 'id'> & { id?: string }): Observable<CustomerAddress[]> {
    if (environment.storefrontAuthMock || this.auth.isMockAuth()) {
      const current = this.requireStore();
      const id = address.id || `addr-${Date.now()}`;
      const nextAddress: CustomerAddress = { ...address, id };
      let addresses = current.addresses.some((item) => item.id === id)
        ? current.addresses.map((item) => item.id === id ? nextAddress : item)
        : [...current.addresses, nextAddress];
      if (nextAddress.isDefault) {
        addresses = addresses.map((item) => ({ ...item, isDefault: item.id === id }));
      }
      const profile = {
        ...current.profile,
        defaultAddressId: addresses.find((item) => item.isDefault)?.id ?? null,
      };
      this.patchStore({ addresses, profile });
      this.auth.replaceProfile(profile);
      return of(addresses);
    }
    const request$ = address.id
      ? this.http.put<{ payload: CustomerAddress[] }>(`${environment.BaseUrl}Customer/Addresses/${address.id}`, address)
      : this.http.post<{ payload: CustomerAddress[] }>(`${environment.BaseUrl}Customer/Addresses`, address);
    return request$.pipe(map((response) => response.payload), tap((addresses) => this.patchStore({ addresses })));
  }

  deleteAddress(id: string): Observable<CustomerAddress[]> {
    if (environment.storefrontAuthMock || this.auth.isMockAuth()) {
      const addresses = this.requireStore().addresses.filter((item) => item.id !== id);
      const profile = { ...this.requireStore().profile, defaultAddressId: addresses.find((item) => item.isDefault)?.id ?? null };
      this.patchStore({ addresses, profile });
      return of(addresses);
    }
    return this.http.delete<{ payload: CustomerAddress[] }>(`${environment.BaseUrl}Customer/Addresses/${id}`).pipe(
      map((response) => response.payload),
      tap((addresses) => this.patchStore({ addresses })),
    );
  }

  setDefaultAddress(id: string): void {
    const addresses = this.addresses().map((item) => ({ ...item, isDefault: item.id === id }));
    const profile = this.profile();
    if (!profile) return;
    this.patchStore({ addresses, profile: { ...profile, defaultAddressId: id } });
    this.auth.patchProfile({ defaultAddressId: id });
  }

  addOrder(order: CustomerOrder): void {
    const current = this.store();
    if (!current) return;
    this.patchStore({ orders: [order, ...current.orders] });
    this.addNotification({
      title: 'Order placed',
      body: `${order.id} is confirmed and the kitchen has started preparing it.`,
      type: 'order',
    });
  }

  updateOrderStatus(id: string, deliveryStatus: CustomerOrder['deliveryStatus']): void {
    const orders = this.orders().map((order) => order.id === id ? { ...order, deliveryStatus } : order);
    this.patchStore({ orders });
  }

  toggleWishlist(productId: number): boolean {
    const ids = this.wishlistIds();
    const next = ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId];
    this.patchStore({ wishlistIds: next });
    return next.includes(productId);
  }

  isWishlisted(productId: number): boolean {
    return this.wishlistIds().includes(productId);
  }

  wishlistItems(products: MenuItem[]): MenuItem[] {
    const ids = new Set(this.wishlistIds());
    return products.filter((product) => ids.has(product.id));
  }

  markNotificationRead(id: string): void {
    const notifications = this.notifications().map((item) => item.id === id ? { ...item, read: true } : item);
    this.patchStore({ notifications });
  }

  markAllNotificationsRead(): void {
    this.patchStore({ notifications: this.notifications().map((item) => ({ ...item, read: true })) });
  }

  deleteAccount(): Observable<void> {
    if (environment.storefrontAuthMock || this.auth.isMockAuth()) {
      this.removeMockAccount();
      this.store.set(null);
      this.auth.logout();
      return of(void 0);
    }
    return this.http.delete(`${environment.BaseUrl}Customer/Me`).pipe(
      map(() => void 0),
      tap(() => {
        this.store.set(null);
        this.auth.logout();
      }),
    );
  }

  formatAddress(address: CustomerAddress | null): string {
    if (!address) return '';
    return [address.street, address.city, address.state, address.postalCode].filter(Boolean).join(', ');
  }

  private addNotification(input: Pick<CustomerNotification, 'title' | 'body' | 'type'>): void {
    const notification: CustomerNotification = {
      id: `ntf-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
      ...input,
    };
    this.patchStore({ notifications: [notification, ...this.notifications()] });
  }

  private requireStore(): CustomerAccountState {
    const current = this.store();
    if (!current) throw new Error('No customer account is loaded.');
    return current;
  }

  private patchStore(partial: Partial<CustomerAccountState>): CustomerAccountState {
    const current = this.store() ?? this.emptyState(this.auth.currentUser()!);
    const next = { ...current, ...partial };
    this.store.set(next);
    this.writeMockAccount(next);
    return next;
  }

  private emptyState(profile: CustomerProfile): CustomerAccountState {
    return {
      profile,
      addresses: [],
      orders: [],
      wishlistIds: [],
      notifications: [
        {
          id: 'ntf-welcome',
          title: 'Welcome to FoodieDash',
          body: 'Your account is ready. Add an address so we can deliver your first order.',
          createdAt: new Date().toISOString(),
          read: false,
          type: 'account',
        },
      ],
    };
  }

  private readMockAccount(profile: CustomerProfile): CustomerAccountState {
    const all = this.readAllMockAccounts();
    const existing = all[profile.userId];
    if (existing) {
      const merged = { ...existing, profile: { ...existing.profile, ...profile, preferences: profile.preferences } };
      all[profile.userId] = merged;
      this.writeAllMockAccounts(all);
      return merged;
    }
    const created = this.emptyState(profile);
    all[profile.userId] = created;
    this.writeAllMockAccounts(all);
    return created;
  }

  private writeMockAccount(state: CustomerAccountState): void {
    if (!environment.storefrontAuthMock && !this.auth.isMockAuth()) return;
    const all = this.readAllMockAccounts();
    all[state.profile.userId] = state;
    this.writeAllMockAccounts(all);
  }

  private removeMockAccount(): void {
    const user = this.auth.currentUser();
    if (!user || typeof sessionStorage === 'undefined') return;
    const all = this.readAllMockAccounts();
    delete all[user.userId];
    this.writeAllMockAccounts(all);
  }

  private readAllMockAccounts(): Record<string, CustomerAccountState> {
    if (typeof sessionStorage === 'undefined') return {};
    try {
      return JSON.parse(sessionStorage.getItem(ACCOUNT_KEY) || '{}') as Record<string, CustomerAccountState>;
    } catch {
      return {};
    }
  }

  private writeAllMockAccounts(all: Record<string, CustomerAccountState>): void {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(all));
  }
}
