import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(private readonly http: HttpClient) { }
    getNamesAndDate(): Observable<any> {
        return this.http.get<JSON>('http://localhost:3000/location/modified');
    }

}