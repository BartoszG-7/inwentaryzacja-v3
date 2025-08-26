import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { Treebar } from '../../treebar/treebar';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { MagazynRightCompService } from './magazyn-right.service';
import { MagazynSharedService } from '../../magazynShared.service';
import { LinkService, EventTypes } from '../../linkService';
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
  loading = true;
  private _pendingLoads = 0;
  deviceList() {
    this.idOut.emit(this.id);
    this.magazynSharedService.setBool(true);
    // rebroadcast selection so tree stays in sync when switching panels
    if (this.id) {
      this.linkService.setData({ type: EventTypes.DEVICE_TYPE, id: this.id });
    }
  }
  openSecondPanel() {
    this.showSecond.emit();
  }
  ngOnInit(): void {
    this.linkService.getData().subscribe({
      next: (value) => {
        this.id = value.id;
        this.loading = true;
        this._pendingLoads = 2;
        this.magazynRightCompService.getDeviceTypes(value.id).subscribe({
          next: (data: any) => {
            if (data?.[0]?.name) this.name = data[0].name;
          },
          error: (err) => {
            console.error('Failed to load device types', err);
          },
          complete: () => {
            this._pendingLoads = Math.max(0, this._pendingLoads - 1);
            if (this._pendingLoads === 0) this.loading = false;
          },
        });

        this.magazynRightCompService.getDevices(value.id).subscribe({
          next: (data: any) => {
            this.itemCount = Array.isArray(data) ? data.length : 0;
          },
          error: (err) => {
            console.error('Failed to load devices count', err);
            this.itemCount = 0;
          },
          complete: () => {
            this._pendingLoads = Math.max(0, this._pendingLoads - 1);
            if (this._pendingLoads === 0) this.loading = false;
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
