import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TitleWithItemComponent } from "../../../../components/title-with-item/title-with-item.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcumbComponent } from '../../../../../shared/components/breadcumb/breadcumb.component';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { InputGroupComponent } from '../../../../../shared/components/input-group/input-group.component';
import { OuterBoxStyleComponent } from '../../../../../shared/components/outer-box-style/outer-box-style.component';
import { TextEditorComponent } from '../../../../../shared/components/text-editor/text-editor.component';
import { requiredArrayValidator } from '../../../../../core/validation/required-array.validator';
import { ProductManagmentService } from '../../services/product-managment.service';
import { IProduct, IProductWrite } from '../../../../../interface/admin/product-management/IProduct.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, FormsModule, BreadcumbComponent, InputGroupComponent, TitleWithItemComponent, ButtonComponent,ReactiveFormsModule],
  standalone: true,
})
export class ProductFormComponent implements OnInit {

  productForm!: FormGroup;

  images: any[] = [];

  statusList = [
    {
      id: 1,
      value: 'Active'
    },
    {
      id: 2,
      value: 'Draft'
    },
    {
      id: 3,
      value: 'Archived'
    }
  ];
  categoryList: { id: number; value: string }[] = [];
  productId: number | null = null;

  private router: Router = inject(Router);
  constructor(
    private fb: FormBuilder,
    private productManagementService: ProductManagmentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id ? Number(id) : null;

    this.productForm = this.fb.group({
      productName: [
        'product 1',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      typeId: [
        null,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      description: ["<span>this product is</span>",
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],
      productImages: [
        this.images
      ],
      basePrice: [
        500,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      compareAtPrice: [
        41,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      costPerItem: [
        85,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],
      status: [
        1,
        [
          Validators.required
        ]
      ],
      categoryId: [
        null,
        [
          Validators.required
        ]
      ],
      brand: [
        'add',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ],
      tags: [
        ['product1', 'prod2'],
        [
          requiredArrayValidator
        ]
      ],
      sku: [
        '123123',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      barcode: [
        '123123',
        [
          Validators.required
        ]
      ],
      availableQuantity: [
        1,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]
    });

    this.productManagementService.getCetegories().subscribe({
      next: response => {
          this.categoryList = response.payload.map((category: any) => ({
            id: category.categoryId,
            value: category.categoryName
          }));
      }
    });

    if (this.productId !== null) {
      this.productManagementService.getById(this.productId).subscribe({
        next: response => this.patchProduct(response.payload)
      });
    }
  }


  // =====================================================
  // SAVE PRODUCT
  // =====================================================

  onPublishProduct(): void {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      return;
    }

    const values = this.productForm.getRawValue();
    const product: IProductWrite = {
      productName: values.productName,
      description: values.description,
      categoryId: Number(values.categoryId),
      typeId: Number(values.typeId),
      basePrice: Number(values.basePrice),
      compareAtPrice: Number(values.compareAtPrice),
      costPerItem: Number(values.costPerItem),
      status: Number(values.status),
      brand: values.brand,
      tags: values.tags,
      sku: values.sku,
      barcode: values.barcode,
      availableQuantity: Number(values.availableQuantity)
    };

    const saveRequest = this.productId === null
      ? this.productManagementService.create(product)
      : this.productManagementService.update(this.productId, product);

    saveRequest.subscribe({
      next: response => {
        this.snackBar.open(response.message || 'Product saved successfully.', 'Close', { duration: 4000 });
        this.router.navigate(['/seller-Account/products']);
      }
    });
  }

  onPreviewPage(): void {

    this.productForm.markAllAsTouched();


    if (this.productForm.invalid) {

      return;
    }
  }


  // =====================================================
  // DISCARD
  // =====================================================

  onDiscard(): void {
    this.router.navigate(['/seller-Account/products']);
  }

  private patchProduct(product: IProduct): void {
    this.productForm.patchValue({
      productName: product.productName,
      description: product.description,
      basePrice: product.basePrice,
      compareAtPrice: product.compareAtPrice,
      costPerItem: product.costPerItem,
      status: product.status,
      categoryId: product.categoryId,
      typeId: product.typeId,
      brand: product.brand ?? '',
      tags: product.tags ?? [],
      sku: product.sku ?? '',
      barcode: product.barcode ?? '',
      availableQuantity: product.availableQuantity
    });
  }


  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  onSelectImages(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    if (!input.files) {
      return;
    }


    const files =
      Array.from(input.files);


    files.forEach(file => {

      if (!file.type.startsWith('image/')) {
        return;
      }


      const reader =
        new FileReader();


      reader.onload = () => {
        this.images.push({
          file: file,
          name: file.name,
          preview: reader.result
        });

      };


      reader.readAsDataURL(file);

    });


    // Allow selecting the same file again
    input.value = '';
  }


  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  removeImage(image: any): void {

    const index =
      this.images.indexOf(image);


    if (index !== -1) {

      this.images.splice(index, 1);

    }
  }
}
