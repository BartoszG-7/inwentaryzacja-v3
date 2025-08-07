import { Component, OnInit } from '@angular/core';
import { TreebarService } from './treebar.service';
import { Treeexpander } from '../treeexpander/treeexpander';

@Component({
  selector: 'app-treebar',
  imports: [Treeexpander],
  templateUrl: './treebar.html',
  styleUrl: './treebar.scss'
})
export class Treebar implements OnInit {
  constructor(private treebarService: TreebarService) { }
  data: Array<any> = [];
  stringified: string = "";
  ngOnInit(): void {
    this.treebarService.getLocations().subscribe({
      next: (data: any) => {
        // Store the fetched data in the component's property
        data.forEach((item: any) => {

          this.data.push({ "id": item._id, "name": item.name, projects: "" });
        });
        this.treebarService.getNames().subscribe({
          next: (data: any) => {


            data.forEach((item: any) => {
              this.data.forEach((treeItem: any) => {
                console.log(item.location, treeItem.id);
                if (treeItem.id === item.location) {

                  treeItem.projects = treeItem.projects + (JSON.stringify({ "name": item.name, "id": item.id }) + ",");
                }

              });
            });
            console.log('Treebar data:', this.data[2].projects);
          },
          error: (err) => {
            console.error('Error fetching treebar names:', err);
          }
        });
      }
    });
  }

}
