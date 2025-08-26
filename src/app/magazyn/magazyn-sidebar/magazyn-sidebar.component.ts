import { Component, OnInit, output, ViewChild } from '@angular/core';
import { Treeexpander } from '../../treeexpander/treeexpander';
import { CommonModule } from '@angular/common';
//import { MagazynService } from './magazyn.service';
import { Treebar } from '../../treebar/treebar';
import { PlusModalComponent } from '../../components/plus-modal/plus-modal.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ActivatedRoute } from '@angular/router';
import { LinkService } from '../../linkService';

@Component({
  selector: 'app-magazyn-sidebar',
  imports: [CommonModule, Treebar, PlusModalComponent, SearchBarComponent],
  standalone: true,
  templateUrl: './magazyn-sidebar.component.html',
  styleUrls: ['./magazyn-sidebar.component.scss'],
})
export class MagazynSidebarComponent implements OnInit {
  constructor(private linkService: LinkService) {}
  @ViewChild('treebarDesktop') treebarDesktop: any;

  searchInput: string = '';
  resetOut = output();
  onSearch(event: string): void {
    this.searchInput = event;
    console.log(this.searchInput);
    // Here you can implement the logic to handle the search input
    // For example, you might want to filter the locations based on the search term
  }

  saveId(event: any): void {
    console.log(event);
  }
  isRedir = false;
  ngOnInit(): void {
    this.linkService.getData().subscribe({
      next: (e) => {
        this.isRedir = true;
      },
    });
    // Wait for treebar to be ready then select first item
  }
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
