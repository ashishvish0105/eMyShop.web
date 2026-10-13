import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emy-buttons',
  standalone: true,
  imports: [],
  templateUrl: './emy-buttons.component.html',
  styleUrl: './emy-buttons.component.scss'
})
export class EmyButtonsComponent {
  @Input() buttonType:string= 'secondary';
  @Input() label:string= 'Add Product';
  @Input() buttonIcon:string = 'add';
  @Input() cssClass:string ='eMy-primary';
  @Input() isActive :boolean= true;
  @Input() button: IeMyButton =
  {
    buttonType: 'secondary',
    label: 'Add Product',
    buttonIcon: 'add',
    cssClass:'eMy-primary',
    isActive: true,
  }

  ngOnInit():void{
    this.buttonType = this.button.buttonType;
    this.label = this.button.label;
    this.buttonIcon = this.button.buttonIcon;
    this.cssClass = this.button.cssClass;
    this.isActive = this.button.isActive;
  }

}

export interface IeMyButton {
  buttonType: 'primary' | 'secondary';
  label: string;
  buttonIcon: string;
  cssClass: string;
  isActive: boolean;
}

export interface Button {
  buttonType: 'primary' | 'secondary';
  label: string;
  buttonIcon: string;
  cssClass: string;
  isActive: boolean;
}

