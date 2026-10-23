import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LocalStarageService } from '../../../../../core/Comman/local-starage.service';

@Component({
  selector: 'app-side-bar-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar-header.component.html',
  styleUrl: './side-bar-header.component.scss',
})
export class SideBarHeaderComponent {
  private readonly router = inject(Router);
  private readonly localStarageService = inject(LocalStarageService);
  readonly navItems: INavItem[] = [
    { routerLink: '/seller-Account/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { routerLink: '/seller-Account/orders', name: 'Orders', icon: 'shopping_bag' },
    { routerLink: '/seller-Account/products', name: 'Menu', icon: 'restaurant_menu' },
    { routerLink: '/seller-Account/customers', name: 'Customers', icon: 'group' },
    { routerLink: '/seller-Account/inventory', name: 'Inventory', icon: 'inventory_2' },
    { routerLink: '/seller-Account/reports', name: 'Reports', icon: 'monitoring' },
    { routerLink: '/seller-Account/settings', name: 'Settings', icon: 'settings' },
  ];

  userLogOute() {
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('UserRegister');
    this.router.navigateByUrl('/auth/login');
    this.localStarageService.clearLocalStorage();
  }
}
export interface INavItem {
  name: string;
  icon: string;
  active?: boolean;
  routerLink: string;
}
