import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from "../../../../../shared/components/button/button.component";
import { ProgressBarComponent } from "../../../../components/progress-bar/proress-bar.component";
import { BreadcumbComponent } from "../../../../../shared/components/breadcumb/breadcumb.component";
import { TitleWithItemComponent } from "../../../../components/title-with-item/title-with-item.component";
import { Router } from '@angular/router';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductTag {
  name: string;
}

interface ProductSpecification {
  label: string;
  value: string;
}


@Component({
  selector: 'app-product-preview',
  standalone: true,
  imports: [ButtonComponent, ProgressBarComponent, BreadcumbComponent, TitleWithItemComponent],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss'
})

export class ProductPreviewComponent {

  // ============================================================
  // Product
  // ============================================================

  product = {
    id: 'CHR-001-BL',
    name: 'Ergonomic Office Chair',
    status: 'Active',

    description:
      'Premium ergonomic office chair designed for long working hours with adjustable lumbar support, breathable mesh and comfortable cushioning. Engineered to promote proper posture and reduce fatigue during extended desk sessions.',

    category: 'Office Furniture',
    brand: 'Acme Corp',

    price: 249,
    oldPrice: 299,

    costPerItem: 150,

    discount: 17,

    rating: 4.8,
    reviews: 124,

    barcode: '0123456789012',

    available: 45,
    reserved: 5,
    sold: 120,

    material: 'Breathable Mesh, Aluminum Base',
    color: 'Matte Black',
    weight: '18 kg (39.6 lbs)',
    dimensions: '68 × 68 × 115 - 125 cm',
    warranty: '2 Years Limited'
  };


  // ============================================================
  // Product Images
  // ============================================================

  images = signal<ProductImage[]>([
    {
      id: 1,
      url: '/upload/products/Main product image.png',
      alt: 'Ergonomic office chair'
    },
    {
      id: 2,
      url: '/upload/products/Main product image.png',
      alt: 'Office chair back'
    },
    {
      id: 3,
      url: '/upload/products/Main product image.png',
      alt: 'Office chair side'
    },
    {
      id: 4,
      url: '/upload/products/Main product image.png',
      alt: 'Office chair'
    },
       {
      id: 5,
      url: '/upload/products/Main product image.png',
      alt: 'Office chair'
    }
  ]);


  selectedImage = signal(0);


  // ============================================================
  // Tags
  // ============================================================

  tags: ProductTag[] = [
    { name: 'Best Seller' },
    { name: 'Office' },
    { name: 'Ergonomic' }
  ];


  // ============================================================
  // Specifications
  // ============================================================

  specifications: ProductSpecification[] = [
    {
      label: 'Material',
      value: this.product.material
    },
    {
      label: 'Color',
      value: this.product.color
    },
    {
      label: 'Weight',
      value: this.product.weight
    },
    {
      label: 'Dimensions',
      value: this.product.dimensions
    },
    {
      label: 'Warranty',
      value: this.product.warranty
    }
  ];


  // ============================================================
  // Sales Channels
  // ============================================================

  onlineStoreVisible = signal(true);

  pointOfSaleVisible = signal(false);


  // ============================================================
  // Image
  // ============================================================

  selectImage(index: number): void {
    this.selectedImage.set(index);
  }


  // ============================================================
  // Navigation
  // ============================================================

  duplicateProduct(): void {
    console.log('Duplicate product');
  }


  editProduct(): void {
    console.log('Edit product');
  }


  addProductImage(): void {
    console.log('Add product image');
  }


  // ============================================================
  // Stock
  // ============================================================

  get totalLifetime(): number {
    return (
      this.product.available +
      this.product.reserved +
      this.product.sold
    );
  }


  get availablePercentage(): number {
    return (
      (this.product.available / this.totalLifetime) * 100
    );
  }


  get reservedPercentage(): number {
    return (
      (this.product.reserved / this.totalLifetime) * 100
    );
  }


  get soldPercentage(): number {
    return (
      (this.product.sold / this.totalLifetime) * 100
    );
  }
  private router= inject(Router);

  onPreviewPage(){
    this.router.navigate(['seller-Account','products', 'add-product']);
  }
  onPublishProduct(){
    this.router.navigate(['seller-Account','products']);
  }
}
