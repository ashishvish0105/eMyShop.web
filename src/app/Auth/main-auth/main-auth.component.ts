import { Component } from '@angular/core';
import { LoginComponent } from "../components/login/login.component";

@Component({
  selector: 'app-main-auth',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './main-auth.component.html',
  styleUrl: './main-auth.component.scss'
})
export class MainAuthComponent {

}
