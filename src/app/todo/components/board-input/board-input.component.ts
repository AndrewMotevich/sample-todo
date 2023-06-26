import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-board-input',
  templateUrl: './board-input.component.html',
  styleUrls: ['./board-input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardInputComponent {
  @Output()
  public inputValue!: string | null;

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.boardMainInputValue.subscribe((res) => {
      this.inputValue = res;
    });
  }
}
