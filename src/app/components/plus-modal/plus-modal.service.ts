import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlusModalService {
  constructor(private httpClient: HttpClient) {}
  postData(data: any): any {
    return this.httpClient.post('http://localhost:3000/device-type', data);
  }
}
