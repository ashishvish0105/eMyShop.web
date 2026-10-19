import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { EmyButtonsComponent, Button } from '../../../../components/emy-buttons/emy-buttons.component';
import { SectionTitleWithbuttonsComponent } from '../../../../components/section-title-withbuttons/section-title-withbuttons.component';
import { TableWithTitleComponent } from '../../../../components/table-with-title/table-with-title.component';
import { TitleWithItemComponent } from '../../../../components/title-with-item/title-with-item.component';
import { ProgressBarComponent } from '../../../../components/progress-bar/proress-bar.component';
import { IProduct } from '../../../../../interface/admin/product-management/IProduct.model';
import { ProductManagmentService } from '../../services/product-managment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface CategorySummary {
  name: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-product-main-section',
  standalone: true,
  imports: [SectionTitleWithbuttonsComponent, TitleWithItemComponent, TableWithTitleComponent, ProgressBarComponent, EmyButtonsComponent],
  templateUrl: './product-main-section.component.html',
  styleUrl: './product-main-section.component.scss'
})
export class ProductMainSectionComponent implements OnInit {
  private router = inject(Router);
  private productManagementService = inject(ProductManagmentService);
  private snackBar = inject(MatSnackBar);

  readonly statusLabels: Record<number, string> = {
    0: 'Inactive',
    1: 'Active',
    2: 'Draft',
    3: 'Archived'
  };

  buttons: Button[] = [
    {
      buttonType: 'secondary',
      label: 'Add Product',
      buttonIcon: 'add',
      cssClass: 'eMy-primary',
      isActive: true,
    },
  ];

  tableColumnNamas = [
    {
      header: 'Product',
      field: 'productName',
      type: 'product'
    },
    {
      header: 'Category',
      field: 'categoryName',
      type: 'text'
    },
    {
      header: 'Price',
      field: 'basePrice',
      type: 'currency'
    },
    {
      header: 'Stock',
      field: 'availableQuantity',
      type: 'text'
    },
    {
      header: 'Status',
      field: 'status',
      type: 'status'
    },
    {
      header: 'SKU',
      field: 'sku',
      type: 'text'
    }
  ];

  products = signal<IProduct[]>([]);
  categorySummary = signal<CategorySummary[]>([]);
  productsError = signal('');
  private categoryMap = new Map<number, string>();
  private deletingProductIds = new Set<number>();

  addProductNavbar(): void {
    this.router.navigate(['/seller-Account/products/add-product']);
  }

  onPageSizeChange(paginationObject: { pageSize: number; currentPage: number }): void {
    this.loadProducts(paginationObject.pageSize, paginationObject.currentPage);
  }

  editProduct(product: IProduct): void {
    this.router.navigate(['/seller-Account/products/edit', product.productId]);
  }

  viewProduct(product: IProduct): void {
    this.router.navigate(['/seller-Account/products/product-view', product.productId]);
  }

  deleteProduct(product: IProduct): void {
    if (this.deletingProductIds.has(product.productId)) {
      return;
    }
    if (!window.confirm(`Delete "${product.productName}"?`)) {
      return;
    }

    this.deletingProductIds.add(product.productId);
    this.productManagementService.delete(product.productId).subscribe({
      next: (response) => {
        this.deletingProductIds.delete(product.productId);
        this.snackBar.open(response.message || 'Product deleted successfully.', 'Close', { duration: 4000 });
        this.loadProducts();
      },
      error: (error) => {
        this.deletingProductIds.delete(product.productId);
        this.snackBar.open(this.getDeleteError(error), 'Close', { duration: 5000 });
      }
    });
  }

  private loadProducts(pageSize = 10, currentPage = 1): void {
    this.productManagementService.getCetegories().subscribe({
      next: (categoriesResponse) => {
        const categoryList = Array.isArray(categoriesResponse?.payload) ? categoriesResponse.payload : [];
        this.categoryMap = new Map<number, string>(
          categoryList.map((category: any) => [Number(category.categoryId ?? category.id), category.categoryName ?? category.name])
        );

        this.productManagementService.getAll(pageSize, currentPage).subscribe({
          next: (response) => {
            const payload = Array.isArray(response.payload) ? response.payload : [];
            const normalizedProducts = payload.map((product) => this.normalizeProduct(product));
            this.products.set(normalizedProducts);
            this.productsError.set('');
            this.updateCategorySummary(normalizedProducts);
          },
          error: (error) => {
            this.products.set([]);
            this.categorySummary.set([]);
            this.productsError.set(this.getListError(error));
          }
        });
      },
      error: () => {
        this.productManagementService.getAll(pageSize, currentPage).subscribe({
          next: (response) => {
            const payload = Array.isArray(response.payload) ? response.payload : [];
            const normalizedProducts = payload.map((product) => this.normalizeProduct(product));
            this.products.set(normalizedProducts);
            this.productsError.set('');
            this.updateCategorySummary(normalizedProducts);
          },
          error: (error) => {
            this.products.set([]);
            this.categorySummary.set([]);
            this.productsError.set(this.getListError(error));
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private normalizeProduct(product: IProduct): IProduct {
    return {
      ...product,
      categoryName: this.categoryMap.get(product.categoryId) ?? `Category ${product.categoryId}`,
      status: this.getStatusLabel(product.status),
      sku: product.sku ?? 'N/A'
    } as IProduct;
  }

  private getStatusLabel(status: number | string): string {
    const numericStatus = Number(status);
    return this.statusLabels[numericStatus] ?? 'Unknown';
  }

  private updateCategorySummary(products: IProduct[]): void {
    const countsByCategory = new Map<string, number>();

    products.forEach((product) => {
      const categoryName = product.categoryName ?? `Category ${product.categoryId}`;
      countsByCategory.set(categoryName, (countsByCategory.get(categoryName) ?? 0) + 1);
    });

    const summary = Array.from(countsByCategory.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    const maxCount = summary.length ? Math.max(...summary.map((item) => item.count)) : 1;
    this.categorySummary.set(
      summary.map((item) => ({
        ...item,
        percentage: Math.max(12, Math.round((item.count / maxCount) * 100))
      }))
    );
  }

  private getDeleteError(error: { status: number; error?: { title?: string; message?: string } }): string {
    if (error.status === 401) {
      return 'Your session has expired. Please sign in again.';
    }
    if (error.status === 403) {
      return 'You do not have permission to delete products.';
    }
    if (error.status === 404) {
      return 'This product was not found. The list will be refreshed.';
    }
    if (error.status === 409) {
      return 'This product cannot be deleted because it is referenced by other records.';
    }
    return error.error?.message || `Unable to delete product${error.status ? ` (request failed: ${error.status})` : ''}.`;
  }

  private getListError(error: { status: number }): string {
    if (error.status === 401) {
      return 'Your session has expired. Please sign in again.';
    }
    if (error.status === 403) {
      return 'You do not have permission to view products.';
    }
    return `Unable to load products${error.status ? ` (request failed: ${error.status})` : ''}.`;
  }
}
