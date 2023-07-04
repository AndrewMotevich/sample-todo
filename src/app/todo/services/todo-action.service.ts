import { Injectable } from '@angular/core';
import { unselectAll } from '../utils/utils';
import { BehaviorSubject } from 'rxjs';
import { ITodoItem } from '../models/todo-item.model';
import { ActionsTodo } from '../enum/action-todo.model';
import { CollectionName } from 'src/app/shared/enum/collection-name';
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
    context = {
      checkAllTodo: false,
      checkAllInProgress: false,
      checkAllDone: false,
    }
  ) {
    collection
      .subscribe(res => {
        action === ActionsTodo.selectAll &&
          res.forEach(todo => {
            todo.selected = checkAll;
          });

        action === ActionsTodo.moveSelected &&
          (() => {
            for (let index = 0; index < res.length; index++) {
              if (res[index].selected) {
                this.firestoreService.runDragAndDrop(
                  collectionName,
                  moveToCollectionName,
                  res[index]
                );
              }
            }
            unselectAll(collectionName, context);
          })();

        action === ActionsTodo.deleteSelected &&
          (() => {
            res.forEach(todo => {
              if (todo.selected)
                this.firestoreService.deleteTodo(collectionName, todo.id || '');
            });
            unselectAll(collectionName, context);
          })();
      })
      .unsubscribe();
  }
}
