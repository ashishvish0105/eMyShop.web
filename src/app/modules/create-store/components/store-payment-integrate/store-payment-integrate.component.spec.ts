import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePaymentIntegrateComponent } from './store-payment-integrate.component';

describe('StorePaymentIntegrateComponent', () => {
  let component: StorePaymentIntegrateComponent;
  let fixture: ComponentFixture<StorePaymentIntegrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorePaymentIntegrateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorePaymentIntegrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
