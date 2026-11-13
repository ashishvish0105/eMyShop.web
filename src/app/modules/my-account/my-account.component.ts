import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {

  drawerOpen = true;
  isLoggedIn = true;
  showSignOutModal = false;

  activeMenu = 'Personal Profile';

  categories: Category[] = [
    {
      title: 'MEN COLLECTIONS',
      link: "Explore Men's",
      className: 'men-card',
      image: 'assets/images/men-shoes.png'
    },
    {
      title: 'WOMEN COLLECTIONS',
      link: "Explore Women's",
      className: 'women-card',
      image: 'assets/images/women-shoes.png'
    },
    {
      title: 'SPORTS & PERFORMANCE',
      link: 'Explore Sports',
      className: 'sports-card',
      image: 'assets/images/sports-shoes.png'
    }
  ];

  menuSections: MenuSection[] = [
    {
      title: 'My Account',
      items: [
        { name: 'Personal Profile', icon: 'bi-person' },
        { name: 'My Orders', icon: 'bi-bag', badge: '3 Active' },
        { name: 'Wishlist', icon: 'bi-heart', badge: '12' },
        { name: 'Saved Addresses', icon: 'bi-geo-alt' },
        { name: 'Payment Methods', icon: 'bi-credit-card' }
      ]
    },
    {
      title: 'Shopping & Orders',
      items: [
        { name: 'My Shopping Cart', icon: 'bi-cart', badge: '4 items' },
        { name: 'Track Active Order', icon: 'bi-truck' },
        { name: 'Returns & Refunds', icon: 'bi-arrow-repeat' },
        { name: 'Coupons & Special Promos', icon: 'bi-tag', badge: '2 New!' }
      ]
    },
    {
      title: 'Preferences & Support',
      items: [
        { name: 'Notifications', icon: 'bi-bell' },
        { name: '24/7 Customer Care', icon: 'bi-headset' },
        { name: 'Security & Preferences', icon: 'bi-gear' }
      ]
    }
  ];

  openDrawer(): void {
    this.drawerOpen = true;
  }

  closeDrawer(): void {
    this.drawerOpen = false;
  }

  toggleAuth(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  selectMenu(menu: string): void {
    this.activeMenu = menu;
  }

  signOut(): void {
    if (!this.isLoggedIn) {
      this.toggleAuth();
      return;
    }

    this.showSignOutModal = true;
  }

  cancelSignOut(): void {
    this.showSignOutModal = false;
  }

  confirmSignOut(): void {
    this.showSignOutModal = false;
    this.isLoggedIn = false;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.showSignOutModal) {
        this.cancelSignOut();
      } else {
        this.closeDrawer();
      }
    }
  }
}


interface Category {
  title: string;
  link: string;
  className: string;
  image: string;
}

interface MenuItem {
  name: string;
  icon: string;
  badge?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}
