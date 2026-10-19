import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../../../interface/admin/product-management/IProduct.model';
import { ProductManagmentService } from '../../services/product-managment.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductManagmentService);

  readonly product = signal<IProduct | null>(null);
  readonly categoryName = signal('Uncategorized');
  readonly loading = signal(true);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(productId) || productId < 1) {
      this.loading.set(false);
      this.errorMessage.set('The product identifier is invalid.');
      return;
    }

    this.productService.getById(productId).subscribe({
      next: (response) => {
        if (!response.payload) {
          this.errorMessage.set('Product not found.');
          this.loading.set(false);
          return;
        }

        this.product.set(response.payload);
        this.loadCategoryName(response.payload.categoryId);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(this.getRequestError(error, 'load product details'));
        this.loading.set(false);
      }
    });
  }

  editProduct(): void {
    const product = this.product();
    if (product) {
      this.router.navigate(['/seller-Account/products/edit', product.productId]);
    }
  }

  backToProducts(): void {
    this.router.navigate(['/seller-Account/products']);
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

  private loadCategoryName(categoryId: number): void {
    this.productService.getCetegories().subscribe({
      next: (response) => {
        const categories = Array.isArray(response?.payload) ? response.payload : [];
        const category = categories.find((item: { categoryId?: number; id?: number; categoryName?: string; name?: string }) =>
          Number(item.categoryId ?? item.id) === categoryId
        );
        if (category?.categoryName ?? category?.name) {
          this.categoryName.set(category.categoryName ?? category.name);
        }
      },
      error: () => this.categoryName.set(`Category ${categoryId}`)
    });
  }

  private getRequestError(error: { status: number; error?: { title?: string } }, action: string): string {
    if (error.status === 400) {
      return 'The product ID is invalid.';
    }
    if (error.status === 403) {
      return 'You do not have permission to view this product.';
    }
    if (error.status === 404) {
      return 'Product not found.';
    }

    return error.error?.title
      ? `${error.error.title} Could not ${action}.`
      : `Could not ${action} (request failed${error.status ? `: ${error.status}` : ''}).`;
  }
}
