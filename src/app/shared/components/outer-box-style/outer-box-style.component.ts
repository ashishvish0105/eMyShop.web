import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-outer-box-style',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './outer-box-style.component.html',
  styleUrl: './outer-box-style.component.scss',
})
export class OuterBoxStyleComponent implements AfterContentInit {
  barWithAddButton: string | undefined;
  @Input() cardTitle = 'Profile containt';
  @Output() cardButton: ElementRef | undefined;
  @Output('addButtonMethod') addButtonEvent = new EventEmitter<any>();
  addButtonText: string = 'botton';
  @Input('inputBarWithAddButton') inputBarWithAddButton: string = 'default';

  typeOfbar = {
    onlyTitleBar: 'onlyTitleBar',
  };

  buttonEvent(event: any) {
    console.log(event);
  }

  ngAfterContentInit(): void {
    this.barWithAddButton = this.inputBarWithAddButton;
  }

  AddButton() {
    this.addButtonEvent.emit();
  }
}
