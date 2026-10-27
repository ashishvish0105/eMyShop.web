import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError, TimeoutError, timeout } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { localStorageObjName } from '../../constVariable/localStorageObjName.const';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../Comman/local-storage.service';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';

export const globalHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService);
  const snackbarService = inject(SnackbarService);
  const storageService = inject(LocalStorageService);
  const token = storageService.getObjLocalStorage(localStorageObjName.accessToken) || readCustomerAccessToken();
  const isPublicAuthRequest = /\/auth\/(login|register|sendotp|verifyotp)\/?$/i.test(request.url);

  const authenticatedRequest = token && request.url.startsWith(environment.BaseUrl) && !isPublicAuthRequest
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  loadingService.requestStarted();

  return next(authenticatedRequest).pipe(
    timeout({ first: 15000 }),
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse || error instanceof TimeoutError) {
        snackbarService.error(getErrorMessage(error));
      }

      return throwError(() => error);
    }),
    finalize(() => loadingService.requestFinished())
  );
};

function readCustomerAccessToken(): string | null {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }

  try {
    const raw = sessionStorage.getItem('foodiedash.customer.session');
    if (!raw) {
      return null;
    }

    const session = JSON.parse(raw) as { mock?: boolean; accessToken?: string; expiresAt?: string };
    if (session.mock || typeof session.accessToken !== 'string' || !session.accessToken) {
      return null;
    }

    const expiration = Date.parse(session.expiresAt ?? '');
    if (!Number.isFinite(expiration) || expiration <= Date.now()) {
      return null;
    }

    return session.accessToken;
  } catch {
    return null;
  }
}

function getErrorMessage(error: HttpErrorResponse | TimeoutError): string {
  if (error instanceof TimeoutError) {
    return 'Request timed out. Please try again.';
  }

  const body: unknown = error.error;
  if (typeof body === 'string' && body.trim()) {
    return body;
  }

  if (body !== null && typeof body === 'object') {
    const response = body as Record<string, unknown>;
    if (typeof response['message'] === 'string' && response['message'].trim()) {
      return response['message'];
    }

    const errors = response['errors'];
    if (Array.isArray(errors)) {
      const messages = errors.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
      if (messages.length) {
        return messages.join('\n');
      }
    }
  }

  return error.status ? `Request failed (${error.status}).` : 'Request failed. Please try again.';
}
