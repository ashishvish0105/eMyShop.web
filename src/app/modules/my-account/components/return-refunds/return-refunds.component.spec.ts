import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRefundsComponent } from './return-refunds.component';

describe('ReturnRefundsComponent', () => {
  let component: ReturnRefundsComponent;
  let fixture: ComponentFixture<ReturnRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRefundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
