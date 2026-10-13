import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiceSectionComponent } from './main-service-section.component';

describe('MainServiceSectionComponent', () => {
  let component: MainServiceSectionComponent;
  let fixture: ComponentFixture<MainServiceSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainServiceSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainServiceSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
