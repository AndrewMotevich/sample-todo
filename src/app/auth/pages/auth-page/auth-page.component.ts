import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent {

}
