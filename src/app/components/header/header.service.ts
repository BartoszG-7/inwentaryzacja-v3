import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class HeaderService {

    constructor(private readonly http: HttpClient) { }


    getData(): Observable<string> {
        return this.http.post<string>('http://localhost:3000/location/create', { "test": "test" }, new Object({
            responseType: 'text'
        }));

    }
    getDataV2(): Observable<string> {
        return this.http.get<string>('http://localhost:3000/location/find', new Object({
            responseType: 'text',
            headers: new HttpHeaders({
                'query': '{}'
            }),

        }));

    }

}