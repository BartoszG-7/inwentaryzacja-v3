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
  getProjectNeeded(id: string) {
    return this.httpClient.get("http://localhost:3000/project/getNeeded/"+id);
  }
  addToProject(payload: {
    deviceId: string;
    projectId: string;
  }): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/data/add-device-to-project',
      payload
    );
  }
  removeFromProject(payload: {
    deviceId: string;
    projectId: string;
  }): Observable<any> {
    return this.httpClient.post(
      'http://localhost:3000/data/remove-device-from-project',
      payload
    );
  }
}
