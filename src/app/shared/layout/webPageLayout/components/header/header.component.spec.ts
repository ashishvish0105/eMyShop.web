import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';
import { LocalStarageService } from '../../../../../core/Comman/local-starage.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the customer menu based on the roles saved by login', () => {
    const storageService = TestBed.inject(LocalStarageService);
    spyOn(storageService, 'getObjLocalStorage').and.callFake((key: string) =>
      key === 'userRoles' ? ['customer'] : null,
    );

    component.ngOnInit();

    expect(component.displayMenu).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ access: 'customer' }),
      ]),
    );
  });
});
