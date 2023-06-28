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
import { LoginService } from '../../auth/services/login.service';
import { IUser } from 'src/app/auth/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { ITodoItem } from 'src/app/todo/models/todo-item.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CollectionName } from '../models/colection-name.model';
import { startTodos } from '../models/start-todo-collection';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private userEmail!: string;
  private firestore = inject(Firestore);

  public boardMainInputValue = new BehaviorSubject<string | null>(null);
  private todoObserver = new BehaviorSubject<ITodoItem[]>([]);
  private inProgressObserver = new BehaviorSubject<ITodoItem[]>([]);
  private doneObserver = new BehaviorSubject<ITodoItem[]>([]);
  private userName = new BehaviorSubject<Pick<IUser, 'firstName' | 'lastName'>>({
    firstName: 'User',
    lastName: 'User',
  });

  constructor(private loginService: LoginService, private notification: NzNotificationService) {
    this.loginService.userEmail.subscribe(() => {
      this.userEmail = this.loginService.getUser()?.email || '';

      this.subscribeOnCollection(CollectionName.todo, this.todoObserver);
      this.subscribeOnCollection(CollectionName.inProgress, this.inProgressObserver);
      this.subscribeOnCollection(CollectionName.done, this.doneObserver, true);
    });
  }

  private subscribeOnCollection(
    collectionName: CollectionName,
    observer: BehaviorSubject<ITodoItem[]>,
    checked = false
  ) {
    collectionSnapshots(collectionGroup(this.firestore, `${collectionName}:${this.userEmail}`)).subscribe(
      (res) => {
        return observer.next(
          res.map((elem) => ({ ...(elem.data() as ITodoItem), id: elem.id, checked: checked, selected: false }))
        );
      },
      (err) => {
        this.notification.create('error', `${collectionName.toLocaleUpperCase()} Collection Observer`, err.message);
      }
    );
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

  public editTodo(collectionName: CollectionName, newTodo: ITodoItem) {
    return deleteDoc(
      doc(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}/`, newTodo.id || '')
    ).then(() =>
      addDoc(collection(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}`), newTodo)
        .then(() => {
          this.notification.create('success', 'Edit operation', `Todo was successfully edited!`);
        })
        .catch((err: Error) => {
          this.notification.create('error', 'Edit operation', err.message);
        })
    );
  }

  public addTodo(collectionName: CollectionName, newTodo: ITodoItem) {
    return addDoc(collection(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}`), newTodo)
      .then(() => {
        this.notification.create('success', 'Create operation', `Todo was successfully created!`);
      })
      .catch((err: Error) => {
        this.notification.create('error', 'Create operation', err.message);
      });
  }

  public deleteTodo(collectionName: CollectionName, id: string) {
    return deleteDoc(doc(this.firestore, `users/${this.userEmail}/${collectionName}:${this.userEmail}/`, id))
      .then(() => {
        this.notification.create('success', 'Delete operation', `Todo was successfully deleted!`);
      })
      .catch((err: Error) => {
        this.notification.create('error', 'Delete operation', err.message);
      });
  }

  public setStartUserCollection(user: IUser): void {
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

  public runDragAndDrop(previousContainerId: CollectionName, currentContainerId: CollectionName, item: ITodoItem) {
    const dragItem = item;
    if (item.end && (currentContainerId === CollectionName.todo || currentContainerId === CollectionName.inProgress)) {
      dragItem.end = null;
      dragItem.checked = false;
      dragItem.selected = false;
    } else if (currentContainerId === CollectionName.done) {
      dragItem.end = Date.now();
      dragItem.checked = true;
      dragItem.selected = false;
    }
    return Promise.all([
      deleteDoc(
        doc(this.firestore, `users/${this.userEmail}/${previousContainerId}:${this.userEmail}/`, dragItem.id || '')
      ),
      addDoc(collection(this.firestore, `users/${this.userEmail}/${currentContainerId}:${this.userEmail}`), dragItem),
    ]);
  }

  getUserName() {
    return this.userName;
  }
}
