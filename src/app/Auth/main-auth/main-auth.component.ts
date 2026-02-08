import { Component } from '@angular/core';
import { LoginComponent } from "../components/login/login.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-auth',
  standalone: true,
  imports:  [RouterOutlet],
  templateUrl: './main-auth.component.html',
  styleUrl: './main-auth.component.scss'
})
export class MainAuthComponent {

}
