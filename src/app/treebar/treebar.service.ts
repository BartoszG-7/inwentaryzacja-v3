import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class TreebarService {
    constructor(private readonly http: HttpClient) { }
    getNames(query: string): Observable<any> {
        return this.http.get<JSON>(query);

    }

}