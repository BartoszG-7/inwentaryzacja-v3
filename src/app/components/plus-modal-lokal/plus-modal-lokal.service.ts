import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlusModalLokalService {
  constructor(private httpClient: HttpClient) {}
  postData(data: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/location', data);
  }
}
