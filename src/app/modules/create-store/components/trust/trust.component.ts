import { Component } from '@angular/core';

@Component({
  selector: 'app-trust',
  standalone: true,
  imports: [],
  templateUrl: './trust.component.html',
  styleUrl: './trust.component.scss'
})
export class TrustComponent {

  features = [
    {
      title: 'Designed for everyday shopkeepers',
      description: 'Manage products, prices, and orders directly from your phone or counter tablet.'
    },
    {
      title: 'Direct, transparent payouts',
      description: 'Accept secure online payments with fast settlements straight to your business account.'
    },
    {
      title: 'Your customers, your brand',
      description: 'Turn local foot traffic into loyal online regulars who can order anytime.'
    }
  ];
}
