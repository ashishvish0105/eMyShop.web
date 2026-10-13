import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashboardSectionComponent } from './main-dashboard-section.component';

describe('MainDashboardSectionComponent', () => {
  let component: MainDashboardSectionComponent;
  let fixture: ComponentFixture<MainDashboardSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDashboardSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
