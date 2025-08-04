import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class HeaderService {
    constructor(private readonly http: HttpClient) { }
    getData(): Observable<string> {
        return this.http.get<string>('http://localhost:3000/data/findAll', new Object({
            responseType: 'text'
        }));

    }


}