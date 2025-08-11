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
    dataParser(data: any): Array<any> {
        var parsedData: Array<any> = [];
        data.locations.forEach((item: any) => {

            parsedData.push({ "id": item._id, "name": item.name, projects: "" });

        });
        if (data.projects) {
            data.projects.forEach((item: any) => {

                parsedData.forEach((treeItem: any) => {


                    if (treeItem.id === item.location) {

                        treeItem.projects = treeItem.projects + (JSON.stringify({ "name": item.name, "id": item.id }) + ",");

                    }

                });
            });
        }
        return parsedData;
    }
}