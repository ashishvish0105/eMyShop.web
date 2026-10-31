import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CustomerAccountService } from './auth/customer-account.service';
import { CustomerAuthService } from './auth/customer-auth.service';
import { StorefrontLoginModalComponent } from './auth/storefront-login-modal.component';
import { StorefrontFooterComponent } from './components/footer/storefront-footer.component';
import { StorefrontHeaderComponent } from './components/header/storefront-header.component';
import { StorefrontToastComponent } from './components/toast/storefront-toast.component';
import { StorefrontToastService } from './toast.service';

@Component({
  selector: 'app-storefront-layout',
  standalone: true,
  imports: [RouterOutlet, StorefrontHeaderComponent, StorefrontFooterComponent, StorefrontLoginModalComponent, StorefrontToastComponent],
  templateUrl: './storefront-layout.component.html',
  host: { class: 'foodiedash-storefront' },
})
export class StorefrontLayoutComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly auth = inject(CustomerAuthService);
  private readonly account = inject(CustomerAccountService);
  private readonly toast = inject(StorefrontToastService);

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      if (params.get('login') === '1' && !this.auth.isLoggedIn()) {
        this.auth.openLogin(params.get('returnUrl'));
      }
    });
    if (this.auth.isLoggedIn()) {
      this.account.loadAccount().subscribe();
    }
  }

  onAuthenticated(): void {
    this.account.loadAccount().subscribe();
    const returnUrl = this.auth.consumeReturnUrl();
    this.router.navigateByUrl(returnUrl && returnUrl.startsWith('/') ? returnUrl : this.router.url.split('?')[0]);
    this.toast.show('Welcome to FoodieDash.');
  }
}
