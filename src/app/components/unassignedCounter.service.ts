import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  from,
  map,
  Observable,
  ObservableInput,
  of,
  switchAll,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnassignedCounterService {
  constructor(private httpClient: HttpClient) {}
  getAssignedByType(type: string): Observable<any> {
    let obs = this.httpClient
      .get('http://localhost:3000/device/assigned-by-type/' + type)
      .pipe(
        map((x: any) => {
          let count: number = 0;
          x.forEach((element: any) => {
            if (element.project) count++;
          });
          return count;
        })
      );
    return obs;
  }
}
