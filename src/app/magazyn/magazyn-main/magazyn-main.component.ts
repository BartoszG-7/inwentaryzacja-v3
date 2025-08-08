import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagazynRightCompComponent } from '../magazyn-right-comp/magazyn-right-comp.component';
import { Treebar } from '../../treebar/treebar';
import { HeaderComponent } from '../../components/header/header.component';
import { MagazynComponent } from "../magazyn-sidebar/magazyn-sidebar.component";

@Component({
  selector: 'app-magazyn-main',
  standalone: true,
  imports: [CommonModule, MagazynRightCompComponent, Treebar, HeaderComponent, MagazynComponent],
  templateUrl: './magazyn-main.component.html',
  styleUrls: ['./magazyn-main.component.scss']
})
export class MagazynMainComponent {
  
}
