import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsPromosComponent } from './coupons-promos.component';

describe('CouponsPromosComponent', () => {
  let component: CouponsPromosComponent;
  let fixture: ComponentFixture<CouponsPromosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsPromosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsPromosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
