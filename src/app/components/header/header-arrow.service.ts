import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeaderArrowService {
  private _showArrow = new BehaviorSubject<boolean>(false);
  showArrow$ = this._showArrow.asObservable();

  setShowArrow(show: boolean) {
    this._showArrow.next(show);
  }
}
