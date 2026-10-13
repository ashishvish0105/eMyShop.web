import { Component } from '@angular/core';
import { IconWithSectionTitleComponent, IIconWithSectionTitleComponent } from '../../../../shared/components/icon-with-section-title/icon-with-section-title.component';
import { BreadcumbComponent } from "../../../../shared/components/breadcumb/breadcumb.component";

@Component({
  selector: 'app-initial-page',
  standalone: true,
  imports: [IconWithSectionTitleComponent, BreadcumbComponent],
  templateUrl: './initial-page.component.html',
  styleUrl: './initial-page.component.scss'
})
export class InitialPageComponent {
dataSourcesObj!: IIconWithSectionTitleComponent;
  pdfConvertingList:IIconWithSectionTitleComponent[] = [
    {
      title: 'convert pdf to image',
      description: 'you convert any type document into pdf',
    },
    {
      title: 'convert pdf To excel',
      description: 'you convert any type document into pdf',
    },
    {
      title: 'convert pdf To text file',
      description: 'you convert any type document into pdf',
    },
    {
      title: 'convert pdf to ppt',
      description: 'you convert any type document into pdf',
    },
    {
      title: 'convert pdf To word file',
      description: 'you convert any type document into pdf',
    },
  ];
  ngOnInit(): void {
    this.dataSourcesObj = {
      title: 'convert To pdf',
      description: 'you convert any type document into pdf',
    };
  }
}
