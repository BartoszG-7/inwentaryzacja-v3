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
  ngOnInit(): void {
    this.treebarService.getNames().subscribe({
      next: (data: any) => {

        this.data = data; // Store the fetched data in the component's property
        this.data.forEach((item: any) => {
          item.projects = JSON.stringify(item.projects);
         
        });
        
      },
      error: (err) => {
        console.error('Error fetching treebar names:', err);
      }
    });
  }
}
