import { Component, OnInit } from '@angular/core';
import { access } from 'fs';
import { logintype } from '../../../../../constVariable/user.const';
import { LocalStarageService } from '../../../../../services/local-starage.service';
import { PhaceOneHeaderComponent } from './components/phace-one-header/phace-one-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PhaceOneHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  displayMenu: [] = [];
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
    {
      menuId: 4,
      menuName: 'dashboard',
      routerLink: 'dashboard',
      access: logintype.seller,
    },
    {
      menuId: 5,
      menuName: 'Product',
      routerLink: 'product',
      access: logintype.seller,
    },
  ];

  constructor(private _LocalStarageService:LocalStarageService) {}

  ngOnInit() {
    const userType = this._LocalStarageService.getLocalStorage('CurrentUser');
    switch (userType.loginType) {
      case logintype.seller:
        this.displayMenu = this.menuNameList.filter((menu: any) => {
          if (menu.access === logintype.seller) {
            return menu;
          }
        });
        break;
      case logintype.customer:
        this.displayMenu = this.menuNameList.filter((menu: any) => {
          if (menu.access === logintype.customer) {
            return menu;
          }
        });
    }
  }
}
