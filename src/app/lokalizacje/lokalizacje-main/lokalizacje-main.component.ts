import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokalizacjeSidebarComponent } from "../lokalizacje-sidebar/lokalizacje-sidebar.component";
import { LokalizacjeRightCompComponent } from "../lokalizacje-right-comp/lokalizacje-right-comp.component";


@Component({
  selector: 'app-lokalizacje-main',
  imports: [CommonModule, LokalizacjeSidebarComponent, LokalizacjeRightCompComponent],
  standalone: true,
  templateUrl: './lokalizacje-main.component.html',
  styleUrls: ['./lokalizacje-main.component.scss']
})
export class LokalizacjeMainComponent {

}
