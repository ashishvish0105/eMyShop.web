import { Component, inject, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
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
import { requiredArrayValidator } from '../../../../../core/validation/required-array.validator';
import { ProductManagmentService } from '../../services/product-managment.service';
import { IProduct, IProductWrite } from '../../../../../interface/admin/product-management/IProduct.model';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ProductImagePreview {
  id: number;
  name: string;
  preview: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports: [CommonModule, FormsModule, BreadcumbComponent, InputGroupComponent, TitleWithItemComponent, ButtonComponent, ReactiveFormsModule],
  standalone: true,
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  images: ProductImagePreview[] = [];
  isLoading = false;
  isSubmitting = false;
  readonly maxImageSizeBytes = 5 * 1024 * 1024;
  readonly maxImageCount = 5;
  readonly acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  private transferringImages = false;

  statusList = [
    { id: 1, value: 'Active' },
    { id: 2, value: 'Draft' },
    { id: 3, value: 'Archived' },
    { id: 0, value: 'Inactive' }
  ];
  categoryList: { id: number; value: string }[] = [];
  productId: number | null = null;

  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private productManagementService: ProductManagmentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    let invalidProductId = false;
    if (id !== null) {
      const parsedId = Number(id);
      if (!Number.isInteger(parsedId) || parsedId < 1) {
        invalidProductId = true;
      } else {
        this.productId = parsedId;
      }
    }

    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      typeId: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      productImages: [this.images],
      basePrice: [0, [Validators.required, Validators.min(0.01)]],
      compareAtPrice: [0, [Validators.required, Validators.min(0)]],
      costPerItem: [0, [Validators.required, Validators.min(0)]],
      status: [1, [Validators.required]],
      categoryId: [null, [Validators.required]],
      brand: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      tags: [[], [requiredArrayValidator]],
      sku: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      barcode: ['', [Validators.required]],
      availableQuantity: [0, [Validators.required, Validators.min(0)]]
    });

    if (invalidProductId) {
      this.snackBar.open('The product ID is invalid.', 'Close', { duration: 4000 });
      this.router.navigate(['/seller-Account/products']);
      return;
    }

    const draft = typeof history !== 'undefined' ? history.state?.product : undefined;
    if (draft) {
      this.productId = Number(draft.productId) || this.productId;
      this.patchProduct(draft as IProduct);
      this.images = Array.isArray(draft.images)
        ? draft.images.map((image: { name: string; preview: string }, index: number) => ({
            id: Date.now() + index,
            name: image.name,
            preview: image.preview
          }))
        : [];
      this.productForm.patchValue({ productImages: this.images });
      this.transferringImages = true;
    }

    this.loadCategories();

    if (this.productId !== null && !draft) {
      this.loadProduct(this.productId);
    }
  }

  private loadCategories(): void {
    this.productManagementService.getCetegories().subscribe({
      next: response => {
        const items = Array.isArray(response?.payload) ? response.payload : [];
        this.categoryList = items.map((category: any) => ({
          id: Number(category.categoryId ?? category.id),
          value: category.categoryName ?? category.name ?? 'Uncategorized'
        }));
      },
      error: () => {
        this.categoryList = [];
        this.snackBar.open('Categories could not be loaded. Please try again before saving.', 'Close', { duration: 5000 });
      }
    });
  }

  private loadProduct(productId: number): void {
    this.isLoading = true;
    this.productManagementService.getById(productId).subscribe({
      next: response => {
        if (!response.payload) {
          this.isLoading = false;
          this.snackBar.open('Product not found.', 'Close', { duration: 4000 });
          this.router.navigate(['/seller-Account/products']);
          return;
        }
        this.patchProduct(response.payload);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(this.getRequestError(error, 'load product'), 'Close', { duration: 5000 });
        this.router.navigate(['/seller-Account/products']);
      }
    });
  }

  onPublishProduct(): void {
    if (this.isSubmitting || this.isLoading) {
      return;
    }
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      this.snackBar.open('Please fix the highlighted product fields before continuing.', 'Close', { duration: 4000 });
      return;
    }

    const values = this.productForm.getRawValue();
    const product: IProductWrite = {
      productName: values.productName?.trim(),
      description: values.description?.trim(),
      categoryId: Number(values.categoryId),
      typeId: Number(values.typeId ?? 1),
      basePrice: Number(values.basePrice),
      compareAtPrice: Number(values.compareAtPrice),
      costPerItem: Number(values.costPerItem),
      status: Number(values.status),
      brand: values.brand?.trim(),
      tags: Array.isArray(values.tags) ? values.tags.map((tag: string) => tag.trim()).filter(Boolean) : [],
      sku: values.sku?.trim(),
      barcode: values.barcode?.trim(),
      availableQuantity: Number(values.availableQuantity)
    };

    this.isSubmitting = true;
    const saveRequest = this.productId === null
      ? this.productManagementService.create(product)
      : this.productManagementService.update(this.productId, product);

    saveRequest.subscribe({
      next: response => {
        this.isSubmitting = false;
        this.snackBar.open(response.message || 'Product saved successfully.', 'Close', { duration: 4000 });
        this.router.navigate(['/seller-Account/products']);
      },
      error: (error) => {
        this.isSubmitting = false;
        const message = this.getRequestError(error, 'save product');
        this.snackBar.open(message, 'Close', { duration: 5000 });
      }
    });
  }

  onPreviewPage(): void {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      this.snackBar.open('Please complete the product form before previewing.', 'Close', { duration: 4000 });
      return;
    }

    const values = this.productForm.getRawValue();
    const previewProduct = {
      productId: this.productId,
      productName: values.productName?.trim(),
      description: values.description?.trim(),
      categoryId: Number(values.categoryId),
      categoryName: this.categoryList.find((category) => category.id === Number(values.categoryId))?.value ?? 'Uncategorized',
      typeId: Number(values.typeId ?? 1),
      basePrice: Number(values.basePrice),
      compareAtPrice: Number(values.compareAtPrice),
      costPerItem: Number(values.costPerItem),
      status: Number(values.status),
      brand: values.brand?.trim(),
      tags: Array.isArray(values.tags) ? values.tags.filter((tag: string) => tag?.trim()) : [],
      images: this.images.map(({ name, preview }) => ({ name, preview })),
      sku: values.sku?.trim(),
      barcode: values.barcode?.trim(),
      availableQuantity: Number(values.availableQuantity)
    };

    this.router.navigate(['/seller-Account/products/product-preview'], {
      state: { product: previewProduct }
    });
    this.transferringImages = true;
  }

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
      status: Number(product.status ?? 1),
      categoryId: product.categoryId,
      typeId: product.typeId,
      brand: product.brand ?? '',
      tags: product.tags ?? [],
      sku: product.sku ?? '',
      barcode: product.barcode ?? '',
      availableQuantity: product.availableQuantity
    });
  }

  onSelectImages(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const selectedFiles = Array.from(input.files);
    const remainingSlots = this.maxImageCount - this.images.length;
    const acceptedFiles: File[] = [];

    for (const file of selectedFiles) {
      if (!this.acceptedImageTypes.includes(file.type)) {
        this.snackBar.open(`${file.name} was skipped. Use JPG, PNG, or WebP images.`, 'Close', { duration: 5000 });
        continue;
      }
      if (file.size > this.maxImageSizeBytes) {
        this.snackBar.open(`${file.name} was skipped because it exceeds the 5 MB limit.`, 'Close', { duration: 5000 });
        continue;
      }
      if (acceptedFiles.length >= remainingSlots) {
        this.snackBar.open(`You can add up to ${this.maxImageCount} images.`, 'Close', { duration: 4000 });
        break;
      }
      acceptedFiles.push(file);
    }

    const nextImages = acceptedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    this.images = [...this.images, ...nextImages];
    this.productForm.patchValue({ productImages: this.images });
    input.value = '';
  }

  removeImage(image: ProductImagePreview): void {
    URL.revokeObjectURL(image.preview);
    this.images = this.images.filter((item) => item !== image);
    this.productForm.patchValue({ productImages: this.images });
  }

  ngOnDestroy(): void {
    if (!this.transferringImages) {
      this.images.forEach((image) => URL.revokeObjectURL(image.preview));
    }
  }

  private getRequestError(error: { status: number; error?: { message?: string; title?: string } }, action: string): string {
    if (error.status === 400) {
      return error.error?.message || 'Please check the product information and try again.';
    }
    if (error.status === 401) {
      return 'Your session has expired. Please sign in again.';
    }
    if (error.status === 403) {
      return `You do not have permission to ${action}.`;
    }
    if (error.status === 404) {
      return 'Product not found. It may have been removed.';
    }
    if (error.status === 409) {
      return error.error?.title || 'The product could not be changed because it conflicts with existing data.';
    }

    return error.error?.message || `Unable to ${action}${error.status ? ` (request failed: ${error.status})` : ''}.`;
  }
}
