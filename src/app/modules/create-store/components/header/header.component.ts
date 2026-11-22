import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  registerClick = output<void>();
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(isOpen => !isOpen);
  }

  openRegister(): void {
    this.registerClick.emit();
    this.menuOpen.set(false);
  }
}
