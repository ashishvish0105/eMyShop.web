import { NgTemplateOutlet, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  viewChild,
  ViewChild,
} from '@angular/core';
import {
  Router,
  RouterLink,
  ɵEmptyOutletComponent,
  RouterModule,
} from '@angular/router';
import { ButtonComponent } from '../../../../../../components/button/button.component';

@Component({
  selector: 'app-phace-one-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent, RouterModule, NgTemplateOutlet],
  templateUrl: './phace-one-header.component.html',
  styleUrl: './phace-one-header.component.scss',
})
export class PhaceOneHeaderComponent {
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

  // menuName:string[]=["Home","Pages","Project","Models","Casting","Blog","Contact"];
  // menuNameList: any = [
  //   {
  //     menuId: 1,
  //     menuName: 'Product',
  //     routerLink: 'product',
  //   },
  //   {
  //     menuId: 2,
  //     menuName: 'News Feed',
  //     routerLink: 'newsFeed',
  //   },
  //   // {
  //   //   menuId: 1,
  //   //   menuName: 'Home',
  //   //   routerLink: 'home',
  //   // },
  //   // {
  //   //   menuId: 2,
  //   //   menuName: 'Page',
  //   //   isSubMenuList: true,
  //   //   subMenuList: [
  //   //     {
  //   //       subMenuId: 1,
  //   //       subMenuName: 'About Us',
  //   //     },
  //   //     {
  //   //       subMenuId: 2,
  //   //       subMenuName: 'Projects',
  //   //     },
  //   //     {
  //   //       subMenuId: 3,
  //   //       subMenuName: 'Models',
  //   //     },
  //   //     {
  //   //       subMenuId: 4,
  //   //       subMenuName: 'Casting',
  //   //     },
  //   //     {
  //   //       subMenuId: 5,
  //   //       subMenuName: 'Blog',
  //   //     },
  //   //     {
  //   //       subMenuId: 6,
  //   //       subMenuName: 'Blog Details',
  //   //     },
  //   //     {
  //   //       subMenuId: 7,
  //   //       subMenuName: 'Contact',
  //   //       routerLink: 'contactUs',
  //   //     },
  //   //     {
  //   //       subMenuId: 8,
  //   //       subMenuName: 'Contact',
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   menuId: 3,
  //   //   menuName: 'Document Hub',
  //   //   routerLink: 'documentHub',
  //   // },
  //   // {
  //   //   menuId: 4,
  //   //   menuName: 'Image Manager',
  //   //   routerLink: 'imageManager',
  //   // },
  //   // {
  //   //   menuId: 5,
  //   //   menuName: 'eShop',
  //   //   routerLink: 'eShop',
  //   //   isSubMenuList: true,
  //   //   subMenuList: [
  //   //     {
  //   //       subMenuId: 1,
  //   //       subMenuName: 'Food stole',
  //   //     },
  //   //   ]
  //   // },

  //   // {
  //   //   menuId: 6,
  //   //   menuName: 'Blog',
  //   //   routerLink: 'blog',
  //   // },
  //   {
  //     menuId: 7,
  //     menuName: 'Contact',
  //     routerLink: 'contactUs',
  //   },
  //   // {
  //   //   menuId: 4,
  //   //   menuName: 'User',
  //   //   routerLink: 'user',
  //   // },
  //   // {
  //   //   menuId: 5,
  //   //   menuName: 'profile',
  //   //   routerLink: 'profile',
  //   // },
  //   // {
  //   //   menuId: 5,
  //   //   menuName: 'Admin',
  //   //   routerLink: 'admin',
  //   // },
  //   // {
  //   //   menuId: 6,
  //   //   menuName: 'Dashboard',
  //   //   routerLink: 'dashboard',
  //   // },
  //   // {
  //   //   menuId: 3,
  //   //   menuName: 'Payment',
  //   //   routerLink: 'Payment',
  //   // },
  // ];

  ngOnInit(): void {
    // this.isUserLoggedIn =
    //   !!localStorage.getItem('UserRegister') ||
    //   !!localStorage.getItem('CurrentUser');
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
    this.routes.navigateByUrl('/');
    this.toggleProfileDetail()
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
