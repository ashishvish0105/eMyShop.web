import { Component } from '@angular/core';
import { SideBarHeaderComponent } from "../components/side-bar-header/side-bar-header.component";
import { HeaderComponent } from "../components/header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-router-outlat',
  standalone: true,
  imports: [SideBarHeaderComponent, HeaderComponent, RouterOutlet],
  templateUrl: './dashboard-router-outlat.component.html',
  styleUrl: './dashboard-router-outlat.component.scss'
})
export class DashboardRouterOutlatComponent {

}
