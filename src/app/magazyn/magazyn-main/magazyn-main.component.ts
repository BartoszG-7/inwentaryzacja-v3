import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazynRightCompComponent } from '../magazyn-right-comp/magazyn-right.component';
import { MagazynSidebarComponent } from '../magazyn-sidebar/magazyn-sidebar.component';
import { TreebarSharedService } from '../../home/treebar.share.service';

@Component({
  selector: 'app-magazyn-main',
  standalone: true,
  imports: [CommonModule, MagazynRightCompComponent, MagazynSidebarComponent],
  templateUrl: './magazyn-main.component.html',
  styleUrls: ['./magazyn-main.component.scss'],
})
export class MagazynMainComponent implements OnInit, OnChanges {
  constructor(
    private treebarSharedService: TreebarSharedService,
    private detector: ChangeDetectorRef
  ) {}
  id: any = '';
  arr: any = [];
  ngOnChanges(changes: SimpleChanges): void {
    console.log('MAGAZYN MAIN CHANGES');
  }
  ngOnInit(id: any = this.id, detector = this.detector, arr = this.arr): void {
    this.treebarSharedService.getData().subscribe({
      next(value) {
        console.log(value);
        id = '';
        console.log(id === '');
        let a = 'a';
        a = 'b';
        arr.push('s');
        console.log('SHOULD DETECT CHANGES');
        detector.detach();
        detector.detectChanges();
        detector.reattach();

        a = 'a';
      },
    });
  }
  deviceList(id: any) {
    console.log(id);
    this.id = id;
  }
}
