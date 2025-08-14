import {
  Component,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from './lokalizacje-sidebar.service';
import { Treebar } from '../../treebar/treebar';
import { PlusModalLokalComponent } from '../../components/plus-modal-lokal/plus-modal-lokal.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-lokalizacje-sidebar',
  imports: [CommonModule, Treebar, PlusModalLokalComponent, SearchBarComponent],
  standalone: true,
  templateUrl: './lokalizacje-sidebar.component.html',
  styleUrls: ['./lokalizacje-sidebar.component.scss'],
})
export class LokalizacjeSidebarComponent implements OnChanges {
  locations: any[] = [];
  selectedId: any = output<any>();
  editing: string = '';
  searchInput: string = '';
  refreshRightComp = output<boolean>();
  refresh = input<boolean>();
  @ViewChild('trbar') trbar: any;
  constructor(private readonly locationService: LocationService) {}
  rightComp(event: any) {
    this.refreshRightComp.emit(event);
  }
  changedId(event: any) {
    this.selectedId.emit(event);
  }
  onSearch(event: string): void {
    this.searchInput = event;

    // Here you can implement the logic to handle the search input
    // For example, you might want to filter the locations based on the search term
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refresh'].currentValue !== undefined) {
      let bar = this.trbar;
      console.log(bar.refetchData());
    }
  }
  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
      next: (data: any) => {
        this.locations = data;
      },
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
