import { Routes } from '@angular/router';
import { DetailConvertComponent } from './components/detail-convert/detail-convert.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { PdfConverterMainSectionComponent } from './pdf-converter-main-section/pdf-converter-main-section.component';

export const route: Routes = [
  {
    path: '',
    component: PdfConverterMainSectionComponent,
    children:[
      {
        path:"",
        component:InitialPageComponent
      },
      {
        path:"convertPage",
        component:DetailConvertComponent
      }
    ]
  },
];
