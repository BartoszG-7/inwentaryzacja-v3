import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { TreebarService } from './treebar.service';
import { Treeexpander } from '../treeexpander/treeexpander';
import { TreebarSharedService } from '../home/treebar.share.service';

@Component({
  selector: 'app-treebar',
  imports: [Treeexpander],
  templateUrl: './treebar.html',
  styleUrl: './treebar.scss'
})
export class Treebar implements OnInit, OnChanges {
  constructor(private treebarService: TreebarService, private treebarSharedService: TreebarSharedService) { }


  data: Array<any> = [];
  selectedId = output<any>();
  stringified: string = "";
  query = input<string>('http://localhost:3000/data/treebar');
  search = input<string>();
  searchValidated: string = "{}";
  fetchedData: any;
  changeId(event: any): void {

    this.treebarSharedService.setData(event);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.data = [];
    if (changes['search']) {
      var projects: any = [];
      var locations: any = [];
      this.searchValidated = this.search() ?? "";
      console.log('Search input changed:', this.searchValidated);
      this.fetchedData.projects.forEach((project: any) => {
        if (project.name.toLowerCase().includes(this.searchValidated.toLowerCase())) {
          projects.push(project);
        }
      });
      this.fetchedData.locations.forEach((location: any) => {
        if (location.name.toLowerCase().includes(this.searchValidated.toLowerCase())) {
          locations.push(location);
        }
      });
      //this.data = (JSON.stringify({ "name": item.name, "id": item.id }) + ",");
    }

    projects.forEach((project: any) => {
      var complete: boolean = false;
      locations.forEach((location: any) => {
        if (project.location == location._id) complete = true;
      });
      if (!complete) {
        console.log(this.fetchedData);
        this.fetchedData.locations.forEach((location: any) => {
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

        this.fetchedData.projects.forEach((project: any) => {
          if (location._id == project.location) projects.push(project);
        });
      }
    });
    this.data = this.treebarService.dataParser({ projects: projects, locations: locations });
  }
  ngOnInit(): void {

    this.data = [];
    this.stringified = "";
    console.log(this.query());
    if (this.search() == "") {
      this.searchValidated = "{}";
    } else {
      this.searchValidated = this.search() ?? "";
    }
    this.treebarService.getNames(this.query()).subscribe({
      next: (data: any) => {
        // Store the fetched data in t  he component's property
        this.fetchedData = data;
        console.log(data);
        this.data = this.treebarService.dataParser(data);
        // data.locations.forEach((item: any) => {

        //   this.data.push({ "id": item._id, "name": item.name, projects: "" });

        // });
        // if (data.projects) {
        //   data.projects.forEach((item: any) => {

        //     this.data.forEach((treeItem: any) => {


        //       if (treeItem.id === item.location) {

        //         treeItem.projects = treeItem.projects + (JSON.stringify({ "name": item.name, "id": item.id }) + ",");

        //       }

        //     });
        //   });
        // }



      }
    });
    console.log(this.data)
  }

}
