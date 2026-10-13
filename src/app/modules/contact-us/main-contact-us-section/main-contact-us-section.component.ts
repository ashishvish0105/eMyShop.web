import { Component } from '@angular/core';
import { BreadcumbComponent } from '../../../shared/components/breadcumb/breadcumb.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-main-contact-us-section',
  standalone: true,
  imports: [BreadcumbComponent, SectionTitleComponent, ButtonComponent],
  templateUrl: './main-contact-us-section.component.html',
  styleUrl: './main-contact-us-section.component.scss',
})
export class MainContactUsSectionComponent {}
