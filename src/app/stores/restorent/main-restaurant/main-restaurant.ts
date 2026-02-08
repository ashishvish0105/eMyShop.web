import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadProduct } from '../components/upload-product/upload-product';
@Component({
  selector: 'app-main-restaurant',
  imports: [ UploadProduct],
  templateUrl: './main-restaurant.html',
  styleUrl: './main-restaurant.scss',
})
export class MainRestaurant {

}
