import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItemType } from '../../models/todo-item.model';
import { Observable } from 'rxjs';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { FilterInfoObject } from '../../models/filter-todo.model';
import { CollectionNameType } from 'src/app/shared/models/colection-name.model';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input() todo!: Observable<TodoItemType[]>;
  @Input() doneList!: string | CdkDropList<any>;
  @Input() inProgressList!: string | CdkDropList<any>;
  @Input() drop!: (event: CdkDragDrop<any>) => void;
  @Input() changeFilterOrder!: (order: string) => void;
  @Input() sortAllTodo!: FilterInfoObject;
  @Input() checkAllTodo = false;
  @Input() todoAction!: (action: string, collectionName: CollectionNameType) => void;
  @Input() todoMenu!: NzDropdownMenuComponent;
  @Input() checkTodo!: (collectionName: CollectionNameType, item: TodoItemType) => void;
}
