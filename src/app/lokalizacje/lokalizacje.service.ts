import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class LocationService {
    constructor(private readonly http: HttpClient) { }
    getLocations(): Observable<any> {
        return this.http.get<JSON>('http://localhost:3000/location/{}');

    }

}