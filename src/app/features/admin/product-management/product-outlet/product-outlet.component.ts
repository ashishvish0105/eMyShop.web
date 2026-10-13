import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BreadcumbComponent } from "../../../../shared/components/breadcumb/breadcumb.component";

@Component({
  selector: 'app-product-outlet',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-outlet.component.html',
  styleUrl: './product-outlet.component.scss'
})
export class ProductOutletComponent {

}
