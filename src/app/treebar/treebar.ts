import { Component, OnInit } from '@angular/core';
import { TreebarService } from './treebar.service';

@Component({
  selector: 'app-treebar',
  imports: [],
  templateUrl: './treebar.html',
  styleUrl: './treebar.scss'
})
export class Treebar implements OnInit {
  constructor(private treebarService: TreebarService) { }
  ngOnInit(): void {
    this.treebarService.getNames().subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching treebar names:', err);
      }
    });
  }
}
