import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [],
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {

  benefits = [
    {
      icon: 'bi-shop',
      title: 'Online Store',
      description: 'Create your own digital shop.'
    },
    {
      icon: 'bi-people',
      title: 'More Customers',
      description: 'Reach customers beyond walk-in visitors.'
    },
    {
      icon: 'bi-pencil-square',
      title: 'Easy Product Management',
      description: 'Add and manage products easily.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Online Payments',
      description: 'Receive payments through secure online payment options.'
    },
    {
      icon: 'bi-truck',
      title: 'Home Delivery',
      description: 'Deliver orders to customers when available.'
    },
    {
      icon: 'bi-shop-window',
      title: 'Store Pickup',
      description: 'Allow customers to collect their orders directly.'
    },
    {
      icon: 'bi-receipt',
      title: 'Order Management',
      description: 'Manage incoming orders from one dashboard.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Business Growth',
      description: 'Build your online presence and grow your business.'
    }
  ];
}
