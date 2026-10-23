import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  search = '';
  notificationsOpen = false;

  searchAdmin(): void {
    this.router.navigate(['/seller-Account/products'], { queryParams: this.search.trim() ? { search: this.search.trim() } : {} });
  }
}
