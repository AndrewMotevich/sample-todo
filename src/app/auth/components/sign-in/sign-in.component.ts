import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ModalWindowComponent } from 'src/app/shared/components/modal-window/modal-window.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  @ViewChild('modal') modal!: ModalWindowComponent;
}
