import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { logintype } from '../../../../../constVariable/user.const';
import { localStorageObjName } from '../../../../../constVariable/localStorageObjName.const';
import { LocalStarageService } from '../../../../../core/Comman/local-starage.service';
import { Router } from '@angular/router';
import { JwtDecodeService } from '../../../../../core/Comman/Jwt-decode.service';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
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
    @Input() displayMenu: any;

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

          const currentUser = this.localStarageService.getObjLocalStorage(
        localStorageObjName.currentUserObj,
      );
       const decodedToken = this.JwtDecodeService.getDecodedToken(currentUser);
      console.log(decodedToken);
      if(currentUser){
        this.userDetail = currentUser;
        this.isUserLoggedIn = true;
        this.userDetail.userRoll = currentUser.userRoll;
      }
  }




    userLogOute() {
      localStorage.removeItem('CurrentUser');
      localStorage.removeItem('UserRegister');
      this.isUserLoggedIn = false;
      this.routes.navigateByUrl('/');
      this.toggleProfileDetail()
      this.localStarageService.clearLocalStorage();
    }

    activeMenuItem(urlName: string) {
        console.log(urlName);
      if (this.routes.url.includes(urlName)) {
        this.routes.navigateByUrl(urlName);
        console.log(urlName);
        this.activeItemName = urlName;
      }
    }

    toggleProfileDetail() {
      this.isProfileModelOpen = !this.isProfileModelOpen;
    }
  }


  export interface UserDetailModel {
    userName: string;
    userRoll: string;
  }
