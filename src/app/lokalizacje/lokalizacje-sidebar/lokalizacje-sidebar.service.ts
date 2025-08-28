import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private readonly http: HttpClient) {}
  getLocations(): Observable<any> {
    return this.http.get<JSON>('http://localhost:3000/location/{}');
  }
  /* saveData(id: string, name: string, address: string, tag: string, note: string): Observable<any> {
        return this.http.patch<JSON>('http://localhost:3000/location/' + id, {
            "name": name,
            "address": address,
            "tag": tag,
            "note": note
        });

    }*/
}
