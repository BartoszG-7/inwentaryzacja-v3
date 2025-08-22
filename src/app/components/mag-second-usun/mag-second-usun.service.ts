import { Component, Injectable, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MagSecondUsunService {
  constructor(private httpClient: HttpClient) {}
  delData(data: any): Observable<any> {
    console.log(data);
    return this.httpClient.delete('http://localhost:3000/device/', {
      body: data,
    });
  }
}
