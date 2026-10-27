import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

export interface SnackbarOptions {
  message: string;
  type?: SnackbarType;
  duration?: number;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}

export interface SnackbarData {
  message: string;
  type: SnackbarType;
  icon: string;
  backgroundColor: string;
}
