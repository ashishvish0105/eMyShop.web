import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, Routes, UrlTree } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Observable, of, Subject, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { localStorageObjName } from '../../constVariable/localStorageObjName.const';
import { authGuardChildGuard, authGuardGuard } from './auth-guard.guard';
import { AuthGuardService } from './auth-guard.service';
import { loginRedirectGuard } from './loginRedirectGuard.gaurd';

@Component({
  standalone: true,
  template: '',
})
class RouteTestPageComponent {}

const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

const testRoutes: Routes = [
  {
    path: 'login',
    component: RouteTestPageComponent,
    canActivate: [loginRedirectGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: RouteTestPageComponent,
        canActivate: [loginRedirectGuard],
      },
      {
        path: 'registration',
        component: RouteTestPageComponent,
        canActivate: [loginRedirectGuard],
      },
      { path: 'forgetPasssword', component: RouteTestPageComponent },
      { path: 'forgot-password', redirectTo: 'forgetPasssword', pathMatch: 'full' },
    ],
  },
  { path: 'seller', redirectTo: '/login?account=seller', pathMatch: 'full' },
  {
    path: 'seller-Account',
    component: RouteTestPageComponent,
    canActivateChild: [authGuardChildGuard],
    data: { authRole: 'seller' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: RouteTestPageComponent },
      {
        path: 'products',
        component: RouteTestPageComponent,
        children: [{ path: 'add-product', component: RouteTestPageComponent }],
      },
    ],
  },
  {
    path: 'home',
    component: RouteTestPageComponent,
    children: [
      {
        path: 'products',
        component: RouteTestPageComponent,
        canActivate: [authGuardGuard],
        canActivateChild: [authGuardChildGuard],
        data: { authRole: 'customer' },
      },
    ],
  },
  { path: 'public', component: RouteTestPageComponent },
  { path: 'not-found', component: RouteTestPageComponent },
  { path: '**', redirectTo: 'not-found' },
];

describe('authentication and route authorization', () => {
  let validateSessionSpy: jasmine.Spy<(userId: string) => Observable<unknown>>;

  beforeEach(async () => {
    localStorage.clear();
    validateSessionSpy = jasmine.createSpy('validateSession').and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [RouteTestPageComponent],
      providers: [
        provideRouter(testRoutes),
        { provide: AuthService, useValue: { validateSession: validateSessionSpy } },
      ],
    }).compileComponents();
  });

  afterEach(() => localStorage.clear());

  it('redirects logged-out users from private seller URLs to login with a return URL', async () => {
    const harness = await navigate('/seller-Account/dashboard');
    const router = TestBed.inject(Router);
    const redirectedUrl = router.parseUrl(router.url);

    expect(harness.routeNativeElement).toBeTruthy();
    expect(redirectedUrl.root.children['primary'].segments.map((segment) => segment.path)).toEqual(['login']);
    expect(redirectedUrl.queryParams['account']).toBe('seller');
    expect(redirectedUrl.queryParams['returnUrl']).toBe('/seller-Account/dashboard');
  });

  it('allows a seller to open a seller route after backend session validation', async () => {
    setSession(['superadmin']);

    await navigate('/seller-Account/dashboard');

    expect(TestBed.inject(Router).url).toBe('/seller-Account/dashboard');
    expect(validateSessionSpy).toHaveBeenCalledWith('test-user');
  });

  it('shares concurrent session validation requests but revalidates after completion', () => {
    setSession(['customer']);
    const validationResponse = new Subject<unknown>();
    validateSessionSpy.and.returnValue(validationResponse);
    const authGuardService = TestBed.inject(AuthGuardService);

    const firstValidation = authGuardService.validateSession();
    const secondValidation = authGuardService.validateSession();

    expect(validateSessionSpy).toHaveBeenCalledTimes(1);

    firstValidation.subscribe();
    secondValidation.subscribe();
    validationResponse.next({});
    validationResponse.complete();

    authGuardService.validateSession().subscribe();
    expect(validateSessionSpy).toHaveBeenCalledTimes(2);
  });

  it('allows a customer to open the customer product route', async () => {
    setSession(['customer']);

    await navigate('/home/products');

    expect(TestBed.inject(Router).url).toBe('/home/products');
  });

  it('allows a user with both roles to access customer routes', async () => {
    setSession(['admin', 'customer']);

    await navigate('/home/products');

    expect(TestBed.inject(Router).url).toBe('/home/products');
  });

  it('redirects a customer away from seller routes to the customer landing page', async () => {
    setSession(['customer']);

    await navigate('/seller-Account/products/add-product');

    expect(TestBed.inject(Router).url).toBe('/home/products');
  });

  it('clears an unknown-role session and requires login', async () => {
    setSession(['unrecognized-role']);

    await navigate('/home/products');

    expect(TestBed.inject(Router).url).toContain('/login?');
    expect(validateSessionSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem(localStorageObjName.accessToken)).toBeNull();
  });

  it('clears sessions with missing role claims', async () => {
    setSession([]);

    await navigate('/home/products');

    expect(TestBed.inject(Router).url).toContain('/login?');
    expect(validateSessionSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem(localStorageObjName.accessToken)).toBeNull();
  });

  it('redirects an authenticated user away from the login page by role', async () => {
    setSession(['deliverymanager']);

    await navigate('/auth/login');

    expect(TestBed.inject(Router).url).toBe('/seller-Account/dashboard');
  });

  it('allows unauthenticated registration', async () => {
    await navigate('/auth/registration');
    expect(TestBed.inject(Router).url).toBe('/auth/registration');
  });

  it('redirects an authenticated customer away from guest-only registration', async () => {
    setSession(['customer']);
    await navigate('/auth/registration');
    expect(TestBed.inject(Router).url).toBe('/home/products');
  });

  it('returns a customer to a safe authorized URL after login and preserves its query', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
    const authGuardService = TestBed.inject(AuthGuardService);

    expect(authGuardService.login(['customer'], '/home/products?sort=price&page=2')).toBeTrue();

    const destination = navigateSpy.calls.mostRecent().args[0] as UrlTree;
    expect(router.serializeUrl(destination)).toBe('/home/products?sort=price&page=2');
  });

  it('rejects external and role-incompatible return URLs', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
    const authGuardService = TestBed.inject(AuthGuardService);

    authGuardService.login(['customer'], 'https://example.invalid/phishing');
    expect(navigateSpy.calls.mostRecent().args[0]).toBe('/home/products');

    authGuardService.login(['customer'], '/seller-Account/dashboard');
    expect(navigateSpy.calls.mostRecent().args[0]).toBe('/home/products');
  });

  it('rejects expired sessions before calling the backend', async () => {
    setSession(['customer'], Date.now() - 60_000);

    await navigate('/home/products');

    expect(TestBed.inject(Router).url).toContain('/login?');
    expect(validateSessionSpy).not.toHaveBeenCalled();
    expect(localStorage.getItem(localStorageObjName.accessToken)).toBeNull();
  });

  it('fails closed when backend session validation rejects a token', async () => {
    setSession(['customer']);
    validateSessionSpy.and.returnValue(throwError(() => new Error('unauthorized')));

    await navigate('/home/products');

    expect(TestBed.inject(Router).url).toContain('/login?');
    expect(localStorage.getItem(localStorageObjName.accessToken)).toBeNull();
  });

  it('protects nested seller children and allows the existing seller URL pattern', async () => {
    setSession(['productmanager']);

    await navigate('/seller-Account/products/add-product');

    expect(TestBed.inject(Router).url).toBe('/seller-Account/products/add-product');
    expect(validateSessionSpy).toHaveBeenCalledTimes(1);
  });

  it('sends an unknown URL to the not-found route instead of login', async () => {
    await navigate('/this-route-does-not-exist');

    expect(TestBed.inject(Router).url).toBe('/not-found');
    expect(validateSessionSpy).not.toHaveBeenCalled();
  });

  it('preserves the existing seller-login URL and redirects it to the supported login path', async () => {
    await navigate('/seller');

    expect(TestBed.inject(Router).url).toBe('/login?account=seller');
  });

  it('redirects the new forgot-password alias to the existing password-reset flow', async () => {
    await navigate('/auth/forgot-password');

    expect(TestBed.inject(Router).url).toBe('/auth/forgetPasssword');
  });

  it('leaves public pages accessible without a session', async () => {
    await navigate('/public');

    expect(TestBed.inject(Router).url).toBe('/public');
  });
});

async function navigate(url: string): Promise<RouterTestingHarness> {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  return harness;
}

function setSession(roles: string[], expiresAt = Date.now() + 10 * 60_000): void {
  const expirySeconds = Math.floor(expiresAt / 1000);
  const payload = btoa(JSON.stringify({
    sub: 'test-user',
    exp: expirySeconds,
    [roleClaim]: roles,
  })).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  const token = `eyJhbGciOiJub25lIn0.${payload}.signature`;

  localStorage.setItem(localStorageObjName.accessToken, JSON.stringify(token));
  localStorage.setItem(localStorageObjName.userId, JSON.stringify('test-user'));
  localStorage.setItem(localStorageObjName.expiresAt, JSON.stringify(new Date(expiresAt).toISOString()));
  localStorage.setItem(localStorageObjName.userRoles, JSON.stringify(roles));
}
