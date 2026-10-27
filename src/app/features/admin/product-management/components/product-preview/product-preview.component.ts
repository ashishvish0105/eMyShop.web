import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IProductWrite } from '../../../../../interface/admin/product-management/IProduct.model';
import { ProductManagmentService } from '../../services/product-managment.service';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';

interface PreviewImage {
  name: string;
  preview: string;
}

interface ProductPreviewData extends Omit<IProductWrite, 'tags'> {
  productId: number | null;
  categoryName: string;
  images: PreviewImage[];
  tags: string[];
}

@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss'
})
export class ProductPreviewComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductManagmentService);
  private readonly snackbarService = inject(SnackbarService);

  readonly product = signal<ProductPreviewData | null>(null);
  readonly selectedImage = signal(0);
  readonly isSaving = signal(false);
  private transferringImages = false;

  ngOnInit(): void {
    const product = typeof history !== 'undefined'
      ? history.state?.product as ProductPreviewData | undefined
      : undefined;
    if (!product) {
      this.router.navigate(['/seller-Account/products']);
      this.snackbarService.error('Preview data is no longer available. Please reopen the product form.');
      return;
    }

    this.product.set({
      ...product,
      images: Array.isArray(product.images) ? product.images : [],
      tags: Array.isArray(product.tags) ? product.tags : []
    });
  }

  selectImage(index: number): void {
    this.selectedImage.set(index);
  }

  returnToEditor(): void {
    const product = this.product();
    if (!product) {
      this.router.navigate(['/seller-Account/products']);
      return;
    }

    this.transferringImages = true;
    const path = product.productId
      ? ['/seller-Account/products/edit', product.productId]
      : ['/seller-Account/products/add-product'];
    this.router.navigate(path, { state: { product } });
  }

  publishProduct(): void {
    const product = this.product();
    if (!product || this.isSaving()) {
      return;
    }

    const { productId, categoryName, images, ...writeModel } = product;
    this.isSaving.set(true);
    const request = productId
      ? this.productService.update(productId, writeModel)
      : this.productService.create(writeModel);

    request.subscribe({
      next: (response) => {
        this.isSaving.set(false);
        this.releaseImagePreviews();
        this.snackbarService.success(response.message || 'Product saved successfully.');
        this.router.navigate(['/seller-Account/products']);
      },
      error: (error) => {
        this.isSaving.set(false);
        const message = error?.error?.message || 'Unable to save the product. Please try again.';
        this.snackbarService.error(message);
      }
    });
  }

  statusLabel(status: number | string): string {
    const labels: Record<number, string> = {
      0: 'Inactive',
      1: 'Active',
      2: 'Draft',
      3: 'Archived'
    };
    return labels[Number(status)] ?? 'Unknown';
  }

  ngOnDestroy(): void {
    if (!this.transferringImages) {
      this.releaseImagePreviews();
    }
  }

  private releaseImagePreviews(): void {
    this.product()?.images.forEach((image) => {
      if (image.preview.startsWith('blob:')) {
        URL.revokeObjectURL(image.preview);
      }
    });
  }
}
