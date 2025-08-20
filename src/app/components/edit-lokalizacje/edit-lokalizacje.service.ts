import { Component, Injectable, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EditLokalizacjeService {
  constructor(private httpClient: HttpClient) {}
  saveData(data: any, id: string): Observable<any> {
    return this.httpClient.patch('http://localhost:3000/location/' + id, data);
  }
}
