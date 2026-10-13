import { Component, inject } from '@angular/core';
import { ProductSectionLayoutTwoComponent } from '../../../../shared/components/productDesignComponents/product-section-layout-two/product-section-layout-two.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-prod-design-one',
  standalone: true,
  imports: [ ProductSectionLayoutTwoComponent, RouterOutlet],
  templateUrl: './prod-design-one.component.html',
  styleUrl: './prod-design-one.component.scss',
})
export class ProdDesignOneComponent {
  private router = inject(Router);
  iterms = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

  productDetails(item: any) {
    console.log('prodcut details' + item);
    this.router.navigate([item]);
  }
}
