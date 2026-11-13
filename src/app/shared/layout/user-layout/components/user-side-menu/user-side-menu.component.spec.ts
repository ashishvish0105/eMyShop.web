import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSideMenuComponent } from './user-side-menu.component';

describe('UserSideMenuComponent', () => {
  let component: UserSideMenuComponent;
  let fixture: ComponentFixture<UserSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSideMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
