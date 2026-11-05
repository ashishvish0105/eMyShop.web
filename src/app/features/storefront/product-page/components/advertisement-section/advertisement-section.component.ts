import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-advertisement-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisement-section.component.html',
  styleUrl: './advertisement-section.component.scss'
})
export class AdvertisementSectionComponent {

  menuOpen = false;
  headerActive = false;
  selectedFilter = 'All';

  collections = [
    {
      title: 'Men Collections',
      image: 'https://i.postimg.cc/m2KxLGxm/collection-1.jpg'
    },
    {
      title: 'Women Collections',
      image: 'https://i.postimg.cc/44t26Hjr/collection-2.jpg'
    },
    {
      title: 'Sports Collections',
      image: 'https://i.postimg.cc/15rWThm9/collection-3.jpg'
    }
  ];

  filters = ['All', 'Nike', 'Adidas', 'Puma', 'Bata', 'Apex'];

  products: Product[] = [
    {
      name: 'Nike Air Zoom Pegasus 39',
      image: 'https://i.postimg.cc/NfxyZYKf/product-1.jpg',
      price: 130,
      badge: 'New',
      categories: ['Nike'],
      gender: ['Men', 'Women']
    },
    {
      name: 'Nike Air Zoom Pegasus Turbo Next Nature',
      image: 'https://i.postimg.cc/kGGPvF37/product-2.jpg',
      price: 150,
      categories: ['Nike'],
      gender: ['Men', 'Sports']
    },
    {
      name: 'Nike Air Max 90 Essential',
      image: 'https://i.postimg.cc/wMrMXjrw/product-3.jpg',
      price: 135,
      badge: 'New',
      categories: ['Nike'],
      gender: ['Men', 'Women']
    },
    {
      name: 'Nike Free Run Trail',
      image: 'https://i.postimg.cc/8Cs1HSRN/product-4.png',
      price: 75,
      oldPrice: 100,
      badge: '-25%',
      categories: ['Nike'],
      gender: ['Men', 'Sports']
    },
    {
      name: 'Nike Zoom Winflo 9',
      image: 'https://i.postimg.cc/Lsfm7VWm/product-5.jpg',
      price: 100,
      badge: 'New',
      categories: ['Nike'],
      gender: ['Men', 'Women']
    },
    {
      name: 'Nike Air Max Alpha Trainer 5',
      image: 'https://i.postimg.cc/XvvzBNwD/product-6.jpg',
      price: 90,
      categories: ['Nike'],
      gender: ['Men', 'Women']
    },
    {
      name: 'Nike Air Max 270',
      image: 'https://i.postimg.cc/vBsxST3B/product-7.jpg',
      price: 150,
      categories: ['Nike'],
      gender: ['Women', 'Sports']
    },
    {
      name: 'Nike Revolution 6',
      image: 'https://i.postimg.cc/HxNDkcRk/product-8.jpg',
      price: 70,
      categories: ['Nike'],
      gender: ['Men', 'Women']
    }
  ];

  ctaCards = [
    {
      subtitle: 'Adidas Shoes',
      title: 'The Summer Sale Off 50%',
      image: 'https://i.postimg.cc/28MQ7kR4/cta-1.jpg'
    },
    {
      subtitle: 'Nike Shoes',
      title: 'Makes Yourself Keep Sporty',
      image: 'https://i.postimg.cc/DwfSGRmJ/cta-2.jpg'
    }
  ];

  specialProducts = [
    this.products[0],
    this.products[1],
    this.products[2],
    this.products[6]
  ];

  services = [
    {
      title: 'Free Shipping',
      text: 'All orders over',
      highlight: '$150.00',
      image: 'https://i.postimg.cc/nV3dD9Fv/service-1.png'
    },
    {
      title: 'Quick Payment',
      text: '100% Secure Payment',
      image: 'https://i.postimg.cc/13v6Wwdv/service-2.png'
    },
    {
      title: 'Free Returns',
      text: 'Money back in 30 days',
      image: 'https://i.postimg.cc/pd7jvxRr/service-3.png'
    },
    {
      title: '24/7 Support',
      text: 'Get Quick Support',
      image: 'https://i.postimg.cc/GmGVG3gK/service-4.png'
    }
  ];

  instagramImages = [
    'https://i.postimg.cc/W3Gfq59H/insta-1.jpg',
    'https://i.postimg.cc/26drjFnf/insta-2.jpg',
    'https://i.postimg.cc/j5cmk8zn/insta-3.jpg',
    'https://i.postimg.cc/HxYP5QF0/insta-4.jpg',
    'https://i.postimg.cc/K8t9HqbS/insta-5.jpg',
    'https://i.postimg.cc/zXgpytVq/insta-6.jpg',
    'https://i.postimg.cc/Bt9T53XQ/insta-7.jpg',
    'https://i.postimg.cc/7LYWJ3FR/insta-8.jpg'
  ];

  get filteredProducts(): Product[] {
    if (this.selectedFilter === 'All') {
      return this.products;
    }

    return this.products.filter(product =>
      product.categories.includes(this.selectedFilter)
    );
  }

  filterProducts(filter: string): void {
    this.selectedFilter = filter;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.headerActive = window.scrollY >= 80;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product.name);
  }

  addToWishlist(product: Product): void {
    console.log('Added to wishlist:', product.name);
  }

  quickView(product: Product): void {
    console.log('Quick view:', product.name);
  }

  compareProduct(product: Product): void {
    console.log('Compare:', product.name);
  }
}

interface Product {
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  categories: string[];
  gender: string[];
}
