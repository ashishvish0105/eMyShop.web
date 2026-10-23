import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const queryParamMap = convertToParamMap({
    account: 'seller',
    returnUrl: '/seller-Account/dashboard',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
              queryParamMap,
            },
            paramMap: of(convertToParamMap({})),
            queryParamMap: of(queryParamMap),
            data: of({}),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('CurrentUser'));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the route account and return URL after valid credentials are submitted', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
    component.login.setValue({
      userName: 'seller',
      email: 'seller@example.com',
      password: 'password',
    });

    component.loginMethod();

    expect(navigateSpy).toHaveBeenCalledWith('/seller-Account/dashboard');
    expect(JSON.parse(localStorage.getItem('CurrentUser') || '{}')).toEqual({
      userName: 'seller',
      email: 'seller@example.com',
      role: 'seller',
    });
  });
});
