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
  getAssignedByType(type: string): Observable<number> {
    let obs = this.httpClient
      .get('http://172.16.61.142:3000/device/assigned-by-type/' + type)
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

  // Counts devices of a given type that are NOT assigned to any project
  getUnassignedByType(type: string): Observable<number> {
    return this.httpClient
      .get('http://172.16.61.142:3000/device/assigned-by-type/' + type)
      .pipe(
        map((x: any) => {
          let count = 0;
          x.forEach((element: any) => {
            if (!element.project) count++;
          });
          return count;
        })
      );
  }
}
