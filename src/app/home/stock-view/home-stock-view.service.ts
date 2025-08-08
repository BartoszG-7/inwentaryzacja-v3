import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HomeStockViewService {
constructor(private httpClient: HttpClient) {}
  getUnassignedDevices(): any {
    return this.httpClient.get('http://localhost:3000/device/unassigned');
  }
}
