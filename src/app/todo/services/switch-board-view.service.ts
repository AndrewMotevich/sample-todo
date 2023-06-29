import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwitchBoardViewService {
  private boardViewObservable = new BehaviorSubject<boolean>(true);

  getBoardViewObservable() {
    return this.boardViewObservable;
  }
}
