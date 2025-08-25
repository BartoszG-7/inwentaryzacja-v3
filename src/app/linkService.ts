import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
type LinkEvent = {
  type: string;
  id: string;
  idLoc?: string;
};
@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private dataSubject: ReplaySubject<LinkEvent> = new ReplaySubject(1);

  setData(data: LinkEvent): void {
    this.dataSubject.next(data);
  }
  getData(): Observable<LinkEvent> {
    return this.dataSubject.asObservable();
  }
}
