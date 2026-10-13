import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMainSectionComponent } from './payment-main-section.component';

describe('PaymentMainSectionComponent', () => {
  let component: PaymentMainSectionComponent;
  let fixture: ComponentFixture<PaymentMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
