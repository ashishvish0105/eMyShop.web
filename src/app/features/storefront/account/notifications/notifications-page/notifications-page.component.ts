import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CustomerAccountService } from '../../../auth/customer-account.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './notifications-page.component.html',
})
export class NotificationsPageComponent {
  readonly account = inject(CustomerAccountService);
}
