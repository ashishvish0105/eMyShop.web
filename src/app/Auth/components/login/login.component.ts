import { Component, OnInit } from '@angular/core';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { localStorageObjName } from '../../../constVariable/localStorageObjName.const';
import { AuthGuardService } from '../../../core/guards/auth-guard.service';
import { AuthService } from '../../auth.service';
import { LocalStorageService } from '../../../core/Comman/local-storage.service';
import { LOGIN_VARIABLES } from '../../../constVariable/auth/loginVariable.const';
import { InputGroupComponent } from '../../../shared/components/input-group/input-group.component';
import { ILoginModel } from '../../../interface/login/ILogin.Model';
import { SnackbarService } from '../../../shared/snackbar/snackbar.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputGroupComponent,
    SectionTitleComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  CONST_LABEL = LOGIN_VARIABLES;
  login!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,

    private authGuardService: AuthGuardService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      // userName: ['', Validators.required],
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['admin', Validators.required]
    });
  }


loginMethod(): void {
  // 2. Get form values and query parameters
  const user:ILoginModel = this.login.getRawValue();

  // 3. Call the login API
  this.authService.Userlogin(user).subscribe({
    next: (response) => {
      // 4. Check whether the API returned an access token
      const payload = response.payload;

      if (!payload?.accessToken) {
        this.snackbarService.error(response.message || 'Login failed. Please check your credentials.');
        return;
      }

      // 5. Store authentication details
      const roles = payload.user?.roles ?? [];

      this.localStorageService.setObjLocalStorage(
        localStorageObjName.accessToken,
        payload.accessToken
      );

      this.localStorageService.setObjLocalStorage(
        localStorageObjName.userRoles,
        roles
      );

      this.localStorageService.setObjLocalStorage(
        localStorageObjName.userId,
        payload.user?.userId
      );

      this.localStorageService.setObjLocalStorage(
        localStorageObjName.expiresAt,
        payload.expiresAt
      );

      const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

      // 6. Navigate based on the user's role
      const isLoginAllowed = this.authGuardService.login(
        roles,
        returnUrl ?? undefined
      );

      if (!isLoginAllowed) {
        this.snackbarService.error('Your account does not have a supported role. Please contact an administrator.');
      }
    },

    // 7. Handle API errors
    error: (error) => {
      this.snackbarService.error(error?.error?.message || 'Something went wrong. Please try again.');
    }
  });
}


}
