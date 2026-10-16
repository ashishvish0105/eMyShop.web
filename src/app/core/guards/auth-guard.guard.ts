import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  Router
} from '@angular/router';
import { map } from 'rxjs';

import { AuthGuardService } from './auth-guard.service';

interface RouteWithPolicy {
  data: Record<string, unknown>;
  parent: RouteWithPolicy | null;
}

function authorizeRoute(
  route: RouteWithPolicy,
  state: { url: string },
) {
  const authService = inject(AuthGuardService);
  const router = inject(Router);
  let currentRoute: typeof route | null = route;
  let requestedRole: unknown;
  while (currentRoute && requestedRole === undefined) {
    requestedRole = currentRoute.data['authRole'];
    currentRoute = currentRoute.parent;
  }

  return authService.validateSession().pipe(
    map((role) => {
      if (!role) {
        return router.createUrlTree(['/login'], {
          queryParams: {
            ...(requestedRole === 'seller' ? { account: 'seller' } : {}),
            returnUrl: state.url,
          },
        });
      }

      if (
        (requestedRole === 'seller' || requestedRole === 'customer')
        && role.has(requestedRole)
      ) {
        return true;
      }

      return router.parseUrl(authService.getRoleBasedUrl() ?? '/login');
    }),
  );
}

export const authGuardGuard: CanActivateFn = (route, state) => authorizeRoute(route, state);

export const authGuardChildGuard: CanActivateChildFn = (route, state) => authorizeRoute(route, state);
