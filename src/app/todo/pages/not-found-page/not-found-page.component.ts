import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  constructor(private changeDetection: ChangeDetectorRef, private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/board']);
      this.changeDetection.detectChanges();
    }, 5000);
  }
}
