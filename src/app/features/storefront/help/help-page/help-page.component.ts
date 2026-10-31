import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorefrontToastService } from '../../toast.service';

@Component({
  selector: 'app-help-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './help-page.component.html',
})
export class HelpPageComponent {
  private readonly toast = inject(StorefrontToastService);

  contactSupport(): void {
    this.toast.show('Our support team is ready to help at help@foodiedash.example.');
  }
}
