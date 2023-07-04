import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TodoActionService } from '../../services/todo-action.service';
import { ITodoItem } from '../../models/todo-item.model';
import { BehaviorSubject } from 'rxjs';
import { ActionsTodo } from '../../enum/action-todo.model';
import { CollectionName } from 'src/app/shared/enum/colection-name';

@Component({
  selector: 'app-todo-action-menu',
  templateUrl: './todo-action-menu.component.html',
  styleUrls: ['./todo-action-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoActionMenuComponent implements OnInit {
  @Input() collection!: BehaviorSubject<ITodoItem[]>;
  @Input() checkAll!: boolean;
  @Input() collectionName!: CollectionName;
  @Input() context = {
    checkAllTodo: false,
    checkAllInProgress: false,
    checkAllDone: false,
  };

  public action = ActionsTodo;
  public moveToCollectionOne!: CollectionName;
  public moveToCollectionTwo!: CollectionName;

  constructor(private todoActionService: TodoActionService) {}

  ngOnInit(): void {
    if (this.collectionName === 'todo') {
      this.moveToCollectionOne = CollectionName.inProgress;
      this.moveToCollectionTwo = CollectionName.done;
    }
    if (this.collectionName === 'inProgress') {
      this.moveToCollectionOne = CollectionName.todo;
      this.moveToCollectionTwo = CollectionName.done;
    }
    if (this.collectionName === 'done') {
      this.moveToCollectionOne = CollectionName.todo;
      this.moveToCollectionTwo = CollectionName.inProgress;
    }
  }

  public todoAction(action: ActionsTodo, moveToCollection: CollectionName) {
    this.todoActionService.doActionWithTodo(
      this.collection,
      this.checkAll,
      action,
      this.collectionName,
      moveToCollection,
      this.context
    );
  }
}
