import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  debugger;
  const authGuardService = inject(AuthGuardService);
  const router = inject(Router);

  if (!authGuardService.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { account: 'seller', returnUrl: state.url }
    });
  }

  return authGuardService.hasSellerRole()
    ? true
    : router.createUrlTree(['/home']);
};
