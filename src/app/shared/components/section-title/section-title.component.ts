import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  Input,
  Renderer2,
  ViewChild,
  viewChild,
  ViewChildren,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent implements AfterViewInit {
  @Input() class: string = '';
  @Input() TitleName: string = 'Contact Us';
  @Input() Description: string =
    ' Lorem ipsum dolor sit amet, consetetur sadipscing esed diam nonumy eirmod tempor invidunt ut labore et dolore magna.';
  @ViewChild('sectionTitleBox',{static:true}) sectionTitleBox!: ElementRef;
  constructor(private rander: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.class && this.class.trim()) {
      this.class.split(' ').forEach(className => {
        if (className.trim()) {
          this.rander.addClass(this.sectionTitleBox.nativeElement, className.trim());
        }
      });
    }
  }
}
