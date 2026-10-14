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

  ngOnInit(): void {
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
