import {
  AbstractControl,
  ValidationErrors
} from '@angular/forms';


export function requiredArrayValidator(
  control: AbstractControl
): ValidationErrors | null {

  const value = control.value;


  if (
    !Array.isArray(value) ||
    value.length === 0
  ) {

    return {
      requiredArray: true
    };

  }


  return null;
}
