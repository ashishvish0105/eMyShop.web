import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMainSectionComponent } from './product-main-section.component';

describe('ProductMainSectionComponent', () => {
  let component: ProductMainSectionComponent;
  let fixture: ComponentFixture<ProductMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMainSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
