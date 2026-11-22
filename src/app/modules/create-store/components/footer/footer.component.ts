import { Component, output} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 registerClicked = output<void>();

  openRegistration(): void {
    this.registerClicked.emit();
  }
}
