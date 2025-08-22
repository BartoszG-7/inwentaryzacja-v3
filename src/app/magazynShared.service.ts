import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagazynSharedService {
  showList = new Subject<boolean>();
  getBool(): Observable<boolean> {
    return this.showList.asObservable();
  }
  setBool(bool: boolean) {
    return this.showList.next(bool);
  }
}
