import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router, RouterOutlet } from '@angular/router';
import { BreadcumbComponent } from '../../../shared/components/breadcumb/breadcumb.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  IconWithSectionTitleComponent,
  IIconWithSectionTitleComponent,
} from '../../../shared/components/icon-with-section-title/icon-with-section-title.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ConvertDetailPageComponent } from '../components/convert-detail-page/convert-detail-page.component';
import { ServiceComponent } from '../components/service/service.component';
import { ShowServicesItemComponent } from '../components/show-services-item/show-services-item.component';
import { TokenGenereteComponent } from '../components/token-generete/token-generete.component';

@Component({
  selector: 'app-services-main-section',
  standalone: true,
  imports: [
    BreadcumbComponent,
    SectionTitleComponent,
    ButtonComponent,
    ReactiveFormsModule,
    TokenGenereteComponent,
    RouterOutlet,
    ShowServicesItemComponent,
    IconWithSectionTitleComponent,
    ConvertDetailPageComponent,
    ServiceComponent,
  ],
  templateUrl: './services-main-section.component.html',
  styleUrl: './services-main-section.component.scss',
})
export class ServicesMainSectionComponent{
  pdfConvertingList: IIconWithSectionTitleComponent[] = [
    {
      title: 'voting update',
      description: 'you convert any type document into pdf',
    },
    {
      title: 'Adahar update',
      description: 'you convert any type document into pdf',
    },
    {
      title: 'pan card',
      description: 'you convert any type document into pdf',
    },
    {
      title: 'goverment',
      description: 'you convert any type document into pdf',
    },
  ];

  formHeaadingName: string = 'Basic Infomation';

  servicesForm!: FormGroup;
  // addServicesForm!: FormGroup;
  IsAddServicesForm = signal(false);
  SelectedServiceType: number = 1;
  IsValidForm: boolean = false;

  constructor(private fb: FormBuilder, private routes: Router) {}

  clickHereEvent() {
    this.routes.navigate(['dashboard/eShop/service']);
  }
}
export interface serviceList {
  servicesId: number;
  ServicesName: string;
}
