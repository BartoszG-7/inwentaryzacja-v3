import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class TreebarSharedService {

    private dataSubject: ReplaySubject<any> = new ReplaySubject(1);

    setData(data: any): void {
        this.dataSubject.next(data);
    }
    getData(): Observable<any> {
        return this.dataSubject.asObservable();
    }
}