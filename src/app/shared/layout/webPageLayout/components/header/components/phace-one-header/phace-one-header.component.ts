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
    debugger;


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
