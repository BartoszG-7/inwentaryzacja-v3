import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class TreebarService {
    constructor(private readonly http: HttpClient) { }
    search(fetchedData: any, searchValidated: any): any {

        var projects: any = [];
        var locations: any = [];

        console.log('Search input changed:', searchValidated);
        fetchedData.projects.forEach((project: any) => {
            if (project.name.toLowerCase().includes(searchValidated.toLowerCase())) {
                projects.push(project);
            }
        });
        fetchedData.locations.forEach((location: any) => {
            if (location.name.toLowerCase().includes(searchValidated.toLowerCase())) {
                locations.push(location);
            }
        });
        //this.data = (JSON.stringify({ "name": item.name, "id": item.id }) + ",");


        projects.forEach((project: any) => {
            var complete: boolean = false;
            locations.forEach((location: any) => {
                if (project.location == location._id) complete = true;
            });
            if (!complete) {

                fetchedData.locations.forEach((location: any) => {
                    if (location._id == project.location) locations.push(location);
                });
            }
        });
        locations.forEach((location: any) => {
            var complete: boolean = false;
            projects.forEach((project: any) => {
                if (project.location == location._id) complete = true;
            });
            if (!complete) {

                fetchedData.projects.forEach((project: any) => {
                    if (location._id == project.location) projects.push(project);
                });
            }
        });
        return { projects: projects, locations: locations };
    }

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