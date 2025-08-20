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
import { MagazynRightSecond } from '../magazyn-right-second/magazyn-right-second.component';
import { MagazynSidebarComponent } from '../magazyn-sidebar/magazyn-sidebar.component';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-magazyn-main',
  standalone: true,
  imports: [CommonModule, MagazynRightCompComponent, MagazynSidebarComponent, MagazynRightSecond],
  templateUrl: './magazyn-main.component.html',
  styleUrls: ['./magazyn-main.component.scss'],
})
export class MagazynMainComponent implements OnInit, OnChanges {
  constructor(
    private treebarSharedService: TreebarSharedService,
    private router: Router
  ) {}
  id: any = '';
  arr: any = [];
  // controls whether the alternative second right panel is shown
  secondView = false;
  ngOnChanges(changes: SimpleChanges): void {
    console.log('MAGAZYN MAIN CHANGES');
  }

  ngOnInit(router = this.router): void {
    this.treebarSharedService.getData().subscribe({
      next: (value) => {
        console.log(this.id);
        if (this.id !== '') {
          router
            .navigate([
              '/magazyn/' + JSON.stringify({ type: 'location', id: value.id }),
            ])
            .then(() => {
              window.location.reload();
            });
        }
      },
    });
  }
  deviceList(id: any) {
    console.log(id);
    this.id = id;
    console.log(this.id);
  }
  showSecondPanel() {
    this.secondView = true;
  }
}
