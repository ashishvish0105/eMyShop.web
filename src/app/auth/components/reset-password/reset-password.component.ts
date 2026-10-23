import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [SectionTitleComponent, ButtonComponent, RouterLink, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  password = '';
  confirmPassword = '';
  updated = false;

  submit(): void {
    if (this.password.length < 8 || this.password !== this.confirmPassword) return;
    this.updated = true;
  }
}
