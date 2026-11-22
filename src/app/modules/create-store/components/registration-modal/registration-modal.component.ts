import {
  Component,
  input,
  output,
  effect
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-registration-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-modal.component.html',
  styleUrl: './registration-modal.component.scss'
})
export class RegistrationModalComponent {

  visible = input<boolean>(false);
  closed = output<void>();

  submitted = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.registerForm = this.fb.group({
      shopName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['Grocery & Specialty Food', Validators.required],
      fulfillment: ['Delivery & Store Pickup', Validators.required]
    });

    effect(() => {
      if (this.visible()) {
        this.submitted = false;

        this.registerForm.reset({
          shopName: '',
          email: '',
          category: 'Grocery & Specialty Food',
          fulfillment: 'Delivery & Store Pickup'
        });
      }
    });
  }

  onSubmit(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log('Shop Registration:', this.registerForm.value);

    this.submitted = true;
  }

  close(): void {
    this.closed.emit();
  }
}
