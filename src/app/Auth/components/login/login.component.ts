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
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

    const user = this.login.getRawValue();
    const account = this.activatedRoute.snapshot.queryParamMap.get('account');
    localStorage.setItem('CurrentUser', JSON.stringify({ userName: user.userName, email: user.email, role: account === 'seller' ? 'seller' : 'customer' }));
    const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    this.router.navigateByUrl(returnUrl || (account === 'seller' ? '/seller-Account/dashboard' : '/products'));
  }

}
