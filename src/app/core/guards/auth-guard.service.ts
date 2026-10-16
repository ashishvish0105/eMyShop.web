import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../auth/auth.service';
import { logintype } from '../../constVariable/user.const';
import { localStorageObjName } from '../../constVariable/localStorageObjName.const';
import { LocalStarageService } from '../Comman/local-starage.service';

const SELLER_ROLES = new Set([
  'superadmin',
  'admin',
  'manager',
  'productmanager',
  'ordermanager',
  'inventorymanager',
  'customersupport',
  'accountant',
  'deliverymanager',
  logintype.seller,
]);

type AuthenticatedRole = 'seller' | 'customer';

interface JwtClaims {
  exp?: number;
  role?: unknown;
  roles?: unknown;
  [claim: string]: unknown;
}

const ROLE_CLAIMS = [
  'role',
  'roles',
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
];

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  readonly autharize = new BehaviorSubject(false);
  private readonly router = inject(Router);
  private readonly localStarageService = inject(LocalStarageService);
  private readonly authService = inject(AuthService);

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
    return this.resolveRole(this.getTokenRoles()) === 'seller';
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

    return this.authService.validateSession(session.userId).pipe(
      map(() => {
        this.autharize.next(true);
        return roles;
      }),
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
    );
  }

  getLandingUrl(role: AuthenticatedRole): string {
    return role === 'seller' ? '/seller-Account/dashboard' : '/home/products';
  }

  clearSession(): void {
    this.autharize.next(false);
    this.localStarageService.removeItemLocalStorage(localStorageObjName.accessToken);
    this.localStarageService.removeItemLocalStorage(localStorageObjName.userRoles);
    this.localStarageService.removeItemLocalStorage(localStorageObjName.userId);
    this.localStarageService.removeItemLocalStorage(localStorageObjName.expiresAt);
  }

  private readSession(): { token: string; userId: string } | null {
    const token: unknown = this.localStarageService.getObjLocalStorage(localStorageObjName.accessToken);
    const userId: unknown = this.localStarageService.getObjLocalStorage(localStorageObjName.userId);
    const expiresAt: unknown = this.localStarageService.getObjLocalStorage(localStorageObjName.expiresAt);

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
    const accessToken = token ?? this.localStarageService.getObjLocalStorage(localStorageObjName.accessToken);
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
    if (roleSet.has('seller')) {
      return 'seller';
    }
    return roleSet.has('customer') ? 'customer' : null;
  }

  private resolveRoles(roles: readonly unknown[]): ReadonlySet<AuthenticatedRole> {
    const normalizedRoles = roles
      .filter((role): role is string => typeof role === 'string')
      .map((role) => role.trim().toLowerCase());

    const roleSet = new Set<AuthenticatedRole>();
    if (normalizedRoles.some((role) => SELLER_ROLES.has(role))) {
      roleSet.add('seller');
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
      return (roles.has('seller') && isSellerRoute) || (roles.has('customer') && isCustomerRoute)
        ? tree
        : null;
    } catch {
      return null;
    }
  }

}
