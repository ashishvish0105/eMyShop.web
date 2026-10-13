import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAuthSectionComponent } from './main-auth-section.component';

describe('MainAuthSectionComponent', () => {
  let component: MainAuthSectionComponent;
  let fixture: ComponentFixture<MainAuthSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAuthSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainAuthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
