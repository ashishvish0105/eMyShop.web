import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { routes } from './app.routes';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,MatSlideToggleModule,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DemoProject';
  TwoWayBingData="hellow"

  getValueInput(InputRef:any){

    console.log(InputRef.value);
  }

  TwoWayBingDataEvent(){
    this.TwoWayBingData = "hello, how I can help you";
  }
}
