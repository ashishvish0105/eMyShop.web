import { Component, OnInit } from '@angular/core';
import {
  IconWithSectionTitleComponent,
  IIconWithSectionTitleComponent,
} from '../../../shared/components/icon-with-section-title/icon-with-section-title.component';
import { BreadcumbComponent } from "../../../shared/components/breadcumb/breadcumb.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pdf-converter-main-section',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './pdf-converter-main-section.component.html',
  styleUrl: './pdf-converter-main-section.component.scss',
})
export class PdfConverterMainSectionComponent {

}
