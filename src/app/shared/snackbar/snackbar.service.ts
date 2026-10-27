import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';
import { SnackbarData, SnackbarOptions, SnackbarType } from './snackbar.models';

export const SNACKBAR_DEFAULTS = {
  duration: 5000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
} as const;

export const SNACKBAR_TYPE_CONFIG: Record<SnackbarType, Pick<SnackbarData, 'icon' | 'backgroundColor'>> = {
  success: { icon: 'fa-solid fa-circle-check', backgroundColor: '#2e7d32' },
  error: { icon: 'fa-solid fa-circle-exclamation', backgroundColor: '#d32f2f' },
  warning: { icon: 'fa-solid fa-triangle-exclamation', backgroundColor: '#ed6c02' },
  info: { icon: 'fa-solid fa-circle-info', backgroundColor: '#0288d1' }
};

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string, options: Omit<SnackbarOptions, 'message' | 'type'> = {}): MatSnackBarRef<SnackbarComponent> {
    return this.show({ ...options, message, type: 'success' });
  }

  error(message: string, options: Omit<SnackbarOptions, 'message' | 'type'> = {}): MatSnackBarRef<SnackbarComponent> {
    return this.show({ ...options, message, type: 'error' });
  }

  warning(message: string, options: Omit<SnackbarOptions, 'message' | 'type'> = {}): MatSnackBarRef<SnackbarComponent> {
    return this.show({ ...options, message, type: 'warning' });
  }

  info(message: string, options: Omit<SnackbarOptions, 'message' | 'type'> = {}): MatSnackBarRef<SnackbarComponent> {
    return this.show({ ...options, message, type: 'info' });
  }

  show(options: SnackbarOptions): MatSnackBarRef<SnackbarComponent> {
    const type = options.type ?? 'info';
    const data: SnackbarData = {
      message: options.message,
      type,
      ...SNACKBAR_TYPE_CONFIG[type]
    };

    return this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      duration: options.duration ?? SNACKBAR_DEFAULTS.duration,
      horizontalPosition: options.horizontalPosition ?? SNACKBAR_DEFAULTS.horizontalPosition,
      verticalPosition: options.verticalPosition ?? SNACKBAR_DEFAULTS.verticalPosition,
      panelClass: ['custom-snackbar-container']
    });
  }

  dismiss(): void {
    this.snackBar.dismiss();
  }
}
