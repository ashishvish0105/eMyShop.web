import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  output,
} from '@angular/core';
import { PaymentMethod } from '../../../../../../interface/modules/my-account/payment-method.model';

@Component({
  selector: 'app-payment-method-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-method-card.component.html',
  styleUrl: './payment-method-card.component.scss',
})
export class PaymentMethodCardComponent {
  // readonly method = input.required<PaymentMethod>();

@Input({ required: true }) method!: PaymentMethod;

  readonly makeDefault = output<string>();
  readonly removeMethod = output<string>();
  readonly editMethod = output<string>();

  onMakeDefault(): void {
    this.makeDefault.emit(this.method.id);
  }

  onRemove(): void {
    this.removeMethod.emit(this.method.id);
  }

  onEdit(): void {
    this.editMethod.emit(this.method.id);
  }
}
