import { Component, input, OnInit } from '@angular/core';
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
  query = input<string>('http://localhost:3000/data/treebar');
  ngOnInit(): void {
    this.treebarService.getNames(this.query()).subscribe({
      next: (data: any) => {
        // Store the fetched data in the component's property

        data.locations.forEach((item: any) => {

          this.data.push({ "id": item._id, "name": item.name, projects: "" });

        });
        data.projects.forEach((item: any) => {

          this.data.forEach((treeItem: any) => {


            if (treeItem.id === item.location) {

              treeItem.projects = treeItem.projects + (JSON.stringify({ "name": item.name, "id": item.id }) + ",");

            }

          });
        });



      }
    });

  }

}
