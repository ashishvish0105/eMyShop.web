import { Component } from '@angular/core';
import { UserListComponent } from '../component/user-list/user-list.component';
import { RouterOutlet } from '@angular/router';
import { UserInfoComponent } from "../component/user-info/user-info.component";
import { ProfileDetailComponent } from "../component/profile-detail/profile-detail.component";

@Component({
  selector: 'app-main-section-user',
  standalone: true,
  imports: [UserListComponent, RouterOutlet, UserInfoComponent, ProfileDetailComponent],
  templateUrl: './main-section-user.component.html',
  styleUrl: './main-section-user.component.scss'
})
export class MainSectionUserComponent {

}
