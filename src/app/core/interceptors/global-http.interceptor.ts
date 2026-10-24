import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, throwError, TimeoutError, timeout } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { localStorageObjName } from '../../constVariable/localStorageObjName.const';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../Comman/local-storage.service';

export const globalHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingService = inject(LoadingService);
  const snackBar = inject(MatSnackBar);
  const storageService = inject(LocalStorageService);
  const token = storageService.getObjLocalStorage(localStorageObjName.accessToken);
  const isPublicAuthRequest = /\/auth\/(login|register)\/?$/i.test(request.url);

  const authenticatedRequest = token && request.url.startsWith(environment.BaseUrl) && !isPublicAuthRequest
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  loadingService.requestStarted();

  return next(authenticatedRequest).pipe(
    timeout({ first: 15000 }),
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse || error instanceof TimeoutError) {
        snackBar.open(getErrorMessage(error), 'Close', {
          duration: 5000,
          panelClass: ['global-error-snackbar']
        });
      }

      return throwError(() => error);
    }),
    finalize(() => loadingService.requestFinished())
  );
};

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
