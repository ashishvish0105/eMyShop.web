import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-product-section-layout-two',
  standalone: true,
  imports: [],
  templateUrl: './product-section-layout-two.component.html',
  styleUrl: './product-section-layout-two.component.scss',
})
export class ProductSectionLayoutTwoComponent {
  @Input() titleName: string = 'default title';

}
