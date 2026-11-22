import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {

  steps = [
    {
      number: '01',
      icon: 'bi-person-plus',
      title: 'Register Your Shop',
      description: 'Enter your shop details and create your business account.'
    },
    {
      number: '02',
      icon: 'bi-box-seam',
      title: 'Build Your Online Store',
      description: 'Upload your products, add prices, and customize your digital storefront.'
    },
    {
      number: '03',
      icon: 'bi-cart-check',
      title: 'Start Receiving Orders',
      description: 'Let customers discover your products, place orders, and choose delivery or store pickup.'
    }
  ];
}
