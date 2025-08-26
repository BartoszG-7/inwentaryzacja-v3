import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazynRightCompComponent } from '../magazyn-right-comp/magazyn-right.component';
import { MagazynRightSecond } from '../magazyn-right-second/magazyn-right-second.component';
import { MagazynSidebarComponent } from '../magazyn-sidebar/magazyn-sidebar.component';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { Router } from '@angular/router';
import { MagazynSharedService } from '../../magazynShared.service';
import { flush } from '@angular/core/testing';
import { EventTypes, LinkService } from '../../linkService';

@Component({
  selector: 'app-magazyn-main',
  standalone: true,
  imports: [
    CommonModule,
    MagazynRightCompComponent,
    MagazynSidebarComponent,
    MagazynRightSecond,
  ],
  templateUrl: './magazyn-main.component.html',
  styleUrls: ['./magazyn-main.component.scss'],
})
export class MagazynMainComponent implements OnInit, OnChanges {
  constructor(
    private treebarSharedService: TreebarSharedService,
    private router: Router,
    private magazynSharedService: MagazynSharedService,
    private linkService: LinkService
  ) {}
  id = signal('');
  showList: boolean = false;
  arr: any = [];
  // controls whether the alternative second right panel is shown

  ngOnChanges(changes: SimpleChanges): void {
    console.log('MAGAZYN MAIN CHANGES');
  }

  ngOnInit(router = this.router): void {
    this.linkService.getData().subscribe({
      next: (value) => {
        console.log('VALUE', value);
        if (value.type === EventTypes.DEVICE_TYPE) this.id.set(value.id);
      },
    });
    this.magazynSharedService.getBool().subscribe({
      next: (bool) => {
        this.showList = bool;
        // ensure tree selection persists when switching to second panel
        if (bool && this.id()) {
          this.linkService.setData({ type: EventTypes.DEVICE_TYPE, id: this.id() });
        }
      },
    });
    // this.treebarSharedService.getData().subscribe({
    //   next: (value) => {
    //     console.log(this.id);
    //     if (this.id !== '') {
    //       router
    //         .navigate([
    //           '/magazyn/' + JSON.stringify({ type: 'location', id: value.id }),
    //         ])
    //         .then(() => {
    //           window.location.reload();
    //         });
    //     }
    //   },
    // });
  }
  deviceList(id: any) {
    console.log(id);
    this.id.set(id);
    console.log(this.id);
  }
}
