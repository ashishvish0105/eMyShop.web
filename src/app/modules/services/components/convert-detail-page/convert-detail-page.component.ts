import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-convert-detail-page',
  standalone: true,
  imports: [ButtonComponent, SectionTitleComponent, RouterOutlet],
  templateUrl: './convert-detail-page.component.html',
  styleUrl: './convert-detail-page.component.scss',
})
export class ConvertDetailPageComponent {}
