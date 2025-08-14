import {
  Component,
  Injectable,
  input,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LokalizacjeRightProjectService {
  constructor(private httpClient: HttpClient) {}
  getProjectData(id: string): Observable<any> {
    return this.httpClient.get(
      'http://localhost:3000/data/get-project-data/' + id
    );
  }
}
