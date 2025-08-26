import {
  ChangeDetectorRef,
  Component,
  input,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LokalizacjeRightProjectService } from './lokalizacje-right-project.service';
import { DodajModalDeviceComponent } from '../../components/dodaj-modal-device/dodaj-modal-device.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { UsunModalDeviceComponent } from '../../components/usun-modal-device/usun-modal-device.component';
import { EditProjektComponent } from '../../components/edit-projekt/edit-projekt.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../../linkService';

type Group = {
  id: string;
  name: string;
  devices: Array<any>;
};
@Component({
  selector: 'app-lokalizacje-right-project',
  imports: [
    CommonModule,
    DodajModalDeviceComponent,
    SearchBarComponent,
    UsunModalDeviceComponent,
    EditProjektComponent,
  ],
  standalone: true,
  templateUrl: './lokalizacje-right-project.component.html',
  styleUrl: './lokalizacje-right-project.component.scss',
})
export class LokalizacjeRightProjectComponent implements OnInit, OnChanges {
  constructor(
    private lokalizacjeRightProjectService: LokalizacjeRightProjectService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private linkService: LinkService
  ) {}

  devicesGrouped: Array<Group> = [];
  selectedId = signal('');
  refresh: boolean = false;
  project: any;
  devices: any;
  markedDelete: Array<string> = [];
  groupedRows: any = [];
  urlData: any;
  // timers for transient copy tooltips keyed by the span element
  private copyTimers = new WeakMap<HTMLElement, any>();
  // Track selected header column key
  activeHeaderKey: string | null = null;
  activeSortDirection: 'asc' | 'desc' | null = null;
  ngOnInit(): void {
    this.linkService.getData().subscribe({
      next: (e) => {
        console.log(e);
        this.urlData = e;
        this.selectedId.set(e.id);
        this.ngOnChanges({});
        // this.urlData = JSON.parse(e['data']);
        console.log('URLDATA', e);
      },
    });
  }
  goToInwentaryzacja() {
    // this.router.navigate(['/inwentaryzacja/{}']);
    //route to page without selected project or location and hard reload (copilot dont break it)
    this.router.navigate(['/inwentaryzacja']);
    this.linkService.setData({ type: 'location', id: this.urlData.idLoc });

    // this.router.navigate(['/inwentaryzacja/{}']).then(() => {
    //   window.location.reload();
    // });
  }
  // {
  //   name: 'SERWER',
  //   rows: [
  //     {
  //       id: '',
  //       snWamasoft: '',
  //       snProducenta: '',
  //       mac: '',
  //       ip: '10.67.140.21',
  //       brama: '10.67.140.254',
  //       maska: '255.255.255.0',
  //       anydesk: '',
  //       dns1: '10.67.100.10',
  //       dns2: '10.67.100.11',
  //       serwer: '10.67.100.11',
  //     },
  //   ],
  // },

  copyCell(value: string, ev?: MouseEvent) {
    // Prevent native double-click selections/callouts
    try {
      ev?.preventDefault?.(); ev?.stopPropagation?.();
      const sel = window.getSelection?.();
      if (sel && sel.removeAllRanges) sel.removeAllRanges();
    } catch {}
  if (!value) return;
  // Block selection popups for a brief period after dblclick
  this._selectionBlockUntil = Date.now() + 700;
    navigator.clipboard.writeText(value);
    // Show a small tooltip on the truncated span
    try {
      const target = (ev?.target as HTMLElement) || null;
      const span = (target?.closest?.('.trunc') as HTMLElement) ||
        ((ev?.currentTarget as HTMLElement)?.querySelector?.('.trunc') as HTMLElement);
      if (span) {
  // set click coordinates for fixed tooltip positioning
  const x = (ev as MouseEvent)?.clientX ?? 0;
  const y = (ev as MouseEvent)?.clientY ?? 0;
  span.style.setProperty('--copy-x', `${x}px`);
  span.style.setProperty('--copy-y', `${y + 12}px`); // offset slightly below cursor
        // temporarily disable selection to avoid double-click highlight while copying
  span.classList.add('no-select');
        // clear any existing timer for this element
        const prev = this.copyTimers.get(span);
        if (prev) clearTimeout(prev);
        span.classList.add('copied');
  const t = setTimeout(() => {
          span.classList.remove('copied');
          span.classList.remove('no-select');
          this.copyTimers.delete(span);
  }, 600);
        this.copyTimers.set(span, t);
      }
    } catch {}
  }

  private _selectionBlockUntil = 0;
  preventSelect(ev: Event) {
    if (Date.now() < this._selectionBlockUntil) {
      try { ev.preventDefault(); ev.stopPropagation(); } catch {}
      return false;
    }
    return true;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('CHANGED', changes);
    console.log(this.selectedId);
    if (this.selectedId()) {
      this.lokalizacjeRightProjectService
        .getProjectData(this.selectedId())
        .subscribe({
          next: (e) => {
            this.project = e.project[0];
            this.devices = e.devices;
            console.log('PROJECT DATA', e);
            e.devices.forEach((device: any) => {
              var brk = false;
              this.devicesGrouped.forEach((grouped) => {
                if (grouped.id == device.deviceType._id && !brk) {
                  grouped.devices.push(device);
                  brk = true;
                }
              });
              if (!brk) {
                this.devicesGrouped.push({
                  id: device.deviceType._id,
                  name: device.deviceType.name,
                  devices: [device],
                });
              }
            });
            this.devicesGrouped.forEach((grouped) => {
              this.groupedRows.push({
                name: grouped.name,
                rows: [],
              });
              grouped.devices.forEach((device) => {
                this.groupedRows[this.groupedRows.length - 1].rows.push({
                  id: device._id,
                  snWamasoft: device.wamaNr,
                  snProducenta: device.serialNr,
                  mac: device.macAddr,
                  ip: device.ip,
                  brama: device.gateway,
                  dns1: device.dns1,
                  dns2: device.dns2,
                  anydesk: device.remoteAccessId,
                  maska: device.mask,
                  serwer: device.serverAddress,
                });
              });
            });
          },
        });
    }
  }
  onRefresh(bool: boolean) {
    console.log('REFRESH');
    this.devicesGrouped = [];
    this.groupedRows = [];
    this.ngOnChanges({});
    this.refresh = bool;
    let a = 'a';
    a = 'b';

    // this.changeDetector.detectChanges();
    a = 'a';
  }
  checkboxChanged(event: any) {
    if (event.target.checked) {
      this.markedDelete.push(event.target.id);
    } else {
      this.markedDelete.forEach((element, ind) => {
        if (element == event.target.id) {
          this.markedDelete.splice(ind, 1);
        }
      });
    }
  }
  searchNoSort(input: any) {
    console.log(input);
    var tempSearched: any = [];
    var tempdev = JSON.parse(JSON.stringify(this.devicesGrouped));
    tempdev.forEach((devices: any) => {
      let tempDevice: any = [];
      devices.devices.forEach((device: any) => {
        if (
          device[this.activeHeaderKey ?? '']
            .toLowerCase()
            .includes(input.toLowerCase())
        ) {
          tempDevice.push(JSON.parse(JSON.stringify(device)));
        }
      });
      tempSearched.push(devices);

      tempSearched[tempSearched.length - 1].devices = tempDevice;
    });

    this.groupedRows =
      this.lokalizacjeRightProjectService.parseGroupedDevices(tempSearched);
    console.log(this.devicesGrouped);
  }
  sortAsc(key: any) {
    var tempdev = JSON.parse(JSON.stringify(this.devicesGrouped));

    tempdev.forEach((devices: any) => {
      let tempdevv = devices.devices;

      tempdevv.sort((a: any, b: any): number => {
        return (a[key] ?? '').localeCompare(b[key] ?? '');
      });
      devices.devices = tempdevv;
    });

    this.groupedRows =
      this.lokalizacjeRightProjectService.parseGroupedDevices(tempdev);
  }
  sortDesc(key: any) {
    var tempdev = JSON.parse(JSON.stringify(this.devicesGrouped));

    tempdev.forEach((devices: any) => {
      let tempdevv = devices.devices;

      tempdevv.sort((a: any, b: any): number => {
        return (b[key] ?? '').localeCompare(a[key] ?? '');
      });
      devices.devices = tempdevv;
    });

    this.groupedRows =
      this.lokalizacjeRightProjectService.parseGroupedDevices(tempdev);
  }
  toggleHeader(key: string) {
    // console.log(
    //   this.devicesGrouped[0].devices.sort((a: any, b: any): number => {
    //     return a[key].localeCompare(b[key]);
    //   })
    // );

    if (this.activeHeaderKey !== key) {
      // New header selected: highlight only, no arrow yet
      this.activeHeaderKey = key;
      console.log(this.activeHeaderKey, this.activeSortDirection);
      this.activeSortDirection = null; // phase 1: active, no arrow
      return;
    }

    // Same header clicked: advance phase
    if (this.activeSortDirection === null) {
      this.sortDesc(key);
      // phase 2: show down arrow
      this.activeSortDirection = 'desc';
    } else if (this.activeSortDirection === 'desc') {
      this.sortAsc(key);
      // phase 3: show up arrow
      this.activeSortDirection = 'asc';
    } else if (this.activeSortDirection === 'asc') {
      // phase 4: clear selection
      this.activeHeaderKey = null;
      this.activeSortDirection = null;
    }
    console.log(this.activeHeaderKey, this.activeSortDirection);
  }
  isHeaderActive(key: string) {
    return this.activeHeaderKey === key;
  }

  // True when there's no groups or all groups have no rows
  get isDevicesEmpty(): boolean {
    const gr = this.groupedRows as Array<any> | undefined;
    if (!gr || gr.length === 0) return true;
    for (const g of gr) {
      if (g && Array.isArray(g.rows) && g.rows.length > 0) return false;
    }
    return true;
  }
}
