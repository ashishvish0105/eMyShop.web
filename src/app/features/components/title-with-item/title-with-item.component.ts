import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title-with-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-with-item.component.html',
  styleUrl: './title-with-item.component.scss'
})
export class TitleWithItemComponent {
  @Input() sectionTitleName:'withoutTitle' | 'withTitle' = 'withTitle';
  @Input() titleName : string = 'default title';
  @Input() titleUnderline:boolean=false;
}
