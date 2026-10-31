import { Component, inject } from '@angular/core';
import { StorefrontToastService } from '../../toast.service';

@Component({
  selector: 'app-storefront-toast',
  standalone: true,
  template: `@if (toast.message()) { <div class="toast-message" role="status">{{ toast.message() }}</div> }`,
})
export class StorefrontToastComponent {
  readonly toast = inject(StorefrontToastService);
}
