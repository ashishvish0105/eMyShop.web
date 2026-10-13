import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutletComponent } from './product-outlet.component';

describe('ProductOutletComponent', () => {
  let component: ProductOutletComponent;
  let fixture: ComponentFixture<ProductOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
