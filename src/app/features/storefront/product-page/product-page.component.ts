import { Component } from '@angular/core';
import { BestSellingProductsComponent } from './components/best-selling-products/best-selling-products.component';
import { AdvertisementSliderComponent } from './components/advertisement-slider/advertisement-slider.component';
import { AdvertisementSectionComponent } from './components/advertisement-section/advertisement-section.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [BestSellingProductsComponent, AdvertisementSliderComponent, AdvertisementSectionComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

}
