import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  public intervalNumber = 5;
  public interval = interval(1000).pipe(take(5));

  constructor(private changeDetection: ChangeDetectorRef, private router: Router) {
    this.interval.subscribe(() => {
      if (this.intervalNumber === 1) {
        this.router.navigate(['/board']);
      } else {
        this.intervalNumber -= 1;
        this.changeDetection.detectChanges();
      }
    });
  }
}
