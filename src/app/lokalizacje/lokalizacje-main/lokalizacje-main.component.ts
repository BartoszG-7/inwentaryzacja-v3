import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokalizacjeSidebarComponent } from '../lokalizacje-sidebar/lokalizacje-sidebar.component';
import { LokalizacjeRightCompComponent } from '../lokalizacje-right-comp/lokalizacje-right-comp.component';
import { LokalizacjeRightProjectComponent } from '../lokalizacje-right-project/lokalizacje-right-project.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Treebar } from '../../treebar/treebar';
import { HeaderArrowService } from '../../components/header/header-arrow.service';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { Treeexpander } from '../../treeexpander/treeexpander';
import { LinkService } from '../../linkService';

@Component({
  selector: 'app-lokalizacje-main',
  imports: [
    CommonModule,
    LokalizacjeSidebarComponent,
    LokalizacjeRightCompComponent,
    LokalizacjeRightProjectComponent,
  ],
  standalone: true,
  templateUrl: './lokalizacje-main.component.html',
  styleUrls: ['./lokalizacje-main.component.scss'],
})
export class LokalizacjeMainComponent implements OnInit {
  selectedId: any;
  showProject: boolean = false;
  rightComp: any;
  refresh: any;
  constructor(
    private arrowService: HeaderArrowService,
    private treebarSharedService: TreebarSharedService,
    private router: Router,
    private linkService: LinkService
  ) {}
  ngOnInit(): void {
    this.linkService.getData().subscribe({
      next: (e) => {
        if (e.type === 'location') {
          this.showProject = false;
        } else if (e.type === 'project') {
          this.showProject = true;
        }
        console.log(this.showProject);
      },
    });
  }
}
// refreshTreebar(ref: any) {
//   this.refresh = ref;
// }
// refreshRightComp(event: any) {
//   console.log(event);
//   this.rightComp = event;
// }
// changedId(event: any) {
//   console.log('main changedId received:', event);
//   this.selectedId = event;
//   // If event.type is 'project', show project view
//   if (event && event.location === undefined) {
//     this.showProject = true;
//     this.arrowService.setShowArrow(true);
//   } else {
//     this.showProject = false;
//     this.arrowService.setShowArrow(false);
//   }
// }
