import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { logintype } from '../../../../../constVariable/user.const';
import { localStorageObjName } from '../../../../../constVariable/localStorageObjName.const';
import { LocalStarageService } from '../../../../../core/Comman/local-starage.service';
import { Router, RouterLink } from '@angular/router';
import { JwtDecodeService } from '../../../../../core/Comman/Jwt-decode.service';
import { CommonModule } from '@angular/common';
import { access } from 'fs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
    isUserLoggedIn: boolean = false;
    logoName: string = 'eMyshop';
    @ViewChild('headerScroll') headerScroll!: ElementRef;
    @ViewChild('viewProfileLoginDetail') viewProfileLoginDetail!: ElementRef;
    isProfileModelOpen: boolean = false;
    activeItemName: string = '';
      activeMenu = 'Personal Profile';
    isMobileMenuOpen: boolean = false;

    userDetail: UserDetailModel = {
      userName: 'ashish0111',
      userRoll: 'Devloper',
    };

    private routes = inject(Router);
    private localStarageService = inject(LocalStarageService);
    private JwtDecodeService = inject(JwtDecodeService);

    menuNameList: any = [
      {
        menuId: 1,
        menuName: 'Product',
        routerLink: 'product',
         access: logintype.customer,
      },
      {
        menuId: 2,
        menuName: 'News Feed',
        routerLink: 'newsFeed',
         access: logintype.customer,
      },
      {
        menuId: 3,
        menuName: 'Contact',
        routerLink: 'contactUs',
         access: logintype.customer,
      },
    ];

    menuSections: MenuSection[] = [
  {
    title: 'My Account',
    items: [
      { name: 'Personal Profile',routerLink:'profile', icon: 'fa-regular fa-user' },
      { name: 'My Orders', routerLink:'my-oorders', icon: 'fa-solid fa-bag-shopping', badge: '3 Active' },
      { name: 'Wishlist', routerLink:'wishlist', icon: 'fa-regular fa-heart', badge: '12' },
      { name: 'Saved Addresses', routerLink:'saved-addresses', icon: 'fa-solid fa-location-dot' },
      { name: 'Payment Methods', routerLink:'payment', icon: 'fa-regular fa-credit-card' }
    ]
  },
  {
    title: 'Shopping & Orders',
    items: [
      { name: 'My Shopping Cart', routerLink:'my-shopping', icon: 'fa-solid fa-cart-shopping', badge: '4 items' },
      { name: 'Track Active Order', routerLink:'order', icon: 'fa-solid fa-truck-fast' },
      { name: 'Returns & Refunds', routerLink:'return-refunds', icon: 'fa-solid fa-rotate-left' },
      { name: 'Coupons & Special Promos', routerLink:'offers', icon: 'fa-solid fa-tags', badge: '2 New!' }
    ]
  },
  {
    title: 'Preferences & Support',
    items: [
      { name: 'Notifications', routerLink:'notifications', icon: 'fa-regular fa-bell' },
      { name: '24/7 Customer Care', routerLink:' customer-care', icon: 'fa-solid fa-headset' },
      { name: 'Security & Preferences', routerLink:'security', icon: 'fa-solid fa-gear' }
    ]
  }
];

  constructor(private _LocalStarageService:LocalStarageService) {}

  ngOnInit() {
    const userRoles: unknown = this._LocalStarageService.getObjLocalStorage(
      localStorageObjName.userRoles,
    );
    const legacyUser = this._LocalStarageService.getObjLocalStorage(
      localStorageObjName.currentUserObj,
    );
    const loginType = Array.isArray(userRoles)
      && userRoles.some(
        (role): role is string =>
          typeof role === 'string' && role.toLowerCase() === logintype.customer,
      )
      ? logintype.customer
      : legacyUser?.loginType;

    switch (loginType) {
      case logintype.seller:
        this.menuNameList.filter((menu: any) => {
          if (menu.access === logintype.seller) {
            return menu;
          }
        });
        break;
      case logintype.customer:
        this.menuNameList.filter((menu: any) => {
          if (menu.access === logintype.customer) {
            return menu;
          }
        });
    }

    const decodedToken = this.localStarageService.getObjLocalStorage(localStorageObjName.accessToken);
    const currentUser = this.JwtDecodeService.getDecodedToken(decodedToken);

    if(currentUser){
        this.userDetail.userName = currentUser.email;
        this.userDetail.userRoll = currentUser.role;
        this.isUserLoggedIn = true;
      }
  }

  userLogOute(isUserLoggedIn:boolean) {
    if(isUserLoggedIn){
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('UserRegister');

    this.isUserLoggedIn = false;
    this.isProfileModelOpen = false;

    this.localStarageService.clearLocalStorage();

    this.routes.navigateByUrl('/');
    }else{
        this.routes.navigateByUrl('/login');
    }

  }

  activeMenuItem(urlName: string) {
    this.activeItemName = urlName;
    this.routes.navigateByUrl('/' + urlName);
  }

  toggleProfileDetail() {
    this.isProfileModelOpen = !this.isProfileModelOpen;
  }
   selectMenu(menu: string,routerLink:String): void {
    this.activeMenu = menu;
    this.routes.navigate(['/','account',routerLink])
  }
}

export interface UserDetailModel {
  userName: string;
  userRoll: string;
}


interface Category {
  title: string;
  link: string;
  className: string;
  image: string;
}

interface MenuItem {
  routerLink:string;
  name: string;
  icon: string;
  badge?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}
