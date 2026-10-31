import { Component } from '@angular/core';
import { CatalogPageHostComponent } from '../catalog-page-host.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CatalogPageHostComponent],
  template: '<app-storefront-catalog-page mode="menu" />',
})
export class MenuPageComponent {}
