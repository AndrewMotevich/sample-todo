import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @ViewChild('modal', { static: true }) modal!: ModalWindowComponent;

  private auth = inject(Auth);

  public isOkLoading = false;
  public loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl<boolean>(true, [Validators.required]),
  });

  constructor(private changeDetection: ChangeDetectorRef, private notification: NzNotificationService) {}

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
        this.modal.handleCancel();
        this.notification.create('success', 'Authentication', 'Successfully logged in');
      },
      (err: Error) => {
        this.notification.create('error', 'Authentication', err.message);
        this.isOkLoading = false;
        this.changeDetection.detectChanges();
      }
    );
  }
}
