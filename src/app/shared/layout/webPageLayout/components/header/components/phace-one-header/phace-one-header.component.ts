import { localStorageObjName } from './../../../../../../../constVariable/localStorageObjName.const';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ButtonComponent } from '../../../../../../components/button/button.component';
import { LocalStarageService } from '../../../../../../../core/Comman/local-starage.service';
import { JwtDecodeService } from '../../../../../../../core/Comman/Jwt-decode.service';

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
  private localStarageService = inject(LocalStarageService);
  private JwtDecodeService = inject(JwtDecodeService);
  ngOnInit(): void {
    const currentUser = this.localStarageService.getObjLocalStorage(
      localStorageObjName.currentUserObj,
    );
    const accessToken = this.localStarageService.getLocalStorage(localStorageObjName.accessToken);
    const decodedToken = this.JwtDecodeService.getDecodedToken(accessToken);

    if (currentUser) {
      this.userDetail = {
        userName: currentUser.userName ?? currentUser.userNameAndEmail ?? 'User',
        userRoll: currentUser.userRoll ?? decodedToken?.role ?? 'Customer',
      };
      this.isUserLoggedIn = true;
    } else if (decodedToken) {
      this.userDetail = {
        userName: decodedToken.unique_name ?? 'User',
        userRoll: decodedToken.role ?? 'Customer',
      };
      this.isUserLoggedIn = true;
    }
  }

  userLogOute() {
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('UserRegister');
    this.isUserLoggedIn = false;
    this.routes.navigateByUrl('/');
    this.toggleProfileDetail();
    this.localStarageService.clearLocalStorage();
  }

  activeMenuItem(urlName: string) {
    if (this.routes.url.includes(urlName)) {
      this.routes.navigateByUrl(urlName);
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
