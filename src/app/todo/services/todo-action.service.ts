import { Injectable } from '@angular/core';
import { unselectAll } from '../utils/utils';
import { BehaviorSubject } from 'rxjs';
import { ITodoItem } from '../models/todo-item.model';
import { ActionsTodo } from '../models/action-todo.model';
import { CollectionName } from 'src/app/shared/models/colection-name.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class TodoActionService {
  constructor(private firestoreService: FirestoreService) {}

  public doActionWithTodo(
    collection: BehaviorSubject<ITodoItem[]>,
    checkAll: boolean,
    action: ActionsTodo,
    collectionName: CollectionName,
    moveToCollectionName: CollectionName = CollectionName.todo,
    context = { checkAllTodo: false, checkAllInProgress: false, checkAllDone: false }
  ) {
    collection
      .subscribe((res) => {
        action === 'selectAll' &&
          res.forEach((todo) => {
            todo.selected = checkAll;
          });
        action === 'moveSelected' &&
          (() => {
            for (let i = 0; i < res.length; i++) {
              if (res[i].selected) {
                this.firestoreService.runDragAndDrop(collectionName, moveToCollectionName, res[i]);
              }
            }
            unselectAll(collectionName, context);
          })();
        action === 'deleteSelected' &&
          (() => {
            res.forEach((todo) => {
              if (todo.selected) this.firestoreService.deleteTodo(collectionName, todo.id || '');
            });
            unselectAll(collectionName, context);
          })();
      })
      .unsubscribe();
  }
}
