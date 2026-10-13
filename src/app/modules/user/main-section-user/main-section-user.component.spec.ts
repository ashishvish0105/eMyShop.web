import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSectionUserComponent } from './main-section-user.component';

describe('MainSectionUserComponent', () => {
  let component: MainSectionUserComponent;
  let fixture: ComponentFixture<MainSectionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSectionUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSectionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
