import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filter } from 'src/app/todo/models/filter-todo.model';
import { LoginService } from 'src/app/auth/services/login.service';
import { ThemeService } from 'src/app/theme.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DragAndDropService } from 'src/app/todo/services/drag-and-drop.service';
import { SortOptionService } from 'src/app/todo/services/sort-option.service';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzMenuModule,
    NzIconModule,
    NzSwitchModule,
    AppRoutingModule,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  currentUrl = 'Authentication';
  currentLocalization = 'en';
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
    if (document.body.clientWidth < 600) {
      this.canDrag = false;
    }
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
    this.currentLocalization = localization;
    this.translateService.use(localization);
  }

  public switchDragAndDrop(event: Event) {
    event.stopPropagation();
    this.disableDragObserver.next(this.canDrag);
  }
}
