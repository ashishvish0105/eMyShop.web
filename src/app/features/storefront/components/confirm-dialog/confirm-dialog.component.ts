import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-storefront-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() icon = 'warning';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Confirm';
  @Output() cancelled = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
}
