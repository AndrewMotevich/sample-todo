import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';
import { DEFAULT_LOCALE } from 'src/environments/locales';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.use(DEFAULT_LOCALE);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme().then();
  }
}
