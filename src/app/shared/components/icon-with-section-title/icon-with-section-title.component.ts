import { JsonPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-icon-with-section-title',
  standalone: true,
  imports: [RouterLink, JsonPipe],
  templateUrl: './icon-with-section-title.component.html',
  styleUrl: './icon-with-section-title.component.scss',
})
export class IconWithSectionTitleComponent implements OnInit,AfterViewInit {
  @Input({ alias: 'dataSources', required: false })
  dataSources!: IIconWithSectionTitleComponent ;
  @Output() clickHere = new EventEmitter<string>();

  constructor() {}
  clickHereHandler() {
    this.clickHere.emit();
  }

  ngOnInit(){
    console.log("app-icon-with-section-title");
    this.dataSources.description="default description";
    this.dataSources.title="default title";
  }
  ngAfterViewInit(){

  }
}

export interface IIconWithSectionTitleComponent {
  title: string;
  description: string;
}
