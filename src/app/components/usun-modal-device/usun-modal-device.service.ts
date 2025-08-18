import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsunModalDeviceService {
  constructor(private httpClient: HttpClient) {}
  unassign(ids: any) {
    return this.httpClient.get('http://localhost:3000/device/unassign/' + ids);
  }
}
