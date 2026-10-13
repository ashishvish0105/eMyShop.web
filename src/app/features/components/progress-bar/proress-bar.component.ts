import { DecimalPipe } from '@angular/common';
import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [DecimalPipe ],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() progressPercentage:number = 90;
  @Input() progressNumber?:number;
  @Input() progressBgColor:string= "red";
  @Input() progressTitle:string = "Electronics";

}
