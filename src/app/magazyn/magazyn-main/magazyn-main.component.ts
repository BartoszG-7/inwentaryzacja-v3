import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazynRightCompComponent } from '../magazyn-right-comp/magazyn-right.component';
import { MagazynSidebarComponent } from "../magazyn-sidebar/magazyn-sidebar.component";

@Component({
  selector: 'app-magazyn-main',
  standalone: true,
  imports: [CommonModule, MagazynRightCompComponent, MagazynSidebarComponent],
  templateUrl: './magazyn-main.component.html',
  styleUrls: ['./magazyn-main.component.scss']
})
export class MagazynMainComponent {
  
}
