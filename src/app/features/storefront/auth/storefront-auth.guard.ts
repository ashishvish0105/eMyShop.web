import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomerAuthService } from './customer-auth.service';

const STOREFRONT_HOME = '/products';

export const storefrontAuthGuard: CanActivateFn = (_route, state) => {
  const auth = inject(CustomerAuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  auth.openLogin(state.url);
  return router.createUrlTree([STOREFRONT_HOME], {
    queryParams: { login: '1', returnUrl: state.url },
  });
};

export const storefrontGuestGuard: CanActivateFn = () => {
  const auth = inject(CustomerAuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? router.parseUrl(STOREFRONT_HOME) : true;
};
