import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LocalStarageService } from '../../../../../services/local-starage.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
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
