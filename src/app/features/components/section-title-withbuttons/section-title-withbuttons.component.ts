import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-title-withbuttons',
  standalone: true,
  imports: [],
  templateUrl: './section-title-withbuttons.component.html',
  styleUrl: './section-title-withbuttons.component.scss',
})
export class SectionTitleWithbuttonsComponent{
  title: string = "";
  titleDescription: string = "";

  @Input() sectionTitle: string = "";
  @Input() description: string = "";

  @Input() sectionTitleInfo:sectionTitleInfo= {
    title :'Default Title',
    description: 'Define the decription of default title'
  }

  ngOnInit(): void{
    this.title = this.sectionTitle || this.sectionTitleInfo.title;
    this.titleDescription = this.description || this.sectionTitleInfo.description;
  }
}


export interface sectionTitleInfo{
  title :string,
  description: string
}
