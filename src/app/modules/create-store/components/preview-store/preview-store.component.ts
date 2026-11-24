import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal,
  DestroyRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';



import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
}

interface BagItem {
  product: Product;
  quantity: number;
}
@Component({
  selector: 'app-preview-store',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './preview-store.component.html',
  styleUrl: './preview-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewStoreComponent {

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  // Font Awesome icons



  // Store information

  readonly storeName = 'Oakwood Corner Market';

  readonly storeAddress = '742 Maple Avenue';

  readonly storeHours = 'Open 7 AM – 8 PM';

  readonly storeDistance = '0.4 mi away';

  readonly storeSlug = 'oakwood-corner-market';

  // Preview state

  readonly viewport = signal<'desktop' | 'mobile'>('desktop');

  readonly selectedCategory = signal('all');

  readonly selectedFulfillment = signal<'delivery' | 'pickup'>('delivery');

  readonly isBagOpen = signal(false);

  readonly isPublished = signal(false);

  readonly lastAddedProduct = signal<number | null>(null);

  // Reactive form

  readonly fulfillmentForm = this.fb.group({
    fulfillment: ['delivery', Validators.required]
  });

  // Product catalog

  readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Single Origin Roast',
      category: 'Coffee',
      description: '12 oz whole bean',
      price: 18.50,
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop',
      imageAlt: 'Freshly roasted coffee beans'
    },
    {
      id: 2,
      name: 'Country Sourdough',
      category: 'Bakery',
      description: 'Baked fresh daily',
      price: 8.00,
      image: 'https://lh3.googleusercontent.com/aida/ALJJyrDCzXtK6N-NklFr92RM15BRY_e8jG6_T9jq28m4ShSsQ4ImooCWeZ1ptaf-4T7wufzR7qGs_mR4fUegObKSTav0HYLSJaJk9xyQAlrnVyFcasPgRZUy757NSPLgSYbT7eelELWOq6BebjEDV26K9LqdYJqviVrOjeJVPsjEOAY0gc_Eo1zF6d0cyM0TH5h--hy_OymNeb7JGY6RiYD7VBo5zNScZ2-F1-GbMwlsTAvwGo6nyJBQoQkOeOIw',
      imageAlt: 'Fresh country sourdough bread'
    },
    {
      id: 3,
      name: 'Cold-Pressed Olive Oil',
      category: 'Pantry',
      description: '500 ml glass bottle',
      price: 24.00,
      image: 'https://lh3.googleusercontent.com/aida/ALJJyrAa-taaXpByIeJEnOI0Bc3NCO--XBgwGiCRy1_8NTHalUMq60aPQIscHMOvOmTv0poGV1OSlJ3W8m3dN-h8XG9fzAswGIh83KTpqBcl_PF3Jm65aCc64HUF70kxt6aEr6an3SkrzUI4NDQqSq1QevA6O67abg7mc18IA9fjbU7JnC3Abm7fLpbPMsE3jcjv_17cbrMxf91wNrgiLFWKVnF7qZ98TTdZBJ5gMGEMkSXtoZpthDN9PcR6NlMW',
      imageAlt: 'Cold pressed olive oil bottle'
    },
    {
      id: 4,
      name: 'Stoneware Mug',
      category: 'Home',
      description: 'Hand-glazed ceramic',
      price: 22.00,
      image: 'https://lh3.googleusercontent.com/aida/ALJJyrCHXuUKa5jWyv7DycsIfHtCoCcbutd70QK6UdU9IHnNR8gMr6nY7bsJOUgWmkHBwJV_vdPDxVRw2tCAqTEH2akzndG0ccPpY2WRMts3oxQ31RXPcGbVm27J-VYnO1P9m--nI2R1gHj17g-3lPXULNvhE2iDmmicKevl_1WqWnuBfgmCYSEtHlpjwPMBg5w-XgEOCFCYBzEXW7sy6hS3aKFhEAPvAq8VUJ419MkaFqIhLwedEqSQbcT4KrB3kY8',
      imageAlt: 'Hand glazed stoneware mug'
    }
  ]);

  readonly categories = [
    'Coffee',
    'Bakery',
    'Pantry',
    'Home'
  ];

  // Shopping bag state

  readonly bagItems = signal<BagItem[]>([]);

  readonly bagCount = computed(() =>
    this.bagItems().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  readonly bagTotal = computed(() =>
    this.bagItems().reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    )
  );

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();

    if (category === 'all') {
      return this.products();
    }

    return this.products().filter(
      product => product.category === category
    );
  });

  readonly categoryCounts = computed(() => {
    const counts: Record<string, number> = {
      all: this.products().length
    };

    for (const product of this.products()) {
      counts[product.category] =
        (counts[product.category] ?? 0) + 1;
    }

    return counts;
  });

  // Viewport selection

  setViewport(viewport: 'desktop' | 'mobile'): void {
    this.viewport.set(viewport);
  }

  // Category filtering

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  // Fulfillment selection

  selectFulfillment(
    fulfillment: 'delivery' | 'pickup'
  ): void {
    this.selectedFulfillment.set(fulfillment);

    this.fulfillmentForm.patchValue({
      fulfillment
    });
  }

  // Shopping bag operations

  addToBag(product: Product): void {
    this.bagItems.update(items => {
      const existingItem = items.find(
        item => item.product.id === product.id
      );

      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...items,
        {
          product,
          quantity: 1
        }
      ];
    });

    this.lastAddedProduct.set(product.id);
  }

  increaseQuantity(productId: number): void {
    this.bagItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productId: number): void {
    this.bagItems.update(items =>
      items
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  removeFromBag(productId: number): void {
    this.bagItems.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  toggleBag(): void {
    this.isBagOpen.update(value => !value);
  }

  closeBag(): void {
    this.isBagOpen.set(false);
  }

  // Publishing

  publishStore(): void {
    if (this.isPublished()) {
      return;
    }

    this.isPublished.set(true);

    timer(700)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        void this.router.navigateByUrl(
          '/shopkeeper-dashboard'
        );
      });
  }

  // Navigation

  exitPreview(): void {
    void this.router.navigateByUrl('/store-ready');
  }

  editStyle(): void {
    void this.router.navigateByUrl(
      '/storefront-customizer'
    );
  }

  // Currency formatting

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  trackProduct(
    _index: number,
    product: Product
  ): number {
    return product.id;
  }
}
