import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private auth = inject(Auth);

  public isOkLoading = false;
  public loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl<boolean>(true, [Validators.required]),
  });

  constructor(private changeDetection: ChangeDetectorRef) {}

  submitForm(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      // signIn
      email && password && this.signIn(email, password);
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // authentication
  signIn(email: string, password: string): void {
    this.isOkLoading = true;
    signInWithEmailAndPassword(this.auth, email, password).then(
      () => {
        this.isOkLoading = false;
        this.changeDetection.detectChanges();
      },
      (err) => {
        // TODO: add user error notification
        console.log(err);
        this.isOkLoading = false;
        this.changeDetection.detectChanges();
      }
    );
  }
}
