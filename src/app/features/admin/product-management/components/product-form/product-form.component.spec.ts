import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize form with default values', () => {
    expect(component.productForm.get('productName')?.value).toBe('product 1');
    expect(component.productForm.get('description')?.value).toBe('this product is');
    expect(component.productForm.get('basePrice')?.value).toBe(500);
    expect(component.productForm.get('compareAtPrice')?.value).toBe(41);
    expect(component.productForm.get('costPerItem')?.value).toBe(85);
    expect(component.productForm.get('status')?.value).toBe(1);
    expect(component.productForm.get('category')?.value).toBe(2);
    expect(component.productForm.get('brand')?.value).toBe('add');
    expect(component.productForm.get('tags')?.value).toEqual(['product1', 'prod2']);
    expect(component.productForm.get('sku')?.value).toBe('123123');
    expect(component.productForm.get('barcode')?.value).toBe('123123');
    expect(component.productForm.get('availableQuantity')?.value).toBe(1);
  });

  it('should validate required fields and tag array', () => {
    component.productForm.patchValue({
      productName: '',
      description: '',
      basePrice: 0,
      compareAtPrice: 0,
      costPerItem: 0,
      status: null,
      category: null,
      brand: '',
      tags: [],
      sku: '',
      barcode: '',
      availableQuantity: -1,
    });

    component.productForm.markAllAsTouched();

    expect(component.productForm.invalid).toBeTrue();
    expect(component.productForm.get('productName')?.errors?.['required']).toBeTruthy();
    expect(component.productForm.get('description')?.errors?.['required']).toBeTruthy();
    expect(component.productForm.get('basePrice')?.errors?.['min']).toBeTruthy();
    expect(component.productForm.get('tags')?.errors?.['requiredArray']).toBeTruthy();
    expect(component.productForm.get('availableQuantity')?.errors?.['min']).toBeTruthy();
  });
});

