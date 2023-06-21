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
import { TodoItemType } from 'src/app/todo/models/todo-item.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CollectionNameType } from '../models/colection-name.model';

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
  // observables
  public boardMainInputValue = new BehaviorSubject<string | null>(null);
  private todoObserver = new BehaviorSubject<TodoItemType[]>([]);
  private inProgressObserver = new BehaviorSubject<TodoItemType[]>([]);
  private doneObserver = new BehaviorSubject<TodoItemType[]>([]);

  constructor(private loginService: LoginService, private notification: NzNotificationService) {
    this.loginService.userEmail.subscribe(() => {
      this.userEmail = this.loginService.getUser()?.email || '';
      // subscribe on todoCollection
      collectionSnapshots(collectionGroup(this.firestore, `todo:${this.userEmail}`)).subscribe(
        (res) => {
          return this.todoObserver.next(res.map((elem) => ({ ...(elem.data() as TodoItemType), id: elem.id })));
        },
        (err) => {
          this.notification.create('error', 'Todo Collection Observer', err.message);
        }
      );
      // subscribe on inProgressCollection
      collectionSnapshots(collectionGroup(this.firestore, `inProgress:${this.userEmail}`)).subscribe(
        (res) => {
          return this.inProgressObserver.next(res.map((elem) => ({ ...(elem.data() as TodoItemType), id: elem.id })));
        },
        (err) => {
          this.notification.create('error', 'In Progress Collection Observer', err.message);
        }
      );
      // subscribe on doneCollection
      collectionSnapshots(collectionGroup(this.firestore, `done:${this.userEmail}`)).subscribe(
        (res) => {
          return this.doneObserver.next(res.map((elem) => ({ ...(elem.data() as TodoItemType), id: elem.id })));
        },
        (err) => {
          this.notification.create('error', 'Done Collection Observer', err.message);
        }
      );
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

  public editTodo(collectionName: CollectionNameType, newTodo: TodoItemType) {
    return deleteDoc(
      doc(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}/`, newTodo.id || '')
    ).then(() =>
      addDoc(collection(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}`), newTodo).then(
        () => {
          this.notification.create('success', 'Edit operation', `Todo was successfully edited!`);
        },
        (err: Error) => {
          this.notification.create('error', 'Edit operation', err.message);
        }
      )
    );
  }

  public addTodo(collectionName: CollectionNameType, newTodo: TodoItemType) {
    return addDoc(
      collection(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}`),
      newTodo
    ).then(
      () => {
        this.notification.create('success', 'Create operation', `Todo was successfully created!`);
      },
      (err: Error) => {
        this.notification.create('error', 'Create operation', err.message);
      }
    );
  }

  public deleteTodo(collectionName: CollectionNameType, id: string) {
    return deleteDoc(doc(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}/`, id)).then(
      () => {
        this.notification.create('success', 'Delete operation', `Todo was successfully deleted!`);
      },
      (err: Error) => {
        this.notification.create('error', 'Delete operation', err.message);
      }
    );
  }

  public setStartUserCollection(user: UserType): void {
    if (this.loginService.getUser()) {
      const { firstName, lastName, email } = user;
      setDoc(doc(this.firestore, 'users', email), { firstName, lastName });
      addDoc(collection(this.firestore, `users/${email}/todo:${email}`), startTodos.todo);
      addDoc(collection(this.firestore, `users/${email}/inProgress:${email}`), startTodos.inProgress);
      addDoc(collection(this.firestore, `users/${email}/done:${email}`), startTodos.done);
    } else {
      this.notification.create('error', 'Authorization', 'Failed with authorization, try to reload or relogin!');
    }
  }

  public runDragAndDrop(
    previousContainerId: CollectionNameType,
    currentContainerId: CollectionNameType,
    item: TodoItemType
  ) {
    const dragItem = item;
    if (item.end && (currentContainerId === 'todo' || currentContainerId === 'inProgress')) {
      dragItem.end = null;
    } else if (currentContainerId === 'done') {
      dragItem.end = Date.now();
    }
    Promise.all([
      deleteDoc(
        doc(this.firestore, `users/${this.userEmail}/${previousContainerId}:${this.userEmail}/`, dragItem.id || '')
      ),
      addDoc(collection(this.firestore, `users/${this.userEmail}/${currentContainerId}:${this.userEmail}`), dragItem),
    ]);
  }
}
