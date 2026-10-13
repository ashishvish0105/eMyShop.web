import { NgTemplateOutlet, JsonPipe } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-simple-header',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet, JsonPipe],
  templateUrl: './simple-header.component.html',
  styleUrl: './simple-header.component.scss',
})
export class SimpleHeaderComponent {
  isUserLoggedIn: boolean = false;
  logoName: string = 'eMyshop';
  @ViewChild('headerScroll') headerScroll!: ElementRef;
  activeItemName: string = '';
  // menuName:string[]=["Home","Pages","Project","Models","Casting","Blog","Contact"];
  menuNameList: any = [
    {
      menuId: 1,
      menuName: 'Product',
      routerLink: 'product',
    },
    {
      menuId: 2,
      menuName: 'News Feed',
      routerLink: 'newsFeed',
    },
    // {
    //   menuId: 1,
    //   menuName: 'Home',
    //   routerLink: 'home',
    // },
    // {
    //   menuId: 2,
    //   menuName: 'Page',
    //   isSubMenuList: true,
    //   subMenuList: [
    //     {
    //       subMenuId: 1,
    //       subMenuName: 'About Us',
    //     },
    //     {
    //       subMenuId: 2,
    //       subMenuName: 'Projects',
    //     },
    //     {
    //       subMenuId: 3,
    //       subMenuName: 'Models',
    //     },
    //     {
    //       subMenuId: 4,
    //       subMenuName: 'Casting',
    //     },
    //     {
    //       subMenuId: 5,
    //       subMenuName: 'Blog',
    //     },
    //     {
    //       subMenuId: 6,
    //       subMenuName: 'Blog Details',
    //     },
    //     {
    //       subMenuId: 7,
    //       subMenuName: 'Contact',
    //       routerLink: 'contactUs',
    //     },
    //     {
    //       subMenuId: 8,
    //       subMenuName: 'Contact',
    //     },
    //   ],
    // },
    // {
    //   menuId: 3,
    //   menuName: 'Document Hub',
    //   routerLink: 'documentHub',
    // },
    // {
    //   menuId: 4,
    //   menuName: 'Image Manager',
    //   routerLink: 'imageManager',
    // },
    // {
    //   menuId: 5,
    //   menuName: 'eShop',
    //   routerLink: 'eShop',
    //   isSubMenuList: true,
    //   subMenuList: [
    //     {
    //       subMenuId: 1,
    //       subMenuName: 'Food stole',
    //     },
    //   ]
    // },

    // {
    //   menuId: 6,
    //   menuName: 'Blog',
    //   routerLink: 'blog',
    // },
    {
      menuId: 7,
      menuName: 'Contact',
      routerLink: 'contactUs',
    },
    // {
    //   menuId: 4,
    //   menuName: 'User',
    //   routerLink: 'user',
    // },
    // {
    //   menuId: 5,
    //   menuName: 'profile',
    //   routerLink: 'profile',
    // },
    // {
    //   menuId: 5,
    //   menuName: 'Admin',
    //   routerLink: 'admin',
    // },
    // {
    //   menuId: 6,
    //   menuName: 'Dashboard',
    //   routerLink: 'dashboard',
    // },
    // {
    //   menuId: 3,
    //   menuName: 'Payment',
    //   routerLink: 'Payment',
    // },
  ];
  private route = inject(Router);

  ngOnInit(): void {
    this.isUserLoggedIn =
      !!localStorage.getItem('UserRegister') ||
      !!localStorage.getItem('CurrentUser');

    //   document.addEventListener('scroll', ($event) => {
    //     if (window.pageYOffset > 50) {
    //        ;
    //       // console.log('hello');
    //       this.headerScroll.nativeElement.classList.add('header-scroll');
    //     } else {
    //       this.headerScroll.nativeElement.classList.remove('header-scroll');
    //     }
    //   });
    //   // throw new Error('Method not implemented.');
  }
  userLogOute() {
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('UserRegister');
    this.isUserLoggedIn = false;
  }
  activeMenuItem(urlName: string) {
    if (this.route.url.includes(urlName)) {
      this.activeItemName = urlName;
    }
  }
}
