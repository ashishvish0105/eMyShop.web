import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocalStarageService } from '../../../../../core/Comman/local-starage.service';

@Component({
  selector: 'app-side-bar-header',
  standalone: true,
  imports: [],
  templateUrl: './side-bar-header.component.html',
  styleUrl: './side-bar-header.component.scss',
})
export class SideBarHeaderComponent implements OnInit {
  routes = inject(Router);
  activeRoute = inject(ActivatedRoute)
  activeItemName = 'dashboard';
  isSideNavBarOpen = true;
  private localStarageService = inject(LocalStarageService)
  navItems: INavItem[] = [
    { routerLink: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { routerLink: 'orders', name: 'Orders', icon: 'shopping_bag' },
    { routerLink: 'products', name: 'Products', icon: 'inventory_2' },
    { routerLink: 'customers', name: 'Customers', icon: 'group' },
    // { routerLink: 'analytics', name: 'Analytics', icon: 'monitoring' },
    // { routerLink: 'marketing', name: 'Marketing', icon: 'campaign' },
    // { routerLink: 'integrations', name: 'Integrations', icon: 'hub' },
  ];

  ngOnInit(): void {

    // this.activeRoute
  }
    activeMenuItem(urlName: string) {
      console.log(urlName);
    // if (this.routes.url.includes(urlName)) {
      this.routes.navigate(["/","seller-Account",urlName]);
      console.log(urlName);
      this.activeItemName = urlName;
    // }
  }
  toggleSideNavBar() {
    console.log("toggleSideNavBar called");
    this.isSideNavBarOpen = !this.isSideNavBarOpen;

  }

  userLogOute() {
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('UserRegister');
    this.routes.navigateByUrl('/');
    this.localStarageService.clearLocalStorage();
  }

}
export interface INavItem {
  name: string;
  icon: string;
  active?: boolean;
  routerLink: string;
}
