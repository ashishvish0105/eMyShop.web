import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductScrollComponent } from './product-scroll.component';

describe('ProductScrollComponent', () => {
  let component: ProductScrollComponent;
  let fixture: ComponentFixture<ProductScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
