import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { IUser } from '../../models/user.model';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  @ViewChild('modal') modal!: ModalWindowComponent;

  private auth = inject(Auth);
  private user!: IUser;

  public isLoading = false;
  public registerForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.passwordConfirmValidator()],
    }),
    agree: new FormControl(true, { validators: [Validators.requiredTrue] }),
  });

  constructor(
    private changeDetection: ChangeDetectorRef,
    private firestoreService: FirestoreService,
    private notification: NzNotificationService
  ) {}

  public submitForm(): void {
    if (!this.registerForm.valid) {
      this.showErrorTips(this.registerForm.controls);
    } else {
      this.collectUserData();
      const { email, password } = this.user;
      this.signUp(email, password);
    }
  }

  private showErrorTips(controls: { [key: string]: FormControl<unknown> }): void {
    Object.values(controls).forEach((control) => {
      control.markAsDirty();
      if (control.invalid) {
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  private collectUserData(): void {
    this.user = {
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
    };
  }

  public signUp(email: string, password: string): void {
    this.isLoading = true;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        return this.firestoreService.setStartUserCollection(this.user);
      })
      .then(() => {
        this.isLoading = false;
        this.changeDetection.detectChanges();
        this.modal.handleCancel();
        this.notification.create('success', 'Registration', 'Successfully register');
      })
      .catch((err: Error) => {
        this.notification.create('error', 'Registration', err.message);
        this.isLoading = false;
        this.changeDetection.detectChanges();
      });
  }

  private passwordConfirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const password = this.registerForm.controls.password.value;
      const confirmPassword = this.registerForm.controls.confirmPassword.value;

      return !(password === confirmPassword) ? { notEqualPasswords: true } : null;
    };
  }
}
