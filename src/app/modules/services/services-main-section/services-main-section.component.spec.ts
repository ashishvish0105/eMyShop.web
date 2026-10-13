import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesMainSectionComponent } from './services-main-section.component';

describe('ServicesMainSectionComponent', () => {
  let component: ServicesMainSectionComponent;
  let fixture: ComponentFixture<ServicesMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
