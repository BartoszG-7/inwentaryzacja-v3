import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokalizacjeSidebarComponent } from '../lokalizacje-sidebar/lokalizacje-sidebar.component';
import { LokalizacjeRightCompComponent } from '../lokalizacje-right-comp/lokalizacje-right-comp.component';
import { LokalizacjeRightProjectComponent } from '../lokalizacje-right-project/lokalizacje-right-project.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

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
export class LokalizacjeMainComponent {
  selectedId: any;
  showProject: boolean = false;

  changedId(event: any) {
    this.selectedId = event;
    // If event.type is 'project', show project view
    if (event && event.location === undefined) {
      this.showProject = true;
    } else {
      this.showProject = false;
    }
  }
}
