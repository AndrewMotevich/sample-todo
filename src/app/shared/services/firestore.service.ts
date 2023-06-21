import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  deleteDoc,
  collectionSnapshots,
  addDoc,
  setDoc,
  collectionGroup,
} from '@angular/fire/firestore';
import { LoginService } from './login.service';
import { UserType } from 'src/app/auth/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { TodoType } from 'src/app/todo/models/todo.model';

const startTodos = {
  todo: { title: 'New TODO', description: 'Add new todo', start: Date.now(), end: null },
  inProgress: { title: 'Features', description: 'Check all features of this app', start: Date.now(), end: null },
  done: { title: 'Sing Up', description: 'Sign Up to this app', start: Date.now(), end: Date.now() },
};

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private userEmail!: string;
  private firestore = inject(Firestore);
  private todoObserver = new BehaviorSubject<TodoType[]>([]);
  private inProgressObserver = new BehaviorSubject<TodoType[]>([]);
  private doneObserver = new BehaviorSubject<TodoType[]>([]);

  constructor(private loginService: LoginService) {
    this.loginService.userEmail.subscribe(() => {
      this.userEmail = this.loginService.getUser()?.email || '';
      // subscribe on todoCollection
      collectionSnapshots(collectionGroup(this.firestore, `todo:${this.userEmail}`)).subscribe((res) => {
        return this.todoObserver.next(res.map((elem) => ({ ...(elem.data() as TodoType), id: elem.id })));
      });
      // subscribe on inProgressCollection
      collectionSnapshots(collectionGroup(this.firestore, `inProgress:${this.userEmail}`)).subscribe((res) => {
        return this.inProgressObserver.next(res.map((elem) => ({ ...(elem.data() as TodoType), id: elem.id })));
      });
      // subscribe on doneCollection
      collectionSnapshots(collectionGroup(this.firestore, `done:${this.userEmail}`)).subscribe((res) => {
        return this.doneObserver.next(res.map((elem) => ({ ...(elem.data() as TodoType), id: elem.id })));
      });
    });
  }

  public getTodoCollection() {
    return this.todoObserver;
  }

  public getInProgressCollection() {
    return this.inProgressObserver;
  }

  public getDoneCollection() {
    return this.doneObserver;
  }

  public addTodo() {
    // TODO:
    addDoc(collection(this.firestore, ''), {});
  }

  public deleteTodo(id: string) {
    // TODO:
    deleteDoc(doc(this.firestore, ''));
  }

  public setStartUserCollection(user: UserType): void {
    if (this.loginService.getUser()) {
      const { firstName, lastName, email } = user;
      setDoc(doc(this.firestore, 'users', email), { firstName, lastName });
      addDoc(collection(this.firestore, `users/${email}/todo:${email}`), startTodos.todo);
      addDoc(collection(this.firestore, `users/${email}/inProgress:${email}`), startTodos.inProgress);
      addDoc(collection(this.firestore, `users/${email}/done:${email}`), startTodos.done);
    } else {
      // TODO: add user friendly error notification
      console.log('Error with authorization');
    }
  }
}
