import { Component, OnInit } from '@angular/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { localStorageObjName } from '../../../constVariable/localStorageObjName.const';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStarageService } from '../../../core/Comman/local-starage.service';
import { AuthGuardService } from '../../../core/guards/auth-guard.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStarageService: LocalStarageService,
    private authGuardService: AuthGuardService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginMethod() {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      return;
    }

    this.authService.Userlogin({
      userName: this.login.get('userName')?.value,
      email: this.login.get('email')?.value,
      password: this.login.get('password')?.value
    }).subscribe({
      next: (response) => {
        debugger;
        if (!response.payload?.accessToken) {
          this.snackBar.open(response.message || 'Login failed. Please check your credentials.', 'Close', {
            duration: 5000
          });
          return;
        }

        this.localStarageService.setObjLocalStorage(localStorageObjName.accessToken, response.payload.accessToken);
        const roles = response.payload.user?.roles ?? [];

        this.localStarageService.setObjLocalStorage(localStorageObjName.userRoles, roles);

        const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

        console.log('Return URL:', returnUrl);
debugger;
        if (!this.authGuardService.login(roles, returnUrl ?? undefined)) {
          this.snackBar.open('Your account does not have a supported role. Please contact an administrator.', 'Close', {
            duration: 5000
          });
        }
      }
    });
  }

}

