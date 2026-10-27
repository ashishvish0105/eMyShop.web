import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductManagmentService } from '../../services/product-managment.service';
import { ProductPreviewComponent } from './product-preview.component';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';

describe('ProductPreviewComponent', () => {
  let component: ProductPreviewComponent;
  let fixture: ComponentFixture<ProductPreviewComponent>;

  beforeEach(async () => {
    history.replaceState({}, '');

    await TestBed.configureTestingModule({
      imports: [ProductPreviewComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
        { provide: SnackbarService, useValue: {
          success: jasmine.createSpy(),
          error: jasmine.createSpy(),
          warning: jasmine.createSpy()
        } },
        { provide: ProductManagmentService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
