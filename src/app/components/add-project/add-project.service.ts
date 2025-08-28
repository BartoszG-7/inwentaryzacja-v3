import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AddProjectService {
  constructor(private httpClient: HttpClient) {}
  saveData(data: any) {
    return this.httpClient.post(
      'http://localhost:3000/data/add-project/',
      data
    );
  }
}
