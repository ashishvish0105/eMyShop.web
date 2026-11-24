
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product-in-store',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product-in-store.component.html',
  styleUrl: './add-product-in-store.component.scss'
})
export class AddProductInStoreComponent {

  activeCategory = signal('all');
  searchTerm = signal('');
  fulfillmentMode = signal('delivery');

  showBag = signal(false);
  orderPlaced = signal(false);

  products = signal<Product[]>([
    {
      id: 1,
      name: 'Single Origin Roast',
      category: 'coffee',
      description: 'Small-batch Colombia Huila whole beans, 250g.',
      price: 16.50,
      image: '/create-store/Images/product-1.png',
      inStock: true
    },
    {
      id: 2,
      name: 'Country Sourdough',
      category: 'bakery',
      description: 'Naturally leavened, baked fresh every morning.',
      price: 8.50,
      image: '/create-store/Images/product-1.png',
      inStock: true
    },
    {
      id: 3,
      name: 'Cold-Pressed Olive Oil',
      category: 'pantry',
      description: 'Single-estate extra virgin olive oil, 500ml.',
      price: 26.30,
      image: '/create-store/Images/product-1.png',
      inStock: true
    },
    {
      id: 4,
      name: 'Stoneware Mug',
      category: 'home',
      description: 'Handcrafted speckled ceramic mug, 12 oz.',
      price: 22.00,
      image: '/create-store/Images/product-1.png',
      inStock: true
    }
  ]);

  cart = signal<CartItem[]>([]);

  categories = [
    { label: 'All Items', value: 'all' },
    { label: 'Coffee', value: 'coffee' },
    { label: 'Bakery', value: 'bakery' },
    { label: 'Pantry', value: 'pantry' },
    { label: 'Home Goods', value: 'home' }
  ];

  filteredProducts = computed(() => {
    const category = this.activeCategory();
    const query = this.searchTerm().toLowerCase().trim();

    return this.products().filter(product => {
      const matchesCategory =
        category === 'all' || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  });

  cartCount = computed(() =>
    this.cart().reduce((total, item) => total + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cart().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

  selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  selectFulfillment(mode: string): void {
    this.fulfillmentMode.set(mode);
  }

  addToCart(product: Product): void {
    this.cart.update(items => {
      const existing = items.find(item => item.id === product.id);

      if (existing) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });

    this.orderPlaced.set(false);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cart.update(items =>
      items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  removeFromCart(productId: number): void {
    this.cart.update(items =>
      items.filter(item => item.id !== productId)
    );
  }

  openBag(): void {
    this.showBag.set(true);
  }

  closeBag(): void {
    this.showBag.set(false);
  }

  placeOrder(): void {
    if (this.cart().length === 0) return;

    this.cart.set([]);
    this.orderPlaced.set(true);
  }
}


interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}
