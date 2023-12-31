import {
  ChangeDetectionStrategy,
  Component,
  Input,
  AfterContentInit,
} from '@angular/core';
import { ITodoItem } from '../../models/todo-item.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { CollectionName } from 'src/app/shared/enum/collection-name';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markAsDirty } from 'src/app/auth/utils/utils';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailsComponent implements AfterContentInit {
  @Input() todo!: ITodoItem;
  @Input() collectionName!: CollectionName;

  public editForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(255)],
    }),
  });

  constructor(private firestoreService: FirestoreService) {}

  public ngAfterContentInit(): void {
    this.editForm.controls.title.setValue(this.todo.title);
    this.editForm.controls.description.setValue(this.todo.description);
  }

  public editTodo() {
    if (!this.editForm.valid) {
      markAsDirty(this.editForm.controls);
    } else {
      this.firestoreService.editTodo(this.collectionName, {
        ...this.todo,
        title: this.editForm.controls.title.value,
        description: this.editForm.controls.description.value,
      });
    }
  }

  public deleteTodo() {
    this.firestoreService.deleteTodo(this.collectionName, this.todo.id || '');
  }
}
