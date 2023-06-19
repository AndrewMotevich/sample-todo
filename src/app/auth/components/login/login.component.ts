import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';
import { collectionData, collection, Firestore } from '@angular/fire/firestore';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @ViewChild('modal') modal!: ModalWindowComponent;

  firestore = inject(Firestore);
  todoCollection = collection(this.firestore, 'todo');

  todos = () => collectionData(this.todoCollection).pipe(tap((res) => console.log(res)));

  getTodoCollection(): void {
    collectionData(this.todoCollection).subscribe((res) => console.log(res));
  }
}
