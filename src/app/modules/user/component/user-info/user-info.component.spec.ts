import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    const routeParamMap = convertToParamMap({ userId: '42' });
    await TestBed.configureTestingModule({
      imports: [UserInfoComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: routeParamMap,
              queryParamMap: convertToParamMap({}),
            },
            paramMap: of(routeParamMap),
            queryParamMap: of(convertToParamMap({})),
            data: of({}),
          },
        },
      ],
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
    const request = httpTestingController.expectOne((req) =>
      req.urlWithParams.endsWith('/User/GetByIdUser?UserId=42'),
    );
    expect(request.request.method).toBe('GET');
    request.flush({ payLoad: { userID: 42 } });
    expect(component.UserForm.value.userID).toBe(42);
  });
});
