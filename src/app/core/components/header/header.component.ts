import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private loginService: LoginService) {}
  getUser() {
    this.loginService.getUser();
  }
  signOut() {
    this.loginService.signOut();
  }
}
