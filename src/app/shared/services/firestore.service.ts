import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
  setDoc,
} from '@angular/fire/firestore';
import { LoginService } from './login.service';
import { UserType } from 'src/app/auth/models/user.model';

const startTodos = {
  todo: { title: 'New TODO', description: 'Add new todo', start: Date.now(), end: null },
  inProgress: { title: 'Features', description: 'Check all features of this app', start: Date.now(), end: null },
  done: { title: 'Sing Up', description: 'Sign Up to this app', start: Date.now(), end: Date.now() },
};

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private firestore = inject(Firestore);

  constructor(private loginService: LoginService) {}

  public getUserCollection() {
    if (this.loginService.getUser()) {
      const userEmail = this.loginService.getUser()?.email || '';
      const userTodoCollection = collection(this.firestore, `users/${userEmail}/todo`);
      collectionData(userTodoCollection).subscribe((res) => {
        console.log(res);
      });
      const userInProgressCollection = collection(this.firestore, `users/${userEmail}/inProgress`);
      collectionData(userInProgressCollection).subscribe((res) => {
        console.log(res);
      });
      const userDoneCollection = collection(this.firestore, `users/${userEmail}/done`);
      collectionData(userDoneCollection).subscribe((res) => {
        console.log(res);
      });
    } else {
      // TODO: add user friendly error notification
      console.log('Error with authorization');
    }
  }

  setStartUserCollection(user: UserType) {
    if (this.loginService.getUser()) {
      const { firstName, lastName, email } = user;
      setDoc(doc(this.firestore, 'users', email), { firstName, lastName });
      addDoc(collection(this.firestore, `users/${email}/todo`), startTodos.todo);
      addDoc(collection(this.firestore, `users/${email}/inProgress`), startTodos.inProgress);
      addDoc(collection(this.firestore, `users/${email}/done`), startTodos.done);
    } else {
      // TODO: add user friendly error notification
      console.log('Error with authorization');
    }
  }
}
