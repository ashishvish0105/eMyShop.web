import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  registerClick = output<void>();

  activeTab = signal<'orders' | 'products' | 'fulfillment'>('orders');

  orders = [
    {
      id: '#NS-4821',
      customer: 'Elena Rostova',
      items: 'Single Origin Roast, Olive Oil',
      option: 'Home Delivery',
      status: 'In Transit',
      total: '$42.80'
    },
    {
      id: '#NS-4820',
      customer: 'Marcus Vance',
      items: 'Country Sourdough (x2)',
      option: 'Store Pickup',
      status: 'Pickup Ready',
      total: '$17.00'
    },
    {
      id: '#NS-4819',
      customer: 'Priya Nair',
      items: 'Stoneware Mug, Coffee Beans',
      option: 'Home Delivery',
      status: 'Delivered',
      total: '$38.50'
    }
  ];

  products = [
    {
      name: 'Single Origin Roast',
      stock: '24 bags in stock',
      price: '$16.50',
      image: 'https://lh3.googleusercontent.com/aida/ALJJyrDUCn0d2XnqwgDfMeuzbeSRVKvEhq7ngHYWbFuplJrs6kYMSBfg7s1gCDHeFY_v0jZDGPjKH9D_DBT9q66N9JuCNZFkFGjI5yczmwYNwGHOIURmJtjG3vcxE6UpFp7hKrayUHOh0lOEgkBmLc6YZyDAC-srdDiccXPfQPjqGyOyHDqiDYQsKJC4iAB4TCAud_3RIzjTnuLkdC8GLz0-hYt_J09PHbrfIVPveNXamkfVxjL23vRW06r-NpL6lzZZ'
    },
    {
      name: 'Speckled Stoneware Mug',
      stock: '9 pieces in stock',
      price: '$22.00',
      image: 'https://lh3.googleusercontent.com/aida/ALJJyrDGG9iW5FqwaoAm_IGIJJ6w-ZZ8LwEqV0k0vTUjyeg1FpwqgmV4KenIqAWGB2liP_0KDrhRuO1HM86JEt9bzZBhTgGk7WuCb23myot9ZZmU34jzzdLZMxEc6F8lMBl4FWDm11vEKMgpBWOtqmSmH7GDRe6lJkgkNHmk1nWDDJF3fUmGcFM6CR-gO0-pWlqgnkjpZXpwcRvLz_My2zpVbKp06qtEnPiD29f4cnsfOHSCfUxfu7mK-1fzPHsChWc'
    },
    {
      name: 'Country Sourdough Loaf',
      stock: 'Baked fresh daily',
      price: '$8.50',
      image: 'https://lh3.googleusercontent.com/aida/ALJJyrBRB1PoqA3kQq-byyP7NjpPmiuXGzMwtPm637xA6Nm6c0hzZYvW1vjyl_zFYcBFwZXLuSezKVCNrQ1dxmtMRXNNHVWK21kLs-pF5tvx9wUE0LyK9bXmUwdMsJDfdUlWPUiMXEK8GALBnAyq-fBz4rVv6IHPgX2xZLSAbwwhd-Ip9oKQsqgDHYv06vSXnfOfWonlCG6HVChicO2QQJxhu9MF5qyIkWloK-Gff0ImdY1r32grEwCAea9vc0ua'
    }
  ];

  selectTab(tab: 'orders' | 'products' | 'fulfillment'): void {
    this.activeTab.set(tab);
  }


}

