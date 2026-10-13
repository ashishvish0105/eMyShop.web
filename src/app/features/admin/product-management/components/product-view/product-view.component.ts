import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {

  readonly MAX_DESC_LENGTH = 2000;
  description = signal<string>('');

  charCount = computed(() => this.description().length);
  charCountLabel = computed(() => `${this.charCount()} / ${this.MAX_DESC_LENGTH}`);

  onDescriptionInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.description.set(value);
  }

  stockQuantity = signal<number>(0);

  stockStatus = computed<StockStatus>(() => {
    const qty = this.stockQuantity();
    if (qty === 0) {
      return {
        label: 'Out of stock',
        background: '#FEF2F2',
        color: '#B91C1C',
        borderColor: '#FECACA'
      };
    } else if (qty <= 5) {
      return {
        label: 'Low stock',
        background: '#FFFBEB',
        color: '#92400E',
        borderColor: '#FDE68A'
      };
    } else {
      return {
        label: 'In stock',
        background: '#EAFAF3',
        color: '#0D7A45',
        borderColor: '#A8DFCA'
      };
    }
  });

  onStockInput(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10) || 0;
    this.stockQuantity.set(value);
  }

  // ── Size tags ─────────────────────────────────────────────────
  sizeTags = signal<SizeTag[]>([
    { value: 'XS',  active: false },
    { value: 'S',   active: true  },
    { value: 'M',   active: true  },
    { value: 'L',   active: true  },
    { value: 'XL',  active: false },
    { value: 'XXL', active: false },
  ]);

  toggleSize(index: number): void {
    this.sizeTags.update(tags =>
      tags.map((tag, i) =>
        i === index ? { ...tag, active: !tag.active } : tag
      )
    );
  }

  // ── Color swatches ────────────────────────────────────────────
  colorSwatches = signal<ColorSwatch[]>([
    { name: 'Black', hex: '#1A1916',                       active: true  },
    { name: 'White', hex: '#FFFFFF', border: '#ccc',       active: false },
    { name: 'Blue',  hex: '#1A56DB',                       active: false },
    { name: 'Coral', hex: '#D85A30',                       active: false },
    { name: 'Green', hex: '#639922',                       active: false },
    { name: 'Gray',  hex: '#6B6860',                       active: false },
  ]);

  selectColor(index: number): void {
    this.colorSwatches.update(swatches =>
      swatches.map((swatch, i) => ({ ...swatch, active: i === index }))
    );
  }

  activeColor = computed(() =>
    this.colorSwatches().find(s => s.active)?.name ?? ''
  );

  activeSizes = computed(() =>
    this.sizeTags().filter(t => t.active).map(t => t.value)
  );

  // ── Form actions ──────────────────────────────────────────────
  onSaveDraft(): void {
    console.log('Saving draft...');
  }

  onPreview(): void {
    console.log('Previewing...');
  }

  onPublish(): void {
    console.log('Publishing product...', {
      description: this.description(),
      stockQuantity: this.stockQuantity(),
      sizes: this.activeSizes(),
      color: this.activeColor(),
    });
  }
}



interface SizeTag {
  value: string;
  active: boolean;
}

interface ColorSwatch {
  name: string;
  hex: string;
  border?: string;
  active: boolean;
}

interface StockStatus {
  label: string;
  background: string;
  color: string;
  borderColor: string;
}
