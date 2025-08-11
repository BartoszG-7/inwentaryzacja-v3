import { Component, input, OnInit, output } from '@angular/core';
import { TreebarService } from './treebar.service';
import { Treeexpander } from '../treeexpander/treeexpander';
import { TreebarSharedService } from '../home/treebar.share.service';

@Component({
  selector: 'app-treebar',
  imports: [Treeexpander],
  templateUrl: './treebar.html',
  styleUrl: './treebar.scss'
})
export class Treebar implements OnInit {
  constructor(private treebarService: TreebarService, private treebarSharedService: TreebarSharedService) { }
  data: Array<any> = [];
  selectedId = output<any>();
  stringified: string = "";
  query = input<string>('http://localhost:3000/data/treebar');
  search = input<string>("{}");
  changeId(event: any): void {

    this.treebarSharedService.setData(event);
  }
  ngOnInit(): void {
    console.log(this.query());
    this.treebarService.getNames(this.query(), this.search()).subscribe({
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
