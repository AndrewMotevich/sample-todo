import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { ThemeService } from 'src/app/theme.service';
import { SortOptionService } from '../../services/sort-option.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  userName$ = this.firestoreService.getUserName();

  constructor(
    private loginService: LoginService,
    private themeService: ThemeService,
    private firestoreService: FirestoreService,
    public sortOptionService: SortOptionService
  ) {}

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
