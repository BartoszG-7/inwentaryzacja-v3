import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { Treebar } from '../../treebar/treebar';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { MagazynRightCompService } from './magazyn-right.service';
import { MagazynSharedService } from '../../magazynShared.service';
import { LinkService } from '../../linkService';
// import { MagazynRightCompService } from './magazyn-right.service';

@Component({
  selector: 'app-magazyn-right-comp',
  standalone: true,
  templateUrl: './magazyn-right.component.html',
  styleUrls: ['./magazyn-right.component.scss'],
})
export class MagazynRightCompComponent {
  constructor(
    private treebarSharedService: TreebarSharedService,
    private magazynRightCompService: MagazynRightCompService,
    private magazynSharedService: MagazynSharedService,
    private linkService: LinkService
  ) {}
  idOut = output();
  // Emits when the first stat panel ("JEST") is clicked so parent can swap to the second view
  showSecond = output<void>();
  idDummy = input();
  name: string = '';
  id: any = '';
  itemCount: number = 0;
  deviceList() {
    // this.idOut.emit(this.id);
    // this.magazynSharedService.setBool(true);
  }
  openSecondPanel() {
    this.showSecond.emit();
  }
  ngOnInit(): void {
    this.linkService.getData().subscribe({
      next: (value) => {
        this.id = value.id;
        this.magazynRightCompService.getDeviceTypes(value.id).subscribe({
          next: (data: any) => {
            if (data[0]) {
              this.name = data[0].name;
            }
          },
        });

        this.magazynRightCompService.getDevices(value.id).subscribe({
          next: (data: any) => {
            this.itemCount = data.length;
          },
        });
      },
    });
    // this.treebarSharedService.getData().subscribe({
    //   next: (data: any) => {
    //     this.id = data.id;
    //     console.log(data);
    //     this.magazynRightCompService.getDeviceTypes(data.id).subscribe({
    //       next: (data: any) => {
    //         if (data[0]) {
    //           this.name = data[0].name;
    //         }
    //       },
    //     });

    //     this.magazynRightCompService.getDevices(data.id).subscribe({
    //       next: (data: any) => {
    //         this.itemCount = data.length;
    //       },
    //     });
    //   },
    // });
  }
}
