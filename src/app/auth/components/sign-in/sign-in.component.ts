import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { UserType } from '../../models/user.model';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  @ViewChild('modal', { static: true }) modal!: ModalWindowComponent;

  private auth = inject(Auth);
  private user!: UserType;

  public isOkLoading = false;
  public registerForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    agree: new FormControl(true, { validators: [Validators.requiredTrue] }),
  });

  constructor(
    private changeDetection: ChangeDetectorRef,
    private firestoreService: FirestoreService,
    private notification: NzNotificationService
  ) {}

  public submitForm(): void {
    if (this.registerForm.valid) {
      this.collectUserData();
      const { email, password } = this.user;
      // signIn
      this.signUp(email, password);
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  private collectUserData(): void {
    if (this.registerForm.valid) {
      this.user = {
        firstName: this.registerForm.controls.firstName.value,
        lastName: this.registerForm.controls.lastName.value,
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
      };
    }
  }

  // registration
  signUp(email: string, password: string): void {
    this.isOkLoading = true;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        return this.firestoreService.setStartUserCollection(this.user);
      })
      .then(
        () => {
          this.isOkLoading = false;
          this.changeDetection.detectChanges();
          this.modal.handleCancel();
          this.notification.create('success', 'Registration', 'Successfully register');
        },
        (err: Error) => {
          this.notification.create('error', 'Registration', err.message);
          this.isOkLoading = false;
          this.changeDetection.detectChanges();
        }
      );
  }
}
