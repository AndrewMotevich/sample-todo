import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { ThemeService } from 'src/app/theme.service';
import { SortOptionService } from '../../services/sort-option.service';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Filter } from 'src/app/todo/models/filter-todo.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  standalone: true,
  imports: [NzPageHeaderModule, NzMenuModule, CommonModule, AppRoutingModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  currentUrl = 'Authentication';
  userName = 'User';
  userNameObservable = this.firestoreService.getUserName();
  sortFilter: Filter = Filter.title;
  filter = Filter;

  constructor(
    private loginService: LoginService,
    private themeService: ThemeService,
    private firestoreService: FirestoreService,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    public sortOptionService: SortOptionService
  ) {
    this.sortOptionService.getSortOptions().subscribe((res) => {
      this.sortFilter = res;
    });
    this.userNameObservable.subscribe((res) => {
      this.userName = res.firstName;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        event.url === '/' && (this.currentUrl = 'Authentication');
        event.url === '/board' && (this.currentUrl = "Todo's board");
        event.url === '/about' && (this.currentUrl = 'About app');
        this.changeDetection.detectChanges();
      }
    });
  }

  public isLogin() {
    return this.loginService.isLoggedIn;
  }

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
