import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

export const loginRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthGuardService);
  const router = inject(Router);

  return authService.validateSession().pipe(
    map((role) => role ? router.parseUrl(authService.getRoleBasedUrl()!) : true),
  );
};
