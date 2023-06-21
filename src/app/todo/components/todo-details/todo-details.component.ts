import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoItemType } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailsComponent {
  @Input() todo!: TodoItemType;
}
