import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filter } from 'src/app/todo/enum/filter-todo.model';
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
import { SwitchBoardViewService } from 'src/app/todo/services/switch-board-view.service';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzMenuModule,
    NzSwitchModule,
    NzIconModule,
    AppRoutingModule,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./header-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMenuComponent implements AfterViewInit {
  currentUrl = 'Authentication';
  userName = 'User';
  currentLocalization = 'en';
  userNameObservable = this.firestoreService.userName;
  sortFilter: Filter = Filter.title;
  filter = Filter;
  darkTheme = false;
  canDrag = true;
  isBoardView = true;

  disableDragObserver = this.dragAndDropService.getDisableDragObserver();

  constructor(
    private changeDetection: ChangeDetectorRef,
    private loginService: LoginService,
    private themeService: ThemeService,
    private firestoreService: FirestoreService,
    private translateService: TranslateService,
    private dragAndDropService: DragAndDropService,
    private switchBoardViewService: SwitchBoardViewService,
    public sortOptionService: SortOptionService
  ) {
    this.sortOptionService.getSortOptions().subscribe(res => {
      this.sortFilter = res;
    });
    if (document.body.clientWidth < 600) {
      this.canDrag = false;
    }
  }

  ngAfterViewInit(): void {
    this.userNameObservable.subscribe(res => {
      this.userName = res.firstName;
      this.changeDetection.detectChanges();
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

  public switchBoardView(event: Event) {
    event.stopPropagation();
    this.switchBoardViewService
      .getBoardViewObservable()
      .next(!this.isBoardView);
  }
}

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzMenuModule,
    NzSwitchModule,
    NzIconModule,
    AppRoutingModule,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./header-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent extends HeaderMenuComponent {}
