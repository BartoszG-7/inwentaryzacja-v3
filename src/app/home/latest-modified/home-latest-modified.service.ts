import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";
enum HistoryEvents {
    CREATE_PROJECT = 1,
}
@Injectable({
    providedIn: 'root',
})
export class HomeService {

    constructor(private readonly http: HttpClient) { }
    getNamesAndDate(): Observable<any> {
        return new Observable((sub) => { sub.next("WIP") });
        //return this.http.get<JSON>('http://localhost:3000/projectHistory/modified');
    }

}