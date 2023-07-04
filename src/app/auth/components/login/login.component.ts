import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { showErrorTips } from '../../utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @ViewChild('modal') modal!: ModalWindowComponent;

  public isLoading = false;
  public loginForm = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor(
    private auth: Auth,
    private changeDetection: ChangeDetectorRef,
    private notification: NzNotificationService
  ) {}

  public submitForm(): void {
    if (!this.loginForm.valid) {
      showErrorTips(this.loginForm.controls);
      return;
    }
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    this.signIn(email, password);
  }

  public signIn(email: string, password: string): void {
    this.isLoading = true;
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.isLoading = false;
        this.changeDetection.detectChanges();
        this.modal.handleCancel();
        this.notification.create('success', 'Authentication', 'Successfully logged in');
      })
      .catch((err: Error) => {
        this.notification.create('error', 'Authentication', err.message);
        this.isLoading = false;
        this.changeDetection.detectChanges();
      });
  }
}
