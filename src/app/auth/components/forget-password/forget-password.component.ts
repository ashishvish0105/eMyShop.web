import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [SectionTitleComponent, ButtonComponent, RouterLink, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email = '';
  submitted = false;

  submit(): void {
    this.submitted = true;
  }
}
