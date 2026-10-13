
import { Component, Inject, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss',
})
export class ProfileDetailComponent {
  // route:Router = Inject(Router);

  constructor(private route:Router) {}

  userProfile() {
    this.route.navigate(["/","user","edit"])
  }
}
