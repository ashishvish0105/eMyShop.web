import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, Observable, of, shareReplay } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../auth/auth.service';
import { logintype } from '../../constVariable/user.const';
import { localStorageObjName } from '../../constVariable/localStorageObjName.const';
import { LocalStorageService } from '../Comman/local-storage.service';

const ROLES = new Set([
  'superadmin',
  'admin',
  'manager',
  'productmanager',
  'ordermanager',
  'inventorymanager',
  'customersupport',
  'accountant',
  'deliverymanager',
  'seller',
]);

type AuthenticatedRole = 'admin' | 'customer';


interface JwtClaims {
  exp?: number;
  role?: unknown;
  roles?: unknown;
  [claim: string]: unknown;
}

const ROLE_CLAIMS = [
  'role',
  'roles'
];

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  readonly autharize = new BehaviorSubject(false);
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly authService = inject(AuthService);
  private sessionValidationRequest: {
    token: string;
    userId: string;
    navigationId: number | null;
    response: Observable<ReadonlySet<AuthenticatedRole> | null>;
  } | null = null;

  constructor() {}

  login(roles: string[], returnUrl?: string): boolean {
    const roleSet = this.resolveRoles(roles);
    const role = this.resolveRole(roles);
    if (role) {
      this.autharize.next(true);
      const returnTree = this.getAuthorizedReturnUrl(returnUrl, roleSet);
      this.router.navigateByUrl(returnTree ?? this.getLandingUrl(role));
      return true;
    }

    this.clearSession();
    this.router.navigate(['/login']);
    return false;
  }

  logout() {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.readSession() !== null;
  }

  hasSellerRole(): boolean {
    return this.resolveRole(this.getTokenRoles()) === 'admin';
  }

  getRoleBasedUrl(): string | null {
    const role = this.resolveRole(this.getTokenRoles());
    return role ? this.getLandingUrl(role) : null;
  }

  validateSession(): Observable<ReadonlySet<AuthenticatedRole> | null> {
    const session = this.readSession();
    if (!session) {
      this.clearSession();
      return of(null);
    }

    const roles = this.resolveRoles(this.getTokenRoles(session.token));
    if (!roles.size) {
      this.clearSession();
      return of(null);
    }

    const navigationId = this.router.getCurrentNavigation()?.id ?? null;
    const pendingValidation = this.sessionValidationRequest;
    if (
      pendingValidation?.token === session.token
      && pendingValidation.userId === session.userId
      && pendingValidation.navigationId === navigationId
    ) {
      return pendingValidation.response;
    }

    let response: Observable<ReadonlySet<AuthenticatedRole> | null>;
    response = this.authService.validateSession(session.userId).pipe(
      map(() => {
        this.autharize.next(true);
        return roles;
      }),
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
      finalize(() => {
        if (navigationId === null && this.sessionValidationRequest?.response === response) {
          this.sessionValidationRequest = null;
        }
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    this.sessionValidationRequest = { token: session.token, userId: session.userId, navigationId, response };
    return response;
  }

  getLandingUrl(role: AuthenticatedRole): string {
    return role === 'admin' ? '/seller-Account/dashboard' : '/home/products';
  }

  clearSession(): void {
    this.autharize.next(false);
    this.localStorageService.removeItemLocalStorage(localStorageObjName.accessToken);
    this.localStorageService.removeItemLocalStorage(localStorageObjName.userRoles);
    this.localStorageService.removeItemLocalStorage(localStorageObjName.userId);
    this.localStorageService.removeItemLocalStorage(localStorageObjName.expiresAt);
  }

  private readSession(): { token: string; userId: string } | null {
    const token: unknown = this.localStorageService.getObjLocalStorage(localStorageObjName.accessToken);
    const userId: unknown = this.localStorageService.getObjLocalStorage(localStorageObjName.userId);
    const expiresAt: unknown = this.localStorageService.getObjLocalStorage(localStorageObjName.expiresAt);

    if (typeof token !== 'string' || !token.trim() || typeof userId !== 'string' || !userId.trim()) {
      return null;
    }

    const expiration = typeof expiresAt === 'string' ? Date.parse(expiresAt) : Number.NaN;
    if (!Number.isFinite(expiration) || expiration <= Date.now()) {
      return null;
    }

    try {
      const claims = jwtDecode<JwtClaims>(token);
      if (typeof claims.exp !== 'number' || claims.exp * 1000 <= Date.now()) {
        return null;
      }
    } catch {
      return null;
    }

    return { token, userId };
  }

  private getTokenRoles(token?: string): string[] {
    const accessToken = token ?? this.localStorageService.getObjLocalStorage(localStorageObjName.accessToken);
    if (typeof accessToken !== 'string' || !accessToken) {
      return [];
    }

    try {
      const claims = jwtDecode<JwtClaims>(accessToken);
      return ROLE_CLAIMS.flatMap((claim) => {
        const value = claims[claim];
        if (typeof value === 'string') {
          return [value];
        }
        return Array.isArray(value)
          ? value.filter((role): role is string => typeof role === 'string')
          : [];
      });
    } catch {
      return [];
    }
  }

  private resolveRole(roles: readonly unknown[]): AuthenticatedRole | null {
    const roleSet = this.resolveRoles(roles);
    if (roleSet.has('admin')) {
      return 'admin';
    }
    return roleSet.has('customer') ? 'customer' : null;
  }

  private resolveRoles(roles: readonly unknown[]): ReadonlySet<AuthenticatedRole> {
    const normalizedRoles = roles.filter((role): role is string => typeof role === 'string').map((role) => role.trim().toLowerCase());

    const roleSet = new Set<AuthenticatedRole>();
    if (normalizedRoles.some((role) => ROLES.has(role))) {
      roleSet.add('admin');
    }
    if (normalizedRoles.includes(logintype.customer)) {
      roleSet.add('customer');
    }
    return roleSet;
  }

  private getAuthorizedReturnUrl(
    returnUrl: string | undefined,
    roles: ReadonlySet<AuthenticatedRole>,
  ): UrlTree | null {
    if (!returnUrl?.startsWith('/') || returnUrl.startsWith('//') || returnUrl.includes('\\')) {
      return null;
    }

    try {
      const tree = this.router.parseUrl(returnUrl);
      const segments = tree.root.children['primary']?.segments.map((segment) => segment.path) ?? [];
      const isSellerRoute = segments[0] === 'seller-Account';
      const isCustomerRoute = segments[0] === 'home' && segments[1] === 'products';
      return (roles.has('admin') && isSellerRoute) || (roles.has('customer') && isCustomerRoute)
        ? tree
        : null;
    } catch {
      return null;
    }
  }

}
