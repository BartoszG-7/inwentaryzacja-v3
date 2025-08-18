import { Component, Injectable, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DodajModalProjektService {
  constructor(private httpClient: HttpClient) {}
  getDeviceTypes(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/device-type/{}');
  }
  saveData(data: any): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/data/create-device-and-assign',
      data
    );
  }
}
