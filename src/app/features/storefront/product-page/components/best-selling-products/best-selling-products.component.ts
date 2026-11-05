import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-best-selling-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-selling-products.component.html',
  styleUrl: './best-selling-products.component.scss'
})
export class BestSellingProductsComponent {
filters = ['All', 'Nike', 'Adidas', 'Puma', 'Bata', 'Apex'];

  activeFilter = 'All';

  products = [
    {
      id: 1,
      name: 'Nike Air Zoom Pegasus 39',
      image: 'https://i.postimg.cc/NfxyZYKf/product-1.jpg',
      price: 130,
      badge: 'New',
      categories: ['Men', 'Women'],
    },
    {
      id: 2,
      name: 'Nike Air Zoom Pegasus Turbo Next Nature',
      image: 'https://i.postimg.cc/kGGPvF37/product-2.jpg',
      price: 150,
      categories: ['Men', 'Sports']
    },
    {
      id: 3,
      name: 'Nike Air Max 90 Essential',
      image: 'https://i.postimg.cc/wMrMXjrw/product-3.jpg',
      price: 135,
      badge: 'New',
      categories: ['Men', 'Women']
    },
    {
      id: 4,
      name: 'Nike Free Run Trail',
      image: 'https://i.postimg.cc/8Cs1HSRN/product-4.png',
      price: 75,
      oldPrice: 100,
      badge: '-25%',
      categories: ['Men', 'Sports']
    },
    {
      id: 5,
      name: 'Nike Zoom Winflo 9',
      image: 'https://i.postimg.cc/Lsfm7VWm/product-5.jpg',
      price: 100,
      badge: 'New',
      categories: ['Men', 'Women']
    },
    {
      id: 6,
      name: 'Nike Air Max Alpha Trainer 5',
      image: 'https://i.postimg.cc/XvvzBNwD/product-6.jpg',
      price: 90,
      categories: ['Men', 'Women']
    },
    {
      id: 7,
      name: 'Nike Air Max 270',
      image: 'https://i.postimg.cc/vBsxST3B/product-7.jpg',
      price: 150,
      categories: ['Women', 'Sports']
    },
    {
      id: 8,
      name: 'Nike Revolution 6',
      image: 'https://i.postimg.cc/HxNDkcRk/product-8.jpg',
      price: 70,
      categories: ['Men', 'Women']
    }
  ];

  get filteredProducts() {
    if (this.activeFilter === 'All') {
      return this.products;

    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.activeFilter.toLowerCase())
    );
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

}
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  categories: string[];
  gender: string[];
}
