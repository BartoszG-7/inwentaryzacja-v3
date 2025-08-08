import { Component, ElementRef, ViewChild } from '@angular/core';
import { Treebar } from '../../treebar/treebar';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { MagazynRightCompService } from './magazyn-right.service';
// import { MagazynRightCompService } from './magazyn-right.service';

@Component({
  selector: 'app-magazyn-right-comp',
  standalone: true,
  templateUrl: './magazyn-right.component.html',
  styleUrls: ['./magazyn-right.component.scss']
})
export class MagazynRightCompComponent {

  constructor(private treebarSharedService: TreebarSharedService, private magazynRightCompService: MagazynRightCompService) { }
  name: string = "";
  ngOnInit(): void {

    this.treebarSharedService.getData().subscribe({
      next: (data: any) => {
        this.magazynRightCompService.getDeviceTypes(data.id).subscribe({
          next: (data: any) => {
            this.name = data[0].name
          }
        });

      }
    });
  }
}