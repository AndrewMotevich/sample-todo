import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { collectionData, collection, Firestore } from '@angular/fire/firestore';
import { tap } from 'rxjs';
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

  constructor(private changeDetection: ChangeDetectorRef) {}

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl<boolean>(true, [Validators.required]),
  });

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
      (res) => {
        console.log(res);
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

  // firestore
  firestore = inject(Firestore);
  todoCollection = collection(this.firestore, 'todo');

  todos = () => collectionData(this.todoCollection).pipe(tap((res) => console.log(res)));

  getTodoCollection(): void {
    collectionData(this.todoCollection).subscribe((res) => console.log(res));
  }
}
