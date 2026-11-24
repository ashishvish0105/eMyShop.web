import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnDestroy
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

interface LaunchItem {
  title: string;
  description: string;
  editLink: string;
}

interface StoreProduct {
  name: string;
  price: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-review-store',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-store.component.html',
  styleUrl: './review-store.component.scss'
})
export class ReviewStoreComponent {
private readonly fb = inject(FormBuilder);

  readonly storeName = 'Oakwood Corner Market';

  readonly storeUrl =
    'https://nearshop.local/oakwood-corner-market';

  readonly storePath =
    'nearshop.local/oakwood-corner-market';

  readonly copied = signal(false);

  readonly isLive = signal(true);

  readonly isCopying = signal(false);

  readonly statusText = computed(() =>
    this.isLive() ? 'Store Ready' : 'Preview Only'
  );

  readonly visibilityHint = computed(() =>
    this.isLive()
      ? 'Visible to nearby shoppers'
      : 'Hidden until you publish'
  );

  private copyTimeout?: ReturnType<typeof setTimeout>;

  readonly visibilityForm = this.fb.nonNullable.group({
    acceptOrders: [true, Validators.required]
  });

  readonly launchItems: LaunchItem[] = [
    {
      title: 'Shop Profile & Hours',
      description: 'Oakwood Corner Market • Open 7 AM – 8 PM',
      editLink: '../shop-registration/ShopRegistration.html'
    },
    {
      title: 'Verification & Payouts',
      description: 'Business license & bank •••• 6712 connected',
      editLink: '../shop-verification/ShopVerification.html'
    },
    {
      title: 'Product Catalog Uploaded',
      description: '4 active items with stock & pricing',
      editLink: '../product-upload/ProductUpload.html'
    },
    {
      title: 'Delivery & Pickup Rules',
      description: 'Home delivery (3 mi) & 20-min pickup',
      editLink: '../storefront-customizer/StorefrontCustomizer.html'
    }
  ];

  readonly products: StoreProduct[] = [
    {
      name: 'Single Origin Roast',
      price: '$18.50',
      image: 'assets/images/single-origin-roast.jpg',
      alt: 'Single Origin Roast'
    },
    {
      name: 'Country Sourdough',
      price: '$8.00',
      image: 'https://lh3.googleusercontent.com/aida/ALJJyrDCzXtK6N-NklFr92RM15BRY_e8jG6_T9jq28m4ShSsQ4ImooCWeZ1ptaf-4T7wufzR7qGs_mR4fUegObKSTav0HYLSJaJk9xyQAlrnVyFcasPgRZUy757NSPLgSYbT7eelELWOq6BebjEDV26K9LqdYJqviVrOjeJVPsjEOAY0gc_Eo1zF6d0cyM0TH5h--hy_OymNeb7JGY6RiYD7VBo5zNScZ2-F1-GbMwlsTAvwGo6nyJBQoQkOeOIw',
      alt: 'Country Sourdough Loaf'
    }
  ];

  constructor() {
    this.visibilityForm.controls.acceptOrders.valueChanges
      .subscribe(value => {
        this.isLive.set(value);
      });
  }

  async copyStoreLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.storeUrl);

      this.copied.set(true);

      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }

      this.copyTimeout = setTimeout(() => {
        this.copied.set(false);
      }, 1800);

    } catch {
      this.copied.set(false);
    }
  }

  toggleVisibility(): void {
    const control = this.visibilityForm.controls.acceptOrders;

    control.setValue(!control.value);
  }

  navigateTo(url: string): void {
    window.location.href = url;
  }

  ngOnDestroy(): void {
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }
}
