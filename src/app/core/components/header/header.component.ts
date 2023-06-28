import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { ThemeService } from 'src/app/theme.service';
import { SortOptionService } from '../../../todo/services/sort-option.service';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Filter } from 'src/app/todo/models/filter-todo.model';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DragAndDropService } from 'src/app/todo/services/drag-and-drop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  standalone: true,
  imports: [
    NzPageHeaderModule,
    NzMenuModule,
    NzSwitchModule,
    CommonModule,
    AppRoutingModule,
    TranslateModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  currentUrl = 'Authentication';
  userName = 'OPTIONS.USER.NAME';
  userNameObservable = this.firestoreService.getUserName();
  sortFilter: Filter = Filter.title;
  filter = Filter;
  darkTheme = false;
  canDrag = true;

  disableDragObserver = this.dragAndDropService.getDisableDragObserver();

  constructor(
    private loginService: LoginService,
    private themeService: ThemeService,
    private firestoreService: FirestoreService,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    private translateService: TranslateService,
    private dragAndDropService: DragAndDropService,
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
        event.url === '/' && (this.currentUrl = 'HEADER.TITLE.AUTH');
        event.url === '/board' && (this.currentUrl = 'HEADER.TITLE.BOARD');
        event.url === '/about' && (this.currentUrl = 'HEADER.TITLE.ABOUT');
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

  public switchTheme(event: Event): void {
    event.stopPropagation();
    if (this.themeService.currentTheme === 'dark') {
      this.darkTheme = true;
    } else this.darkTheme = false;
    this.themeService.toggleTheme();
  }

  public switchLocalization(localization: string) {
    this.translateService.use(localization);
  }

  public switchDragAndDrop(event: Event) {
    event.stopPropagation();
    this.disableDragObserver.next(this.canDrag);
  }
}
