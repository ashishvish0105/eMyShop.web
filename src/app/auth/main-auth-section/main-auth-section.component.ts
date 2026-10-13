import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-auth-section',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-auth-section.component.html',
  styleUrl: './main-auth-section.component.scss',
})
export class MainAuthSectionComponent implements OnInit {
  ngOnInit(): void {
    console.log('login initialized');
  }
}
