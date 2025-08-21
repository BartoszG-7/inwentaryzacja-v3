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
    private router: Router
  ) {}
  ngOnInit(): void {
    this.treebarSharedService.getData().subscribe({
      next: (e) => {
        console.log(e);
        if (e.type === 'project') {
          // this.changedId(e.projectId);
          console.log('BEFORE IF STOPPROJ', this.showProject);
          console.log('STOPPROJ', e.stopProj);
          if (!e.stopProj) {
            this.showProject = true;
          }
          console.log('AFTER IF STOPPROJ', this.showProject);
          this.selectedId = e.projectId;

          this.arrowService.setShowArrow(true);
        } else {
          if (!this.showProject) {
            this.selectedId = e;
          } else {
            console.log('THIS.showProject', this.showProject);
            this.arrowService.setShowArrow(false);
            this.selectedId = '';
            this.router
              .navigate([
                '/inwentaryzacja/' +
                  JSON.stringify({ type: 'location', id: e.location._id }),
              ])
              .then(() => {
                console.log('LOKALIZACJE MAIN COMP RELOAD');
                window.location.reload();
              });
          }
        }
      },
    });
  }
  refreshTreebar(ref: any) {
    this.refresh = ref;
  }
  refreshRightComp(event: any) {
    console.log(event);
    this.rightComp = event;
  }
  changedId(event: any) {
    console.log('main changedId received:', event);
    this.selectedId = event;
    // If event.type is 'project', show project view
    if (event && event.location === undefined) {
      this.showProject = true;
      this.arrowService.setShowArrow(true);
    } else {
      this.showProject = false;
      this.arrowService.setShowArrow(false);
    }
  }
}
