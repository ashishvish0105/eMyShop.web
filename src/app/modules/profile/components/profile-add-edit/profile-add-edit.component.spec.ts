import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddEditComponent } from './profile-add-edit.component';

describe('ProfileAddEditComponent', () => {
  let component: ProfileAddEditComponent;
  let fixture: ComponentFixture<ProfileAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
