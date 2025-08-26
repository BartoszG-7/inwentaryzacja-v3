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
    const start = Date.now();
    const poll = setInterval(() => {
      const tb = this.treebarDesktop as any;
      if (tb && tb.fetchedData && tb.data && tb.data.length > 0) {
        const first = tb.data[0];
        try {
          console.log('MAGAZYN SIDEBAR CHHANGEDID');
          if (!this.isRedir) {
            // tb.changeId({ type: 'location', id: first.id });
          }
        } catch (err) {
          console.error('magazyn-sidebar: error calling changeId', err);
        }
        try {
          // (Treeexpander as any).selectedLocationId = first.id;
          Treeexpander.instances.forEach((instance: any) => {
            const instLocationId =
              typeof instance.locationId === 'function'
                ? instance.locationId()
                : null;
            // instance.isSelected = instLocationId === first.id;
            instance.selectedProjectIndex = null;
            instance.expanded.set(instLocationId === first.id);
            console.log('INST EXPANDED', instance.expanded);
            if ((instance as any).changeDetectorRef) {
              try {
                (instance as any).changeDetectorRef.detectChanges();
              } catch {}
            }
          });
        } catch (err) {
          console.error(
            'magazyn-sidebar: error updating Treeexpander instances',
            err
          );
        }
        clearInterval(poll);
        return;
      }
      if (Date.now() - start > 3000) {
        clearInterval(poll);
      }
    }, 50);
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
