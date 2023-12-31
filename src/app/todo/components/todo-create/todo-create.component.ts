import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { CollectionName } from 'src/app/shared/enum/collection-name';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { markAsDirty } from '../../../auth/utils/utils';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateComponent {
  @ViewChild('modal') modal!: ModalWindowComponent;
  @Input() title = 'New Todo';

  public createTodoForm = new FormGroup({
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(255)],
    }),
  });

  constructor(private firestoreService: FirestoreService) {}

  public openModal(): void {
    this.modal.showModal();
  }

  public submitForm(): void {
    if (!this.createTodoForm.valid) {
      markAsDirty(this.createTodoForm.controls);
      return;
    }
    this.firestoreService.addTodo(CollectionName.todo, {
      title: this.title,
      description: this.createTodoForm.controls.description.value,
      start: Date.now(),
      end: null,
    });
    this.modal.handleCancel();
    this.firestoreService.boardMainInputValue.next(null);
  }
}
