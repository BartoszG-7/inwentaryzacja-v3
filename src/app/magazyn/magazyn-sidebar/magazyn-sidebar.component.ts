import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MagazynService } from './magazyn.service';
import { Treebar } from '../../treebar/treebar';
import { MagazynMainComponent } from '../magazyn-main/magazyn-main.component';

@Component({
  selector: 'app-magazyn-sidebar',
  imports: [CommonModule, MagazynMainComponent, Treebar],
  standalone: true,
  templateUrl: './magazyn-sidebar.component.html',
  styleUrls: ['./magazyn-sidebar.component.scss']
})
export class MagazynComponent {
//   locations: any[] = [];
//   editing: string = '';

//   constructor(private readonly locationService: LocationService) {}

//   ngOnInit(): void {
//     this.locationService.getLocations().subscribe({
//       next: (data: any) => {
//         this.locations = data;
//       }
//     });
//   }

//   isDesktop(): boolean {
//     return window.innerWidth > 900;
//   }

//   editData(id: string): void {
//     this.editing = id;
//   }

//   saveData(id: string, name: string, address: string, tag: string, note: string): void {
//     this.locationService.saveData(id, name, address, tag, note).subscribe({
//       next: () => {
//         this.ngOnInit();
//       }
//     });
//     this.editing = '';
//   }
 }
