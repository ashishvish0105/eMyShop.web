import { Component } from '@angular/core';
import { CatalogPageHostComponent } from '../../menu/catalog-page-host.component';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [CatalogPageHostComponent],
  template: '<app-storefront-catalog-page mode="offers" />',
})
export class OffersPageComponent {}
