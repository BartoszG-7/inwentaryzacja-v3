import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from './lokalizacje.service';
import { HeaderComponent } from '../components/header/header.component';
import { Treebar } from '../treebar/treebar';
import { PlusModalLokalComponent } from "../components/plus-modal-lokal/plus-modal-lokal.component";
import { SearchBarComponent } from '../components/search-bar/search-bar.component';

@Component({
  selector: 'app-lokalizacje',
  imports: [CommonModule, HeaderComponent, Treebar, PlusModalLokalComponent, SearchBarComponent],
  standalone: true,
  templateUrl: './lokalizacje.component.html',
  styleUrl: './lokalizacje.component.scss'
})
export class LokalizacjeComponent {
  locations: any[] = [];
  editing: string = '';

  constructor(private readonly locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
      next: (data: any) => {
        this.locations = data;
      }
    });
  }

  isDesktop(): boolean {
    return window.innerWidth > 900;
  }

  editData(id: string): void {
    this.editing = id;
  }

  /*saveData(id: string, name: string, address: string, tag: string, note: string): void {
    this.locationService.saveData(id, name, address, tag, note).subscribe({
      next: () => {
        this.ngOnInit();
      }
    });
    this.editing = '';
  }*/
}
