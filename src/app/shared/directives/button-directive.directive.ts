import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonDirective]',
  standalone: true
})
export class ButtonDirectiveDirective {
  // @HostBinding("class") buttonPrimary= "btn btn-primary"
  // constructor(private element:ElementRef,private rander:Renderer2) { }

  // @HostListener("click") clickEvent(){
  //   this.buttonPrimary="btn-secondary"
  //   console.log("hello");

  //   // this.element.nativeElement.style.color="red"
  //   // this.rander.setStyle(this.element.nativeElement,"color","red")
  // }

  // countMEthod(){
  //   console.log("count")
  // }

}
