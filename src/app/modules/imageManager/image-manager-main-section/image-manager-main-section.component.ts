import { Component } from '@angular/core';
import { IIconWithSectionTitleComponent, IconWithSectionTitleComponent } from '../../../shared/components/icon-with-section-title/icon-with-section-title.component';
import { BreadcumbComponent } from "../../../shared/components/breadcumb/breadcumb.component";

@Component({
  selector: 'app-image-manager-main-section',
  standalone: true,
  imports: [IconWithSectionTitleComponent, BreadcumbComponent],
  templateUrl: './image-manager-main-section.component.html',
  styleUrl: './image-manager-main-section.component.scss'
})
export class ImageManagerMainSectionComponent {
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
