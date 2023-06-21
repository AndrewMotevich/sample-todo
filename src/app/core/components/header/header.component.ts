import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private loginService: LoginService, private themeService: ThemeService) {}

  public getUser(): void {
    this.loginService.getUser();
  }

  public signOut(): void {
    this.loginService.signOut();
  }

  public switchTheme(): void {
    this.themeService.toggleTheme();
  }
}
