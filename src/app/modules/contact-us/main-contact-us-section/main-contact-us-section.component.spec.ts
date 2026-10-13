import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContactUsSectionComponent } from './main-contact-us-section.component';

describe('MainContactUsSectionComponent', () => {
  let component: MainContactUsSectionComponent;
  let fixture: ComponentFixture<MainContactUsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContactUsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContactUsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
