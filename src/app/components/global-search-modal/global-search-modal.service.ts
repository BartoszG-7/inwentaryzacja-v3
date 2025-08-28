import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  debounce,
  debounceTime,
  interval,
  Observable,
  Subject,
  timer,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalSearchModalService {
  constructor(private httpClient: HttpClient) {}
  search(query: string): Observable<any> {
    return this.httpClient.get(
      'http://localhost:3000/data/global-search/' + query
    );
  }
}
