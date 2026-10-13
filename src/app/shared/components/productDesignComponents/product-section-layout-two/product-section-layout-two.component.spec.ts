import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSectionLayoutTwoComponent } from './product-section-layout-two.component';

describe('ProductSectionLayoutTwoComponent', () => {
  let component: ProductSectionLayoutTwoComponent;
  let fixture: ComponentFixture<ProductSectionLayoutTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSectionLayoutTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSectionLayoutTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
