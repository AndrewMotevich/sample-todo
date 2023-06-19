import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @ViewChild('modal') modal!: ModalWindowComponent;

  showModal(): void {
    this.modal.showModal();
  }
}
