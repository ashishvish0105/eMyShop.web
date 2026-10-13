import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IIconWithSectionTitleComponent, IconWithSectionTitleComponent } from '../../../../shared/components/icon-with-section-title/icon-with-section-title.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-services-item',
  standalone: true,
  imports: [IconWithSectionTitleComponent],
  templateUrl: './show-services-item.component.html',
  styleUrl: './show-services-item.component.scss',
})
export class ShowServicesItemComponent {
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
    this.routes.navigate(['/dashboard/eShop/service']);
  }
}
