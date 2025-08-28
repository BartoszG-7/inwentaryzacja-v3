import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagazynService {
  constructor(private readonly http: HttpClient) {}
  /*  getInventory(): Observable<any> {
      return this.http.get<JSON>('http://localhost:3000/device-type/list');
  
    }*/
}
