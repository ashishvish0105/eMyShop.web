import { inject, Injectable } from '@angular/core';
import { LocalStarageService } from './local-starage.service';
import { Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { logintype } from '../constVariable/user.const';
import { localStorageObjName } from '../constVariable/localStorageObjName.const';

const SELLER_ROLES = new Set([
  'superadmin',
  'admin',
  'manager',
  'productmanager',
  'ordermanager',
  'inventorymanager',
  'customersupport',
  'accountant',
  'deliverymanager'
]);

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  autharize= new BehaviorSubject(false);
  router= inject(Router);
  localStarageService=inject(LocalStarageService)

  constructor() {}

  login(roles: string[], returnUrl?: string): boolean {
    this.autharize.next(true);
    const normalizedRoles = roles.map(role => role.toLowerCase());
    if (normalizedRoles.some(role => SELLER_ROLES.has(role))) {
      const safeReturnUrl = returnUrl?.startsWith('/seller-Account') ? returnUrl : '/seller-Account/dashboard';
      this.router.navigateByUrl(safeReturnUrl);
      return true;
    }

    if (normalizedRoles.includes(logintype.customer)) {
      this.router.navigate(['/', 'home']);
      return true;
    }

    this.localStarageService.removeItemLocalStorage(localStorageObjName.accessToken);
    this.localStarageService.removeItemLocalStorage(localStorageObjName.userRoles);
    this.router.navigate(['/login']);
    return false;
  }

  logout() {
    this.autharize.next(false);
    this.localStarageService.removeItemLocalStorage(localStorageObjName.accessToken);
    this.localStarageService.removeItemLocalStorage(localStorageObjName.userRoles);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return Boolean(this.localStarageService.getObjLocalStorage(localStorageObjName.accessToken));
  }

  hasSellerRole(): boolean {
    const roles: unknown = this.localStarageService.getObjLocalStorage(localStorageObjName.userRoles);
    return Array.isArray(roles)
      && roles.some((role): role is string => typeof role === 'string' && SELLER_ROLES.has(role.toLowerCase()));
  }

}
