import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { ProfileMainSectionComponent } from './profile-main-section.component';

describe('ProfileMainSectionComponent', () => {
  let component: ProfileMainSectionComponent;
  let fixture: ComponentFixture<ProfileMainSectionComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMainSectionComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProfileMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpTestingController.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
    const request = httpTestingController.expectOne((req) =>
      req.url.endsWith('/api/Profile/CategoryGetList'),
    );
    expect(request.request.method).toBe('GET');
    request.flush({ payload: [] });
    expect(component.categoryGetList).toEqual([]);
  });
});
