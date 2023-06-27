import { FormControl } from '@angular/forms';

export function showErrorTips(controls: { [key: string]: FormControl<unknown> }): void {
  Object.values(controls).forEach((control) => {
    control.markAsDirty();
    if (control.invalid) {
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
}
