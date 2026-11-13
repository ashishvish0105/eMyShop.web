import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MyAccountComponent } from '../../../modules/my-account/my-account.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [FooterComponent, RouterModule, HeaderComponent, MyAccountComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
