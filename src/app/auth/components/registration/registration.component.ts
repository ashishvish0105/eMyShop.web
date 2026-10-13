import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [SectionTitleComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent {
  readonly registration = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
      Validators.pattern(/^(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/)
    ]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordsMatch });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return !confirmPassword || password === confirmPassword ? null : { passwordMismatch: true };
  }

  register(): void {
    if (this.registration.invalid) {
      this.registration.markAllAsTouched();
      return;
    }

    const { userName, email, password } = this.registration.getRawValue();
    this.authService.register({ userName, email, password }).subscribe({
      next: (response) => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          this.snackBar.open(response.errors?.join(', ') || response.message || 'Registration failed.', 'Close', {
            duration: 5000
          });
          return;
        }

        this.snackBar.open(response.message || 'Registration successful. Please sign in.', 'Close', {
          duration: 5000
        });
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
