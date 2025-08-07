import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class TreebarService {
    constructor(private readonly http: HttpClient) { }
    getNames(): Observable<any> {
        return this.http.get<JSON>('http://localhost:3000/project/treebar');

    }
    getLocations(): Observable<any> {
        return this.http.get<JSON>('http://localhost:3000/location/treebar');

    }
}