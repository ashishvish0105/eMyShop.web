import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  signal,
  ViewChild,
  viewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements AfterViewInit {
  // @Input('setSwitchValue') IsCheckBox = signal<boolean>(false);
  @Input('setSwitchValue') IsCheckBox :boolean =false;
  @Input() buttonText: string = 'Button';
  @Input() buttonType: "button"|"submit" | "reset"= 'button';
  // @Input() buttonType: buttonTypes[] = 'button';
  @Input({ alias: 'buttonName', required: false }) buttonName : "switchBtn" | "asBtnSecondry" | "asBtnPrimary" | "asBtnDanger" | "asBtnWhite" | "asBtnInfo" | "asBtnSuccess" | "default"="default";
  @Input() smallSize: boolean = false;
  @Input() disabled: boolean = false;
  // @Input('setSwitchValue') setSwitchValue: boolean = false;
  @Output() switchEvent = new EventEmitter<boolean>();

  // className = {
  //   bgWhite: 'asBtnWhite',
  //   bgPrimarty: 'asBtnPrimary',
  // };
  // // buttonName = {};
  // SizeName = {
  //   bigButton: 'btn-big',
  //   smButton: 'btn-small',
  // };

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // this.IsCheckBox.set(this.IsCheckBox());
  }

  checkEventCall() {

    if (this.IsCheckBox) {
      this.switchEvent.emit(false);
    } else {
      this.switchEvent.emit(true);
    }
  }
}

interface buttonTypes{
  value:["button","submite"]
}
