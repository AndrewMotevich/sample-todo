import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { collectionData, collection, Firestore } from '@angular/fire/firestore';
import { tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public isOkLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    remember: new FormControl(true, [Validators.required]),
  });

  submitForm(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // should rewrite for authorization
  firestore = inject(Firestore);
  todoCollection = collection(this.firestore, 'todo');

  todos = () => collectionData(this.todoCollection).pipe(tap((res) => console.log(res)));

  getTodoCollection(): void {
    collectionData(this.todoCollection).subscribe((res) => console.log(res));
  }
}
