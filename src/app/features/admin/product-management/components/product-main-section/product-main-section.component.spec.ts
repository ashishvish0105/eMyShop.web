import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductManagmentService } from '../../services/product-managment.service';
import { of } from 'rxjs';
import { ProductMainSectionComponent } from './product-main-section.component';

describe('ProductMainSectionComponent', () => {
  let component: ProductMainSectionComponent;
  let fixture: ComponentFixture<ProductMainSectionComponent>;

  beforeEach(async () => {
    const productService = {
      getCetegories: jasmine.createSpy().and.returnValue(of({ payload: [] })),
      getAll: jasmine.createSpy().and.returnValue(of({ payload: [] })),
      delete: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [ProductMainSectionComponent],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy() } },
        { provide: ProductManagmentService, useValue: productService }
      ]
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
