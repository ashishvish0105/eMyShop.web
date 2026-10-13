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

  buttons: Button[] = [
      {
        buttonType: 'secondary',
        label: 'Add Product',
        buttonIcon: 'add',
        cssClass:'eMy-primary',
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
    field: 'categoryId',
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


  addProductNavbar():void{
    this.router.navigate(["/","seller-Account","products","add-product"])
  }

  onPageSizeChange(paginationObject: { pageSize: number; currentPage: number }): void {
    this.loadProducts(paginationObject.pageSize, paginationObject.currentPage);
  }

  editProduct(product: IProduct): void {
    this.router.navigate(['/seller-Account/products/edit', product.productId]);
  }

  deleteProduct(product: IProduct): void {
    if (!window.confirm(`Delete "${product.productName}"?`)) {
      return;
    }

    this.productManagementService.delete(product.productId).subscribe({
      next: (response) => {
        this.snackBar.open(response.message || 'Product deleted successfully.', 'Close', { duration: 4000 });
        this.loadProducts();
      }
    });
  }

  private loadProducts(pageSize = 10, currentPage = 1): void {
    this.productManagementService.getAll(pageSize, currentPage).subscribe({
      next: (response) => this.products.set(response.payload ?? [])
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }
}
