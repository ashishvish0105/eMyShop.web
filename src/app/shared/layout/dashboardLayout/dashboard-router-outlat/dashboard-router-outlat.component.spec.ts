import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DashboardRouterOutlatComponent } from './dashboard-router-outlat.component';

describe('DashboardRouterOutlatComponent', () => {
  let component: DashboardRouterOutlatComponent;
  let fixture: ComponentFixture<DashboardRouterOutlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRouterOutlatComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRouterOutlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
