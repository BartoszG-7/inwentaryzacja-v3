import { Component, Injectable, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MagSecondEditService {
  constructor(private httpClient: HttpClient) {}
  refresh = new Subject();
  editData(data: any, id: string): Observable<any> {
    console.log(data, id);

    return this.httpClient.patch(
      'http://localhost:3000/device/' + id,
      data
    );
  }
  sendRefresh() {
    return this.refresh.next('');
  }
  getData(): Observable<any> {
    return this.refresh.asObservable();
  }
}
