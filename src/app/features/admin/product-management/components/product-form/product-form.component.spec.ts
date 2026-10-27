import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { provideRouter } from '@angular/router';
import { ProductManagmentService } from '../../services/product-managment.service';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    const productService = {
      getCetegories: jasmine.createSpy().and.returnValue(of({ payload: [] })),
      getById: jasmine.createSpy().and.returnValue(of({ payload: null }))
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [
        provideRouter([]),
        { provide: ProductManagmentService, useValue: productService },
        { provide: SnackbarService, useValue: {
          success: jasmine.createSpy(),
          error: jasmine.createSpy(),
          warning: jasmine.createSpy()
        } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with blank, valid-range product defaults', () => {
    expect(component.productForm.get('productName')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('basePrice')?.value).toBe(0);
    expect(component.productForm.get('compareAtPrice')?.value).toBe(0);
    expect(component.productForm.get('costPerItem')?.value).toBe(0);
    expect(component.productForm.get('status')?.value).toBe(1);
    expect(component.productForm.get('categoryId')?.value).toBeNull();
    expect(component.productForm.get('brand')?.value).toBe('');
    expect(component.productForm.get('tags')?.value).toEqual([]);
    expect(component.productForm.get('sku')?.value).toBe('');
    expect(component.productForm.get('barcode')?.value).toBe('');
    expect(component.productForm.get('availableQuantity')?.value).toBe(0);
  });

  it('should validate required fields and tag array', () => {
    component.productForm.patchValue({
      productName: '',
      description: '',
      basePrice: 0,
      compareAtPrice: 0,
      costPerItem: 0,
      status: null,
      categoryId: null,
      typeId: null,
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
