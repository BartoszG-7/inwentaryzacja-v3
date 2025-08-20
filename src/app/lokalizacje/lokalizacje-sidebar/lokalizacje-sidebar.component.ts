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
import { Treeexpander } from '../../treeexpander/treeexpander';
import { PlusModalLokalComponent } from '../../components/plus-modal-lokal/plus-modal-lokal.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ActivatedRoute } from '@angular/router';

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

  refresh = input<boolean>();
  @ViewChild('trbar') trbar: any;
  constructor(
    private readonly locationService: LocationService,
    private activatedRoute: ActivatedRoute
  ) {}

  changedId(event: any) {
    console.log('sidebar changedId emitted:', event);
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
      bar.refetchData();
    }
  }
  ngOnInit(): void {
    this.locationService.getLocations().subscribe({
      next: (data: any) => {
        this.locations = data;
        // Auto-select the first location once the treebar has fetched its data.
        const start = Date.now();
        const poll = setInterval(() => {
          const tb = this.trbar as any;
          if (tb && tb.fetchedData && tb.data && tb.data.length > 0) {
            const first = tb.data[0];
            console.log('sidebar: treebar ready, selecting first', first);
            try {
              // notify treebar which will parse data for right pane
              this.activatedRoute.params.subscribe({
                next: (e) => {
                  console.log('SIDEBAR URL PARAM DATA', e['data']);
                  if (e['data'] === '{}') {
                    tb.changeId({ type: 'location', id: first.id });
                  }
                },
              });
              //
            } catch (err) {
              console.error('sidebar: error calling trbar.changeId', err);
            }
            // Update Treeexpander selection state directly so selection is idempotent
            try {
              (Treeexpander as any).selectedLocationId = first.id;
              Treeexpander.instances.forEach((instance: any) => {
                try {
                  const instLocationId =
                    typeof instance.locationId === 'function'
                      ? instance.locationId()
                      : null;
                  instance.isSelected = instLocationId === first.id;
                  instance.selectedProjectIndex = null;
                  instance.expanded = instLocationId === first.id;
                  // attempt to trigger change detection on the instance
                  if ((instance as any).changeDetectorRef) {
                    try {
                      (instance as any).changeDetectorRef.detectChanges();
                    } catch (err) {
                      // ignore
                    }
                  }
                } catch (err) {
                  // continue on error for individual instances
                }
              });
              console.log(
                'sidebar: set Treeexpander.selectedLocationId and updated instances for',
                first.id
              );
            } catch (err) {
              console.error('sidebar: error setting Treeexpander state', err);
            }
            clearInterval(poll);
            return;
          }
          if (Date.now() - start > 3000) {
            console.warn(
              'sidebar: treebar not ready after 3s, aborting auto-select'
            );
            clearInterval(poll);
          }
        }, 50);
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
